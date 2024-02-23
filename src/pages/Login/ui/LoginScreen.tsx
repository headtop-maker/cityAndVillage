import * as React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import SetLogin from '../../../features/Login/ui/SetLogin';
import {ImagesAssets} from '../../../shared/assets/picture/icons/ImageAssets';
import withModal from '../../../shared/HOC/withModal';
import {Icon} from 'react-native-paper';
import {navigate} from '../../../shared/Navigation/MainStack';
import SCREENS from '../../../shared/Navigation/screens';

const LoginScreen = () => {
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
  iconContainer: {
    position: 'absolute',
    zIndex: 2,
    top: 15,
    left: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
