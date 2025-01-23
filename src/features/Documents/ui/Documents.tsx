import React from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import {useGetDocumentsQuery} from '../../../shared/models/services';
import {TDocuments} from '../../../shared/models/types';
import {Button, Icon, Text} from 'react-native-paper';
import {convertDate} from '../../../shared/lib/convertDate';
import {nativeFn} from '../../../shared/lib/nativeFn';
import {dp} from '../../../shared/lib/getDP';

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

const handleDownload = (data: {documentTitle: string; filePath: string}) => {
  Alert.alert('Получить', `Файл: ${data.documentTitle} ?`, [
    {text: 'Отмена', style: 'cancel'},
    {
      text: 'Скачать',
      onPress: async () => getMemeType(data.filePath),
    },
  ]);
};

const renderItem = ({item}: {item: TDocuments[0]}) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => {
      handleDownload({
        documentTitle: item.documentTitle,
        filePath: item.filePath,
      });
    }}>
    <View style={styles.iconContainer}>
      <Icon source='file-document-outline' size={30} color='#6A1B9A' />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.documentName}>{item.documentTitle}</Text>
      <Text style={styles.documentDate}>
        {item.createdAt ? convertDate(new Date(item.createdAt)) : ''}
      </Text>
    </View>
    <Icon source='chevron-right' size={24} color='#BDBDBD' />
  </TouchableOpacity>
);

const Documents = () => {
  const {data, refetch, isLoading} = useGetDocumentsQuery();

  return (
    <View>
      <TouchableOpacity
        onPress={() => refetch()}
        style={{alignSelf: 'flex-end'}}>
        {!!data && <Icon source='refresh' color='#6e26f3' size={25} />}
      </TouchableOpacity>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        refreshing={isLoading}
        onRefresh={() => refetch()}
        ListEmptyComponent={
          <Button
            mode='text'
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
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: dp(16),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: dp(12),
    borderRadius: 8,
    marginBottom: dp(12),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginRight: dp(12),
  },
  textContainer: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  documentDate: {
    fontSize: 12,
    color: '#888',
    marginTop: dp(4),
  },
});
export default Documents;
