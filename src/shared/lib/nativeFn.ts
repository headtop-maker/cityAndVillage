import {NativeModules} from 'react-native';
import {FileParamsType} from '../types';

const {KotlinModules} = NativeModules;

export const nativeFn = {
  getDpToPX: async (): Promise<number> => await KotlinModules.getDpToPX(),
  openFile: async (): Promise<FileParamsType> => await KotlinModules.openFile(),
  base64Image: async (): Promise<{base64Image: string}> =>
    await KotlinModules.base64Image(),
  getFile: (data: {url: string; mimeType: string; title: string}) =>
    KotlinModules.getFile(data.url, data.mimeType, data.title),
};
