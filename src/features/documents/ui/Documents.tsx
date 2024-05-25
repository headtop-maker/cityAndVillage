import React from 'react';
import {View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {useGetDocumentsQuery} from '../../../shared/models/services';
import {TDocuments} from '../../../shared/models/types';
import {Icon, Text} from 'react-native-paper';

const renderItem = ({item}: {item: TDocuments[0]}) => {
  return (
    <View style={styles.item}>
      <Text variant="bodyLarge">{item.documentTitle}</Text>
    </View>
  );
};

const Documents = () => {
  const {data, error, refetch} = useGetDocumentsQuery();
  console.log('data', data);
  return (
    <View>
      <TouchableOpacity
        onPress={() => refetch()}
        style={{alignSelf: 'flex-end'}}>
        <Icon source="refresh" color="#6e26f3" size={40} />
      </TouchableOpacity>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  item: {
    borderWidth: 0.5,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    padding: 10,
    borderRadius: 5,
  },
});
export default Documents;
