import React, {FC} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {IRouteParamList} from '../../../shared/Navigation/types';
import SCREENS from '../../../shared/Navigation/screens';
import {CounterState} from '../../../shared/models/types';
import {useAppDispatch} from '../../../shared/models/storeHooks';
import {setCurrentNewsId} from '../../../shared/models/counterSlice';
import {ImagesAssets} from '../../../shared/assets/picture/icons/ImageAssets';

const NewsItem: FC<CounterState['news'][0]> = ({
  id,
  title,
  createdAt,
  image,
}) => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<IRouteParamList>>();

  const handleNavigate = () => {
    if (id) {
      dispatch(setCurrentNewsId(id));
      navigation.navigate(SCREENS.CurrentNewsScreen);
    }
  };
  return (
    <TouchableOpacity
      style={[styles.newsContainer, styles.shadow]}
      onPress={handleNavigate}>
      {image ? (
        <Image
          style={styles.newsImage}
          source={{
            uri: image,
          }}
        />
      ) : (
        <Image style={styles.defaultImage} source={ImagesAssets.defaultImage} />
      )}

      <View style={styles.newsTextBlock}>
        <Text style={styles.newsText}>{title}</Text>
        <TouchableOpacity style={styles.newsMetaText} onPress={handleNavigate}>
          <Text>{`${createdAt}`}</Text>
          <Text style={{fontWeight: 'bold'}}>еще...</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },

  newsImage: {
    height: 200,
    borderRadius: 10,
  },
  defaultImage: {
    height: 200,
    width: 225,
    borderRadius: 10,
    alignSelf: 'center',
  },
  newsContainer: {
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 5,
    marginBottom: 5,
    marginRight: 5,
    backgroundColor: '#fafbff',
  },
  newsTextBlock: {
    margin: 15,
  },
  newsTitleText: {
    fontSize: 18,
    fontWeight: '600',
  },
  newsText: {
    fontSize: 15,
    fontWeight: '500',
  },
  newsMetaText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
});

export default NewsItem;
