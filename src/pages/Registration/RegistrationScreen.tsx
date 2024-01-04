import * as React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import SetRegistration from '../../features/Registration/ui/SetRegistration';
import {ImagesAssets} from '../../shared/assets/picture/icons/ImageAssets';
import withModal from '../../shared/HOC/withModal';

// interface RegistrationScreenProps {}

const RegistrationScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={ImagesAssets.backGroundImage}
        resizeMode="cover"
        style={styles.image}>
        <SetRegistration />
      </ImageBackground>
    </View>
  );
};

export default withModal(RegistrationScreen);

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
