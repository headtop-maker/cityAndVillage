import React, {useLayoutEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useAppSelector} from '../../../shared/models/storeHooks';
import {selectCurrentNewsId} from '../../../features/GetNews/models/selectors';
import {selectNews} from '../../../features/News/models/selectors';
import {Icon, IconButton} from 'react-native-paper';

import SCREENS from '../../../shared/Navigation/screens';
import {navigate} from '../../../shared/lib/navigationRef';
import {convertDate} from '../../../shared/lib/convertDate';

import useAnimatedShake from '../../../shared/Hooks/useAnimatedShake';
import AnimatedNews from './AnimatedNews';

import {dp} from '../../../shared/lib/getDP';
import {CounterState} from '../../../shared/models/types';

const CurrentNews = () => {
  const [currentNews, setCurrentNews] = useState<CounterState['news'][0]>();
  const leftShake = useAnimatedShake();
  const rightShake = useAnimatedShake();

  const currentNewsId = useAppSelector(selectCurrentNewsId);
  const news = useAppSelector(selectNews);

  useLayoutEffect(() => {
    const current = news.find(item => item.id === currentNewsId);
    if (current) {
      setCurrentNews(current);
    }
  }, []);

  const getNews = (type: 'Next' | 'Prev') => {
    const indexNews = news.findIndex(item => item.id === currentNews?.id);

    if (type === 'Next') {
      const newIndexNews = news[indexNews - 1];
      newIndexNews ? setCurrentNews(newIndexNews) : leftShake.handleShake();
    }

    if (type === 'Prev') {
      const newIndexNews = news[indexNews + 1];
      newIndexNews ? setCurrentNews(newIndexNews) : rightShake.handleShake();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigate(SCREENS.TabScreen, undefined)}>
        <Icon source='chevron-left' color='#6e26f3' size={40} />
      </TouchableOpacity>
      {currentNews?.image && !!currentNews && (
        <AnimatedNews uri={currentNews?.image} current={currentNews} />
      )}

      <Text style={styles.date}>
        {currentNews?.createdAt &&
          convertDate(new Date(currentNews?.createdAt))}
      </Text>
      <View style={styles.tools}>
        {leftShake.childrenShakeElement(
          <IconButton
            icon='chevron-left-circle'
            selected
            size={40}
            onPress={() => getNews('Next')}
          />,
        )}

        {rightShake.childrenShakeElement(
          <IconButton
            icon='chevron-right-circle'
            selected
            size={40}
            onPress={() => getNews('Prev')}
          />,
        )}
      </View>
    </View>
  );
};

export default CurrentNews;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},

  tools: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: dp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  surface: {
    padding: dp(8),
    height: dp(80),
    width: dp(80),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'absolute',
    zIndex: dp(2),
    top: dp(15),
    left: dp(15),
    backgroundColor: '#FFFFFF',
    borderRadius: dp(5),
  },

  newsImage: {
    height: '55%',
    margin: dp(5),
    borderRadius: dp(5),
  },

  date: {
    marginTop: dp(12),
    fontSize: 12,
    textAlign: 'right',
    color: '#9E9E9E',
    marginRight: dp(15),
  },
});
