import React, {FC} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {ImagesAssets} from '../../../shared/assets/picture/icons/ImageAssets';
import {dp} from '../../../shared/lib/getDP';

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
          backgroundColor: focused ? '#deb7ff' : '#ffffff',
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
    padding: dp(5),
    borderRadius: dp(50),
    width: dp(40),
    alignItems: 'center',
  },
  tabImage: {width: dp(20), height: dp(20)},
});
