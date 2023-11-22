import React from 'react';

import {SafeAreaView, StyleSheet, View} from 'react-native';
import Important from '../../widgets/Important/ui/Important';
import withModal from '../../shared/HOC/withModal';

const ImportantScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Important />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default withModal(ImportantScreen);
