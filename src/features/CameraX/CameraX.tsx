import {
  NativeEventEmitter,
  NativeModules,
  requireNativeComponent,
} from 'react-native';
import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

const CameraView = requireNativeComponent('CameraView');

const CameraX = () => {
  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.CameraView);
    let eventListener = eventEmitter.addListener('sendJsEvent', event => {
      console.log('sendJsEvent', JSON.stringify(event, null, 2));
    });

    // Removes the listener once unmounted
    return () => {
      eventListener.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '90%',
    height: '90%',
  },
});

export default CameraX;
