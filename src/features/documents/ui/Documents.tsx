import React from 'react';
import {View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {useGetDocumentsQuery} from '../../../shared/models/services';
import {TDocuments} from '../../../shared/models/types';
import {Button, Icon, Text} from 'react-native-paper';
import {convertDate} from '../../../shared/lib/convertDate';
import {nativeFn} from '../../../shared/lib/nativeFn';

const getMemeType = async (url: string) => {
  const reponse = await fetch(url, {
    method: 'HEAD',
  });

  const memeType = reponse.headers.get('Content-Type');
  if (memeType) {
    nativeFn.getFile({
      url: url,
      mimeType: memeType,
      title: url.split('/').pop() || 'document',
    });
  }
};

const renderItem = ({item}: {item: TDocuments[0]}) => {
  const {documentTitle, createdAt, filePath} = item;
  return (
    <TouchableOpacity style={styles.item} onPress={() => getMemeType(filePath)}>
      <Text variant="bodyLarge">{documentTitle || ''}</Text>
      <Text variant="bodySmall" style={{alignSelf: 'flex-end'}}>
        {createdAt ? convertDate(new Date(createdAt)) : ''}
      </Text>
    </TouchableOpacity>
  );
};

const Documents = () => {
  const {data, refetch, isLoading} = useGetDocumentsQuery();
  return (
    <View>
      <TouchableOpacity
        onPress={() => refetch()}
        style={{alignSelf: 'flex-end'}}>
        {!!data && <Icon source="refresh" color="#6e26f3" size={40} />}
      </TouchableOpacity>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        refreshing={isLoading}
        onRefresh={() => refetch()}
        ListEmptyComponent={
          <Button
            mode="text"
            onPress={() => {
              refetch();
            }}>
            Обновить список документов
          </Button>
        }
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
