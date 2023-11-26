import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import SetLogin from '../../../widgets/Login/ui/SetLogin';

// interface LoginScreenProps {}

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <SetLogin />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
