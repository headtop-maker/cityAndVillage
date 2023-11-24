import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import SetRegistration from '../../entities/Registration/SetRegistration';

// interface RegistrationScreenProps {}

const RegistrationScreen = () => {
  return (
    <View style={styles.container}>
      <SetRegistration />
    </View>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
