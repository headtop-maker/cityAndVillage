import React, {FC} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {ImagesAssets} from '../../../shared/assets/picture/icons/ImageAssets';

interface ITabItemProps {
  focused?: boolean;
  imgSrc: keyof typeof ImagesAssets;
}

const TabItem: FC<ITabItemProps> = ({focused, imgSrc}) => {
  return (
    <View
      style={[
        styles.tabStyle,
        {
          borderWidth: focused ? 0.5 : 0,
          backgroundColor: focused ? '#b2ffb9' : '#ffffff',
        },
      ]}>
      <Image style={styles.tabImage} source={ImagesAssets[imgSrc]} />
    </View>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  tabStyle: {
    borderColor: '#7ed07e',
    padding: 5,
    borderRadius: 50,
  },
  tabImage: {width: 20, height: 20},
});
