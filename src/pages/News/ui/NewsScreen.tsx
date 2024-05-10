import React from 'react';

import {SafeAreaView, StyleSheet} from 'react-native';
import News from '../../../features/News/ui/News';
import withModal from '../../../shared/HOC/withModal';

const NewsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <News />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default withModal(NewsScreen);
