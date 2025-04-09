import { convertObject, readFile } from '@eu4/eu4file.util.ts'
import { AdvisorTypes, Descriptor, SteamTag } from '@eu4/types.ts'
import { capitalize } from '@mui/material'
import { toList } from '@utils/objects.utils.ts'
import { Query } from 'jomini'

export class Eu4Folder<T> {
  name: string
  parent?: Eu4Folder<any>
  children: Array<Eu4Folder<any>>

  constructor(name: string, parent?: Eu4Folder<any>) {
    this.name = name
    this.parent = parent
    this.children = []

    if (this.parent) {
      this.parent.children.push(this)
    }
  }

  async getFile(handle: FileSystemDirectoryHandle, fileName: string): Promise<FileSystemFileHandle> {
    return await (await this.getFolderHandle(handle)).getFileHandle(fileName)
  }

  async getFiles(handle: FileSystemDirectoryHandle): Promise<Map<string, T>> {
    const files: Map<string, T> = new Map()
    for await (const childHandle of handle.values()) {
      files.set(childHandle.name, await readFile(await childHandle.getFile()) as T)
    }

    return files
  }

  async listFiles(handle: FileSystemDirectoryHandle): Promise<FileSystemFileHandle[]> {
    const files: FileSystemFileHandle[] = []
    handle = await this.getFolderHandle(handle)

    for await (const childHandle of handle.values()) {
      files.push(childHandle)
    }

    return files
  }

  async getFolderHandle(handle: FileSystemDirectoryHandle): Promise<FileSystemDirectoryHandle> {
    const path: string[] = []
    let current: Eu4Folder<any> | undefined = this

    while (current) {
      path.unshift(current.name)
      current = current.parent
    }

    for (const pathElement of path) {
      handle = await handle.getDirectoryHandle(pathElement)
    }

    return handle
  }
}

export class Eu4File<T> {
  name: string
  reader: (root: ReturnType<Query['root']>) => T
  writer: (t: T) => Uint8Array
  folder?: Eu4Folder<unknown>

  constructor(name: string, reader: (root: ReturnType<Query['root']>) => T, writer: (t: T) => Uint8Array, folder?: Eu4Folder<unknown>) {
    this.name = name
    this.reader = reader
    this.writer = writer
    this.folder = folder
  }

  async getFileHandle(handle: FileSystemDirectoryHandle): Promise<FileSystemFileHandle> {
    if (this.folder) {
      return await this.folder.getFile(handle, this.name)
    } else {
      return await handle.getFileHandle(this.name)
    }
  }

  async getFile(handle: FileSystemDirectoryHandle): Promise<T> {
    return this.reader(await readFile((await (await this.getFileHandle(handle)).getFile())))
  }

  async writeFile(handle: FileSystemDirectoryHandle, t: T): Promise<void> {
    const fileHandle = await this.getFileHandle(handle)
    const writable = await fileHandle.createWritable()
    await writable.write(this.writer(t))
    await writable.close()
  }
}

export const DescriptorFile = new Eu4File<Descriptor>('descriptor.mod', root => {
  if (root['remote_file_id'] && typeof root['remote_file_id'] === 'number') {
    root['remote_file_id'] = root['remote_file_id'].toString()
  }

  if (root['version'] && typeof root['version'] === 'number') {
    root['version'] = root['version'].toString()
  }

  root['tags'] = (root['tags'] ?? []).map((t: SteamTag) => capitalize(t)).sort()
  root['dependencies'] = toList(root['dependencies']) ?? []
  root['replace_path'] = toList(root['replace_path']) ?? []

  return root as Descriptor
}, convertObject)
export const CommonFolder = new Eu4Folder('common')
export const AdvisorTypesFolder = new Eu4Folder<AdvisorTypes>('advisortypes', CommonFolder)
export const TechnologiesFolder = new Eu4Folder('technologies', CommonFolder)
export const UnitsFolder = new Eu4Folder('units', CommonFolder)