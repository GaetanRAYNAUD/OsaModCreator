import { getDDSImage, isReady } from 'dds.wasm';
import TgaLoader from 'tga-js';

const ready = await isReady;

export async function imageFromPath(handle: FileSystemDirectoryHandle, ...path: string[]): Promise<string> {
  let h = handle;
  if (path.length > 1) {
    for (let i = 0; i < path.length - 1; i++) {
      h = await h.getDirectoryHandle(path[i]);
    }
  }

  return imageFromFileHandle(await h.getFileHandle(path[path.length - 1]));
}

export async function imageFromFileHandle(file: FileSystemFileHandle): Promise<string> {
  return imageFromFile(await file.getFile());
}

export async function imageFromFile(file: File): Promise<string> {
  if (file.name.toLowerCase().endsWith('.dds')) {
    return imageDds(file);
  }
  if (file.name.toLowerCase().endsWith('.tga')) {
    return imageTga(file);
  }

  return '';
}

export async function imageDds(file: File): Promise<string> {
  return await getDDSImage(URL.createObjectURL(file), { transparency: true });
}

export async function imageTga(file: File): Promise<string> {
  const tga = new TgaLoader();
  tga.load(new Uint8Array(await file.arrayBuffer()));

  return tga.getDataURL('image/png');
}