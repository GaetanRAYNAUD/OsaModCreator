import { GlobalState } from '@components/layout/Default.tsx';
import { convertObject, readFile, readFileEncoding } from '@eu4/eu4file.util.ts';
import { Descriptor, Province, SteamTag, TechnologyGroups, TradeNode, Unit } from '@eu4/types.ts';
import { capitalize } from '@mui/material';
import { toList } from '@utils/objects.utils.ts';
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
      if (childHandle.name !== '.DS_Store') {
        files.push(childHandle);
      }
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
  reader: (root: File) => Promise<T>;
  writer: (t: T) => Uint8Array;
  folder?: Eu4Folder;

  constructor(name: string,
              folder?: Eu4Folder,
              reader: (root: File) => Promise<T> = async root => readFile(await root.text()) as T,
              writer: (t: T) => Uint8Array = convertObject) {
    this.name = name;
    this.reader = reader;
    this.writer = writer;
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
    return this.reader((await (await this.getFileHandle(handle)).getFile()));
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

  constructor(name: string, listExtractor: (t: T) => string[], folder?: Eu4Folder, reader?: (root: File) => Promise<T>, writer?: (t: T) => Uint8Array) {
    super(name, folder, reader, writer);
    this.listExtractor = listExtractor;
  }

  async getList(handle: FileSystemDirectoryHandle): Promise<string[]> {
    return this.listExtractor(await this.getData(handle));
  }

  async getData(handle: FileSystemDirectoryHandle): Promise<T> {
    return this.data ?? (this.data = await this.getFile(handle));
  }
}

export const DescriptorFile = new Eu4File<Descriptor>('descriptor.mod', undefined, async root => {
  const data = readFile(await root.text());

  if (data['remote_file_id'] && typeof data['remote_file_id'] === 'number') {
    data['remote_file_id'] = data['remote_file_id'].toString();
  }

  if (data['version'] && typeof data['version'] === 'number') {
    data['version'] = data['version'].toString();
  }

  data['tags'] = (data['tags'] ?? []).map((t: SteamTag) => capitalize(t)).sort();
  data['dependencies'] = toList(data['dependencies']) ?? [];
  data['replace_path'] = toList(data['replace_path']) ?? [];

  return data as Descriptor;
});

export const CommonFolder = new Eu4Folder('common');
export const MapFolder = new Eu4Folder('map');

export const AdvisorTypesFolder = new Eu4Folder('advisortypes', CommonFolder);
export const TechnologiesFolder = new Eu4Folder('technologies', CommonFolder);

export const TechnologyGroupsFile = new Eu4FileList<TechnologyGroups>('technology.txt', t => Object.keys(t.groups),
  CommonFolder);
export const loadTechnologyGroups = async (globalState: GlobalState, setGlobalState: React.Dispatch<React.SetStateAction<GlobalState | null>>, force: boolean = false): Promise<TechnologyGroups | undefined> => {
  if (globalState.handle && (force || !globalState.technologyGroups)) {
    const technologyGroups = await TechnologyGroupsFile.getData(globalState.handle);
    setGlobalState({ ...globalState, technologyGroups });

    return technologyGroups;
  }

  return globalState.technologyGroups;
};

export const UnitsFolder = new Eu4Folder('units', CommonFolder);
export const UnitFile = (name: string) => new Eu4File<Unit>(name, UnitsFolder);

export const DefinitionFile = new Eu4FileList<Province[]>('definition.csv',
  t => t.map(value => value.name ?? value.id.toString()),
  MapFolder,
  async root => {
    const data = await readFileEncoding(root, 'ISO-8859-1');

    return data.split(/\r?\n|\r|\n/g)
               .slice(1)
               .map((line: string) => {
                 const strings = line.split(';');
                 const province: Province = {
                   id: Number.parseInt(strings[0]),
                   red: Number.parseInt(strings[1]),
                   green: Number.parseInt(strings[2]),
                   blue: Number.parseInt(strings[3]),
                   definitionName: strings.length >= 5 ? strings[4] : undefined,
                   definitionX: strings.length >= 6 ? strings[5] : undefined,
                 };

                 return province;
               });
  }, undefined);
export const loadProvinces = async (globalState: GlobalState, setGlobalState: React.Dispatch<React.SetStateAction<GlobalState | null>>, force: boolean = false): Promise<Record<number, Province> | undefined> => {
  if (globalState.handle && (force || !globalState.provinces)) {
    const provinces = await DefinitionFile.getData(globalState.handle);
    setGlobalState({ ...globalState, provinces: provinces.reduce((acc, item) => (acc[item.id] = item, acc), {} as Record<number, Province>) });

    return provinces;
  }

  return undefined;
};

export const TradeNodesFolder = new Eu4Folder('tradenodes', CommonFolder);
export const TradeNodeFile = (name: string) => {
  return new Eu4FileList<Record<string, TradeNode>>(name, t => Object.keys(t), TradeNodesFolder);
}
