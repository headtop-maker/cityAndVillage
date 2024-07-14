import {requireNativeComponent} from 'react-native';
import React from 'react';
import {View, StyleSheet} from 'react-native';

const CameraView = requireNativeComponent('CameraView');

const CameraX = () => {
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
    width: '50%',
    height: '50%',
  },
});

export default CameraX;
