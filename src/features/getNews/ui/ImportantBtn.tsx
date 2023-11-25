import * as React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

import {useAppDispatch} from '../../../shared/models/storeHooks';
import {resetCurrentUser} from '../../../shared/models/counterSlice';

// interface ImportantBtnProps {}

const ImportantBtn = () => {
  const dispatch = useAppDispatch();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => dispatch(resetCurrentUser())}>
      <Text style={styles.text}>Выйти из приложения</Text>
    </TouchableOpacity>
  );
};

export default ImportantBtn;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#51d32a',
    borderRadius: 10,
  },
  text: {color: '#FFFFFF', fontSize: 18, fontWeight: '500'},
});
