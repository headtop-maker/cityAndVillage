import {NativeModules, NativeEventEmitter} from 'react-native';

const {KotlinModules} = NativeModules;
const eventEmitter = new NativeEventEmitter(KotlinModules);

export const registerReceiver = () => {
  KotlinModules.registerReceiver();
};

export const unregisterReceiver = () => {
  KotlinModules.unregisterReceiver();
};

export const subscribeToDownloadComplete = callback => {
  const subscription = eventEmitter.addListener('DownloadComplete', callback);
  return () => subscription.remove();
};
