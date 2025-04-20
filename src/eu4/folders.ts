import { convertObject, readFile } from '@eu4/eu4file.util.ts';
import { Descriptor, SteamTag, TechnologyGroups, Unit } from '@eu4/types.ts';
import { capitalize } from '@mui/material';
import { toList } from '@utils/objects.utils.ts';
import { Query } from 'jomini';
import { GlobalState } from '@components/layout/Default.tsx';
import * as React from 'react';

export class Eu4Folder {
  name: string;
  parent?: Eu4Folder;
  children: Array<Eu4Folder>;

  constructor(name: string, parent?: Eu4Folder) {
    this.name = name;
    this.parent = parent;
    this.children = [];

    if (this.parent) {
      this.parent.children.push(this);
    }
  }

  async getFile(handle: FileSystemDirectoryHandle, fileName: string): Promise<FileSystemFileHandle> {
    return await (await this.getFolderHandle(handle)).getFileHandle(fileName);
  }

  async listFiles(handle: FileSystemDirectoryHandle): Promise<FileSystemFileHandle[]> {
    const files: FileSystemFileHandle[] = [];
    handle = await this.getFolderHandle(handle);

    for await (const childHandle of handle.values()) {
      files.push(childHandle);
    }

    return files.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  }

  async getFolderHandle(handle: FileSystemDirectoryHandle): Promise<FileSystemDirectoryHandle> {
    const path: string[] = [];
    let current: Eu4Folder | undefined = this;

    while (current) {
      path.unshift(current.name);
      current = current.parent;
    }

    for (const pathElement of path) {
      handle = await handle.getDirectoryHandle(pathElement);
    }

    return handle;
  }
}

export class Eu4File<T extends object> {
  name: string;
  reader: (root: ReturnType<Query['root']>) => T;
  writer: (t: T) => Uint8Array;
  folder?: Eu4Folder;

  constructor(name: string, folder?: Eu4Folder, reader?: (root: ReturnType<Query['root']>) => T, writer?: (t: T) => Uint8Array) {
    this.name = name;
    this.reader = reader ?? (root => root as T);
    this.writer = writer ?? convertObject;
    this.folder = folder;
  }

  async getFileHandle(handle: FileSystemDirectoryHandle): Promise<FileSystemFileHandle> {
    if (this.folder) {
      return await this.folder.getFile(handle, this.name);
    } else {
      return await handle.getFileHandle(this.name);
    }
  }

  async getFile(handle: FileSystemDirectoryHandle): Promise<T> {
    return this.reader(await readFile((await (await this.getFileHandle(handle)).getFile())));
  }

  async writeFile(handle: FileSystemDirectoryHandle, t: T): Promise<void> {
    const fileHandle = await this.getFileHandle(handle);
    const writable = await fileHandle.createWritable();
    await writable.write(this.writer(t));
    await writable.close();
  }
}

export class Eu4FileList<T extends object> extends Eu4File<T> {
  listExtractor: (t: T) => string[];
  data?: T;

  constructor(name: string, listExtractor: (t: T) => string[], folder?: Eu4Folder, reader?: (root: ReturnType<Query['root']>) => T, writer?: (t: T) => Uint8Array) {
    super(name, folder, reader, writer);
    this.listExtractor = listExtractor;
  }

  async getList(handle: FileSystemDirectoryHandle): Promise<string[]> {
    return this.listExtractor(await this.getData(handle));
  }

  async getData(handle: FileSystemDirectoryHandle): Promise<T> {
    return this.data ?? (this.data = await this.getFile(handle) as T);
  }
}

export const DescriptorFile = new Eu4File<Descriptor>('descriptor.mod', undefined, root => {
  if (root['remote_file_id'] && typeof root['remote_file_id'] === 'number') {
    root['remote_file_id'] = root['remote_file_id'].toString();
  }

  if (root['version'] && typeof root['version'] === 'number') {
    root['version'] = root['version'].toString();
  }

  root['tags'] = (root['tags'] ?? []).map((t: SteamTag) => capitalize(t)).sort();
  root['dependencies'] = toList(root['dependencies']) ?? [];
  root['replace_path'] = toList(root['replace_path']) ?? [];

  return root as Descriptor;
});

export const CommonFolder = new Eu4Folder('common');

export const AdvisorTypesFolder = new Eu4Folder('advisortypes', CommonFolder);
export const TechnologiesFolder = new Eu4Folder('technologies', CommonFolder);

export const TechnologyGroupsFile = new Eu4FileList<TechnologyGroups>('technology.txt', t => Object.keys(t.groups),
  CommonFolder);
export const loadTechnologyGroups = async (globalState: GlobalState, setGlobalState: React.Dispatch<React.SetStateAction<GlobalState | null>>, force?: boolean = false): Promise<TechnologyGroups | undefined> => {
  if (globalState.handle && (force || !globalState.technologyGroups)) {
    const groups = await TechnologyGroupsFile.getData(globalState.handle);
    setGlobalState({ ...globalState, technologyGroups: groups });

    return groups;
  }

  return undefined;
};

export const UnitsFolder = new Eu4Folder('units', CommonFolder);
export const UnitFile = (name: string) => new Eu4File<Unit>(name, UnitsFolder);
