import { readFile } from '@eu4/eu4file.util.ts'
import { AdvisorTypes, Descriptor } from '@eu4/types.ts'

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
    for await (const [name, childHandle] of (await this.getFolderHandle(handle)).entries()) {
      files.set(name, await readFile(await childHandle.getFile()) as T)
    }

    return files
  }

  async getFolderHandle(handle: FileSystemDirectoryHandle): Promise<FileSystemDirectoryHandle> {
    const path: string[] = []
    let current: Eu4Folder<any> | undefined = this

    while (current) {
      path.unshift(current.name) // Ajoute au début du tableau
      current = current.parent   // Remonte au parent
    }

    for (const pathElement of path) {
      handle = await handle.getDirectoryHandle(pathElement)
    }

    return handle
  }
}

export class Eu4File<T> {
  name: string
  folder?: Eu4Folder<unknown>

  constructor(name: string, folder?: Eu4Folder<unknown>) {
    this.name = name
    this.folder = folder
  }

  async getFile(handle: FileSystemDirectoryHandle): Promise<T> {
    if (this.folder) {
      return await readFile((await (await this.folder.getFile(handle, this.name)).getFile())) as T
    } else {
      return await readFile(await (await handle.getFileHandle(this.name)).getFile()) as T
    }
  }
}

export const DescriptorFile = new Eu4File<Descriptor>('descriptor.mod')
export const CommonFolder = new Eu4Folder('common')
export const AdvisorTypesFolder = new Eu4Folder<AdvisorTypes>('advisortypes', CommonFolder)
export const TechnologiesFolder = new Eu4Folder('technologies', CommonFolder)