import {
  HostComponent,
  NativeEventEmitter,
  NativeModules,
  ViewStyle,
  requireNativeComponent,
} from 'react-native';
import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

interface IHostComponent {
  style: ViewStyle;
}

const CameraView: HostComponent<IHostComponent> =
  requireNativeComponent('CameraView');

const CameraX = () => {
  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.CameraView);
    let eventListener = eventEmitter.addListener('sendJsEvent', event => {
      if (Array.isArray(event) && event.length > 0) {
        console.log('sendJsEvent', JSON.stringify(event, null, 2));
      }
    });

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
