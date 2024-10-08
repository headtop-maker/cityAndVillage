import React, {useLayoutEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useAppSelector} from '../../../shared/models/storeHooks';
import {selectCurrentNewsId} from '../../../features/getNews/models/selectors';
import {selectNews} from '../../../features/News/models/selectors';
import {Icon, IconButton, Tooltip} from 'react-native-paper';

import SCREENS from '../../../shared/Navigation/screens';
import {navigate} from '../../../shared/lib/navigationRef';
import {convertDate} from '../../../shared/lib/convertDate';
import Rating from '../../../features/Rating/ui/Rating';
import useAnimatedShake from '../../../shared/Hooks/useAnimatedShake';
import AnimatedNews from './AnimatedNews';
import {ImagesAssets} from '../../../shared/assets/picture/icons/ImageAssets';

interface TCurrent {
  id: string;
  createdAt: Date;
  title: string;
  description: string;
  image: string;
  author: string;
}

const CurrentNews = () => {
  const [currentNews, setCurrentNews] = useState<TCurrent>();
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
      !!newIndexNews ? setCurrentNews(newIndexNews) : leftShake.handleShake();
    }

    if (type === 'Prev') {
      const newIndexNews = news[indexNews + 1];
      !!newIndexNews ? setCurrentNews(newIndexNews) : rightShake.handleShake();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconContainer}
        // @ts-ignore
        onPress={() => navigate(SCREENS.TabScreen, undefined)}>
        <Icon source='chevron-left' color='#6e26f3' size={40} />
      </TouchableOpacity>
      {currentNews?.image && !!currentNews && (
        <AnimatedNews uri={currentNews?.image} current={currentNews} />
      )}

      <Text style={styles.newsCreateAt}>
        {currentNews?.createdAt &&
          convertDate(new Date(currentNews?.createdAt))}
      </Text>
      <View style={styles.tools}>
        {leftShake.childrenShakeElement(
          <IconButton
            icon='arrow-left-bold-box-outline'
            selected
            size={50}
            onPress={() => getNews('Next')}
          />,
        )}

        <View style={{alignItems: 'center'}}>
          <Text>Оценить новость</Text>
          <Rating
            count={5}
            onChandge={(data: number) => console.log('currentRating', data)}
            iconSize={25}
            iconStyle={styles.star}
          />
        </View>
        {rightShake.childrenShakeElement(
          <IconButton
            icon='arrow-right-bold-box-outline'
            selected
            size={50}
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
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surface: {
    padding: 8,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'absolute',
    zIndex: 2,
    top: 15,
    left: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },

  newsImage: {
    height: '55%',
    margin: 5,
    borderRadius: 5,
  },

  newsCreateAt: {
    marginTop: 10,
    marginRight: 10,
    fontSize: 16,
    fontWeight: '500',
    alignSelf: 'flex-end',
  },
});
