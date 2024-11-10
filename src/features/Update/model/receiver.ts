import {NativeEventEmitter, NativeModules} from 'react-native';

const {KotlinModules} = NativeModules;

const eventEmitter = new NativeEventEmitter();

export const registerReceiver = () => {
  KotlinModules.registerReceiver();
};

export const unregisterReceiver = () => {
  KotlinModules.unregisterReceiver();
};

export const subscribeToDownloadComplete = (
  callback: (data: string) => void,
) => {
  const subscription = eventEmitter.addListener('Download', callback);
  return () => subscription.remove();
};
