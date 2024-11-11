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
          <Text style={styles.importantText}>
            {description ? description : ''}
          </Text>
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
  importantTitle: {fontWeight: 'bold', color: '#0e0e0e'},
  importantText: {color: '#0e0e0e'},
  importantDate: {fontWeight: 'bold', textAlign: 'right', color: '#0e0e0e'},
  importantTextBox: {width: '80%'},
  shadow: {
    shadowColor: '#7d7d7d',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 6,
  },
  importantImage: {
    width: dp(50),
    height: dp(50),
  },
});
