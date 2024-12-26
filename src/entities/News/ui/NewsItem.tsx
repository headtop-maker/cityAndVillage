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
import {Button, IconButton, Tooltip} from 'react-native-paper';
import {convertDate} from '../../../shared/lib/convertDate';
import {dp} from '../../../shared/lib/getDP';

const NewsItem: FC<
  CounterState['news'][0] & {isAdmin: boolean; deleteItem: (id: string) => void}
> = ({id, title, createdAt, image, isAdmin, deleteItem, description}) => {
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
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.newsMetaText}>
          {isAdmin && (
            <Tooltip title='Selected phone'>
              <IconButton
                icon='delete-outline'
                selected
                size={dp(20)}
                onPress={() => !!isAdmin && deleteItem(id)}
              />
            </Tooltip>
          )}
          <Text>{convertDate(new Date(createdAt))}</Text>

          <Button mode='text' onPress={handleNavigate}>
            подробнее...
          </Button>
        </View>
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: dp(8),
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  newsImage: {
    height: dp(190),
    borderRadius: dp(10),
  },
  defaultImage: {
    height: dp(190),
    width: dp(225),
    borderRadius: dp(10),
    alignSelf: 'center',
  },
  newsContainer: {
    borderRadius: dp(10),
    marginTop: dp(10),
    marginLeft: dp(5),
    marginBottom: dp(3),
    marginRight: dp(5),
    backgroundColor: '#fafbff',
  },
  newsTextBlock: {
    margin: dp(10),
  },
  newsTitleText: {
    fontSize: dp(18),
    fontWeight: '600',
  },
  newsText: {
    fontSize: dp(15),
    fontWeight: '500',
  },
  newsMetaText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: dp(5),
    alignItems: 'center',
  },
});

export default NewsItem;
