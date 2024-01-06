import React, {FC} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {TServiceItem} from '../../../../shared/types';
import {ImagesAssets} from '../../../../shared/assets/picture/icons/ImageAssets';

const ServiceItem: FC<TServiceItem> = ({nameService, imgSrc, id}) => {
  return (
    <TouchableOpacity
      style={[styles.mediumBox, styles.shadow]}
      onPress={() => console.log(nameService)}
      key={'service' + id}>
      <View style={styles.iconBorder}>
        <Image style={styles.professionsImage} source={ImagesAssets[imgSrc]} />
      </View>
    </TouchableOpacity>
  );
};

export default ServiceItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
    margin: 5,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fbfffe',
  },
  professionsImage: {
    width: 60,
    height: 60,
  },
  iconBorder: {
    borderWidth: 0.5,
    padding: 15,
    borderRadius: 10,
    borderColor: '#521cfd',
  },
});
