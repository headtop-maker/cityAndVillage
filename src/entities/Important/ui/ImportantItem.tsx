import React, {FC} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {ImagesAssets} from '../../../shared/assets/picture/icons/ImageAssets';
import {CounterState} from '../../../shared/models/types';
import {convertDate} from '../../../shared/lib/convertDate';
import {dp} from '../../../shared/lib/getDP';

const ImportantItem: FC<CounterState['important'][0]> = ({
  title,
  description,
  createdAt,
  isImportant,
}) => {
  return (
    <View style={[styles.importantContainer, styles.shadow]}>
      <TouchableOpacity
        style={styles.importantBox}
        onPress={() => console.log('kkk')}>
        <View style={styles.importantImageBox}>
          {isImportant === true && (
            <Image
              style={styles.importantImage}
              source={ImagesAssets.important}
            />
          )}

          {isImportant === false && (
            <Image
              style={styles.importantImage}
              source={ImagesAssets.information}
            />
          )}
        </View>
        <View style={styles.importantTextBox}>
          <Text style={styles.importantTitle}>{title}</Text>
          <Text>{description ? description : ''}</Text>
          <Text style={styles.importantDate}>
            {convertDate(new Date(createdAt))}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ImportantItem;

const styles = StyleSheet.create({
  importantContainer: {
    borderRadius: dp(10),
    margin: dp(5),
    backgroundColor: '#fafbff',
    padding: dp(5),
  },
  importantBox: {flexDirection: 'row', justifyContent: 'space-between'},
  importantImageBox: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  importantTitle: {fontWeight: 'bold'},
  importantDate: {fontWeight: 'bold', textAlign: 'right'},
  importantTextBox: {width: '80%'},
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
  importantImage: {
    width: dp(50),
    height: dp(50),
  },
});
