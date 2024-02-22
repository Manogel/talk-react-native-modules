import {NativeEventEmitter, NativeModules} from 'react-native';

const RNCustomModule = NativeModules.RNCustomModule;
const RNCustomModuleEventEmitter = new NativeEventEmitter(RNCustomModule);

export const setData = (key: string, value: string) => {
  RNCustomModule.setData(key, value);
};

export const getDataAsync = async (key: string) => {
  return await RNCustomModule.getDataAsync(key);
};

export const getDataByCallback = (
  key: string,
  callback: (value: string) => void,
) => {
  RNCustomModule.getDataByCallback(key, callback);
};

type EventType = 'onSetData';

export const RNCustomModuleEvent = {
  on: (event: EventType, callback: (value: string) => void) => {
    return RNCustomModuleEventEmitter.addListener(event, callback);
  },
  removeAllListeners: RNCustomModuleEventEmitter.removeAllListeners,
};
