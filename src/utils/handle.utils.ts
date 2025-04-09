import { getDDSImage, isReady } from 'dds.wasm'
import TgaLoader from 'tga-js'

const ready = await isReady

export type ImageType = {
  image: string;
  clean: () => void;
}

export async function folderFromPath(handle: FileSystemDirectoryHandle, ...path: string[]): Promise<FileSystemDirectoryHandle> {
  let h = handle
  for (const item of path) {
    h = await h.getDirectoryHandle(item)
  }

  return h
}

export async function fileFromPath(handle: FileSystemDirectoryHandle, ...path: string[]): Promise<File> {
  let h = handle
  if (path.length > 1) {
    h = await folderFromPath(handle, ...path.slice(0, -1))
  }

  return (await h.getFileHandle(path[path.length - 1])).getFile()
}

export async function imageFromPath(handle: FileSystemDirectoryHandle, ...path: string[]): Promise<ImageType> {
  return imageFromFile(await fileFromPath(handle, ...path))
}

export async function imageFromFile(file: File): Promise<ImageType> {
  if (file.type.toLowerCase().startsWith('image/')) {
    let image = URL.createObjectURL(file)

    if ('image/vnd.ms-dds' === file.type.toLowerCase() || 'image/x-direct-draw-surface' === file.type.toLowerCase()) {
      image = await getDDSImage(image, { transparency: true })
    }

    return {
      image,
      clean: () => URL.revokeObjectURL(image),
    }
  }

  if (file.name.toLowerCase().endsWith('.dds')) {
    return imageDds(file)
  }

  if (file.name.toLowerCase().endsWith('.tga')) {
    return imageTga(file)
  }

  return {
    image: '',
    clean: () => {
    },
  }
}

export async function imageDds(file: File): Promise<ImageType> {
  const image = URL.createObjectURL(file)
  return {
    image: await getDDSImage(image, { transparency: true }),
    clean: () => URL.revokeObjectURL(image),
  }
}

export async function imageTga(file: File): Promise<ImageType> {
  const tga = new TgaLoader()
  tga.load(new Uint8Array(await file.arrayBuffer()))

  const image = tga.getDataURL('image/png')

  return {
    image,
    clean: () => URL.revokeObjectURL(image),
  }
}

export async function writeFile(file: File, handle: FileSystemDirectoryHandle, fileName?: string, ...path: string[]) {
  if (path) {
    handle = await folderFromPath(handle, ...path)
  }

  const targetHandle = await handle.getFileHandle(fileName ?? file.name, { create: true })
  const writable = await targetHandle.createWritable()
  await writable.write(file)
  await writable.close()
}