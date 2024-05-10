import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useAppSelector} from '../../../shared/models/storeHooks';
import {selectCurrentNewsId} from '../../../features/getNews/models/selectors';
import {selectNews} from '../../../features/News/models/selectors';
import {Icon, IconButton, Tooltip} from 'react-native-paper';

import SCREENS from '../../../shared/Navigation/screens';
import {navigate} from '../../../shared/lib/navigationRef';
import {convertDate} from '../../../shared/lib/convertDate';
import Rating from '../../../features/Rating/ui/Rating';

const CurrentNews = () => {
  const currentNewsId = useAppSelector(selectCurrentNewsId);
  const news = useAppSelector(selectNews);
  const current = news.find(item => item.id === currentNewsId);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigate(SCREENS.TabScreen, undefined)}>
        <Icon source="chevron-left" color="#6e26f3" size={40} />
      </TouchableOpacity>

      <Image
        style={[styles.newsImage]}
        source={{
          uri: current?.image,
        }}
      />

      <View style={styles.newsItem}>
        <Text style={styles.newsText}>{current?.title}</Text>
      </View>
      <ScrollView style={styles.newsContainer}>
        <Text style={styles.newsDescription}>{current?.description}</Text>
      </ScrollView>
      <Text style={styles.newsCreateAt}>
        {current?.createdAt && convertDate(new Date(current?.createdAt))}
      </Text>
      <View style={styles.tools}>
        <IconButton
          icon="arrow-left-bold-box-outline"
          selected
          size={50}
          onPress={() => {}}
        />
        <View style={{alignItems: 'center'}}>
          <Text>Оценить новость</Text>
          <Rating
            count={5}
            onChandge={(data: number) => console.log('currentRating', data)}
            iconSize={25}
            iconStyle={styles.star}
          />
        </View>

        <IconButton
          icon="arrow-right-bold-box-outline"
          selected
          size={50}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default CurrentNews;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  newsContainer: {
    backgroundColor: '#FFFFFF',
    paddingLeft: 10,
    paddingRight: 10,
  },
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
  newsItem: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
    borderColor: '#5e0788',
    borderBottomLeftRadius: 10,
  },
  newsImage: {
    height: '55%',
    margin: 5,
    borderRadius: 5,
  },
  newsText: {
    fontSize: 20,
    fontWeight: '600',
    alignSelf: 'flex-start',
  },
  newsDescription: {
    fontSize: 15,
    fontWeight: '400',
    marginTop: 10,
  },

  newsCreateAt: {
    marginTop: 10,
    marginRight: 10,
    fontSize: 16,
    fontWeight: '500',
    alignSelf: 'flex-end',
  },
});
