import { getDDSImage, isReady } from 'dds.wasm'
import TgaLoader from 'tga-js'

const ready = await isReady

export type ImageType = {
  image: string;
  clean: () => void;
}

export async function fileFromPath(handle: FileSystemDirectoryHandle, ...path: string[]): Promise<File> {
  let h = handle
  if (path.length > 1) {
    for (let i = 0; i < path.length - 1; i++) {
      h = await h.getDirectoryHandle(path[i])
    }
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