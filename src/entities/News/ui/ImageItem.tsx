import React, {FC} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {CounterState} from '../../../shared/models/types';

type TImageItem = {
  setImageSrc: (data: string) => void;
};

const ImageItem: FC<CounterState['imageForNewsFromServer'][0] & TImageItem> = ({
  url,
  setImageSrc,
}) => {
  return (
    <TouchableOpacity
      style={[styles.imageContainer]}
      onPress={() => setImageSrc(url)}>
      <Image
        style={styles.newsImage}
        source={{
          uri: url,
        }}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  newsImage: {
    height: 200,
    width: 'auto',
    borderRadius: 10,
  },
  imageContainer: {
    borderRadius: 10,
    margin: 10,
    backgroundColor: '#fafbff',
  },
  newsTextBlock: {
    margin: 15,
  },
});

export default ImageItem;
