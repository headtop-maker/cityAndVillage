import {NativeModules} from 'react-native';
import {FileParamsType} from '../types';

const {KotlinModules} = NativeModules;

export const nativeFn = {
  getDpToPX: async (): Promise<number> => await KotlinModules.getDpToPX(),
  openFile: async (): Promise<FileParamsType> => await KotlinModules.openFile(),
  base64Image: async (path: string): Promise<string> =>
    await KotlinModules.getBase64Image(path),
  getFile: (data: {url: string; mimeType: string; title: string}) =>
    KotlinModules.getFile(data.url, data.mimeType, data.title),
};
