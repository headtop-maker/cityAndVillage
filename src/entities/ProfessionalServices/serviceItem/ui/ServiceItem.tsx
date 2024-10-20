import React, {FC} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {TServiceItem} from '../../../../shared/types';
import {ImagesAssets} from '../../../../shared/assets/picture/icons/ImageAssets';
import {Text} from 'react-native-paper';
import {dp} from '../../../../shared/lib/getDP';

type TProp = {
  setSection: (data: TServiceItem['imgSrc']) => void;
};

const ServiceItem: FC<TServiceItem & TProp> = ({
  imgSrc,
  id,
  nameService,
  setSection,
}) => {
  return (
    <TouchableOpacity
      style={[styles.mediumBox, styles.shadow]}
      onPress={() => setSection(imgSrc)}
      key={'service' + id}>
      <View style={styles.iconBorder}>
        <Image style={styles.professionsImage} source={ImagesAssets[imgSrc]} />
      </View>
      <Text variant='bodySmall' style={{marginBottom: 5}}>
        {nameService}
      </Text>
    </TouchableOpacity>
  );
};

export default ServiceItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: dp(10),
  },
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
  mediumBox: {
    margin: dp(5),
    width: dp(100),
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
    borderRadius: dp(10),
    backgroundColor: '#fbfffe',
  },
  professionsImage: {
    width: dp(60),
    height: dp(60),
  },
  iconBorder: {
    margin: dp(5),
    borderWidth: 0.5,
    padding: dp(15),
    borderRadius: dp(10),
    borderColor: '#521cfd',
  },
});
