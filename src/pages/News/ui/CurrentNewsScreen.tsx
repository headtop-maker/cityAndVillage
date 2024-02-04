import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import CurrentNews from '../../../entities/News/ui/CurrentNews';

// interface CurrentNewsProps {}

const CurrentNewsScreen = () => {
  return (
    <View style={styles.container}>
      <CurrentNews />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default CurrentNewsScreen;
