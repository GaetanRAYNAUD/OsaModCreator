import { Jomini, Query, Writer } from 'jomini';

const jomini = await Jomini.initialize()

export async function readFile(file: Blob): Promise<ReturnType<Query['root']>> {
  return jomini.parseText(await file.text())
}

//Todo change for eu4
const FLAT_ARRAY_KEYS = [
  'ethic',
  'trait',
];
const UNQUOTED_KEYS = [
  'gender',
];

/**
 * @param writer {Writer}
 * @param key {string}
 * @param value {any}
 */
export function writeKeyValue(writer: Writer, key: string, value: any) {
  if (/^[a-zA-Z_]+$/.test(key)) {
    writer.write_unquoted(key);
  } else {
    writer.write_quoted(key);
  }
  writer.write_operator('=');
  writeAny(writer, value, key);
}

/**
 * @param writer {Writer}
 * @param obj {object}
 */
export function writeObject(writer: Writer, obj: object) {
  writer.write_object_start();
  writeEntries(writer, obj);
  writer.write_end();
}

/**
 * @param writer {Writer}
 * @param obj {object}
 */
function writeEntries(writer: Writer, obj: object) {
  for (const [key, value] of Object.entries(obj)) {
    if (FLAT_ARRAY_KEYS.includes(key) && Array.isArray(value)) {
      for (const item of value) {
        writeKeyValue(writer, key, item);
      }
    } else {
      writeKeyValue(writer, key, value);
    }
  }
}

/**
 * @param writer {Writer}
 * @param obj {Array}
 */
export function writeArray(writer: Writer, obj: any[]) {
  writer.write_array_start();
  for (const item of obj) {
    writeAny(writer, item);
  }
  writer.write_end();
}

/**
 * @param writer {Writer}
 * @param obj {any}
 * @param key {string}
 */
function writeAny(writer: Writer, obj: any, key: string | undefined = undefined) {
  if (Array.isArray(obj)) {
    writeArray(writer, obj);
  } else switch (typeof obj) {
    case 'string':
      if (key && UNQUOTED_KEYS.includes(key)) {
        writer.write_unquoted(obj);
      } else {
        writer.write_quoted(obj);
      }
      break;
    case 'number':
      if (Number.isInteger(obj)) {
        writer.write_integer(obj);
      } else {
        writer.write_f64(obj);
      }
      break;
    case 'boolean':
      writer.write_bool(obj);
      break;
    case 'object':
      if (obj instanceof Date) {
        writer.write_date(obj);
      } else if (obj) {
        writeObject(writer, obj);
      }
      break;
  }
}