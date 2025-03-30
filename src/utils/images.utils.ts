import { getDDSImage, isReady } from 'dds.wasm';
import TgaLoader from 'tga-js';

const ready = await isReady;

export type ImageType = {
  image: string;
  clean: () => void;
}

export async function imageFromPath(handle: FileSystemDirectoryHandle, ...path: string[]): Promise<ImageType> {
  let h = handle;
  if (path.length > 1) {
    for (let i = 0; i < path.length - 1; i++) {
      h = await h.getDirectoryHandle(path[i]);
    }
  }

  return imageFromFileHandle(await h.getFileHandle(path[path.length - 1]));
}

export async function imageFromFileHandle(file: FileSystemFileHandle): Promise<ImageType> {
  return imageFromFile(await file.getFile());
}

export async function imageFromFile(file: File): Promise<ImageType> {
  if (file.type.toLowerCase().startsWith('image/')) {
    const image = URL.createObjectURL(file);
    return {
      image,
      clean: () => {
        URL.revokeObjectURL(image);
        console.log('cleaned')
      },
    };
  }

  if (file.name.toLowerCase().endsWith('.dds')) {
    return imageDds(file);
  }

  if (file.name.toLowerCase().endsWith('.tga')) {
    return imageTga(file);
  }

  return {
    image: '',
    clean: () => {
    },
  };
}

export async function imageDds(file: File): Promise<ImageType> {
  const imageUrl = URL.createObjectURL(file);
  return {
    image: await getDDSImage(imageUrl, { transparency: true }),
    clean: () => URL.revokeObjectURL(imageUrl),
  };
}

export async function imageTga(file: File): Promise<ImageType> {
  const tga = new TgaLoader();
  tga.load(new Uint8Array(await file.arrayBuffer()));

  return {
    image: tga.getDataURL('image/png'),
    clean: () => {
    },
  };
}