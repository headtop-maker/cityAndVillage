import React from 'react';
import {StyleSheet, View} from 'react-native';

import AddNews from '../../../widgets/News/ui/AddNews';

// interface AddContentScreeProps {}

const AddContentScreen = () => {
  return (
    <View style={styles.container}>
      <AddNews />
    </View>
  );
};

export default AddContentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
