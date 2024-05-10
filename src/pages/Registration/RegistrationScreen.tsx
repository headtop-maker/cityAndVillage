import * as React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import SetRegistration from '../../features/Registration/ui/SetRegistration';
import {ImagesAssets} from '../../shared/assets/picture/icons/ImageAssets';
import withModal from '../../shared/HOC/withModal';
import {Icon} from 'react-native-paper';
import {navigate} from '../../shared/lib/navigationRef';
import SCREENS from '../../shared/Navigation/screens';

// interface RegistrationScreenProps {}

const RegistrationScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigate(SCREENS.TabScreen, undefined)}>
        <Icon source="chevron-left" color="#6e26f3" size={40} />
      </TouchableOpacity>
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
  iconContainer: {
    position: 'absolute',
    zIndex: 2,
    top: 15,
    left: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
});
