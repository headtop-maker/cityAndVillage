import * as React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import SetLogin from '../../../features/Login/ui/SetLogin';
import {ImagesAssets} from '../../../shared/assets/picture/icons/ImageAssets';
import withModal from '../../../shared/HOC/withModal';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={ImagesAssets.backGroundImage}
        resizeMode="cover"
        style={styles.image}>
        <SetLogin />
      </ImageBackground>
    </View>
  );
};

export default withModal(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
