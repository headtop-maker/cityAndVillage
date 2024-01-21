import React from 'react';

import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import Important from '../../features/Important/ui/Important';
import withModal from '../../shared/HOC/withModal';
import {Avatar} from 'react-native-paper';

const ImportantScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.icon}>
        <Avatar.Icon size={50} icon="pencil-plus-outline" color="#FFFFFF" />
      </TouchableOpacity>

      <Important />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  icon: {position: 'absolute', right: 20, bottom: 50, zIndex: 10},

  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default withModal(ImportantScreen);
