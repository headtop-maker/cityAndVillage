import * as React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

import {getNews} from '../../../entities/News/models/models';
import {useAppDispatch} from '../../../shared/models/storeHooks';

// interface ImportantBtnProps {}

const ImportantBtn = () => {
  const dispatch = useAppDispatch();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => dispatch(getNews(1))}>
      <Text style={styles.text}>+ Загрузить новости</Text>
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
