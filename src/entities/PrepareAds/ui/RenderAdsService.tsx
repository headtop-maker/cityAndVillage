import {
  Alert,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import {
  GetPrepareAds,
  PrepareAds,
  ServiceTitleItem,
} from '../../../shared/models/types';
import {useModal} from '../../../features/Modal/ui/ModalProvider';
import {dp} from '../../../shared/lib/getDP';

type TRenderAdsService = {
  itemAds: GetPrepareAds[0];
  service: ServiceTitleItem[];
  addService: (data: PrepareAds) => void;
  deletePrepareAds: (id: string) => void;
};

const RenderAdsService: FC<TRenderAdsService> = ({
  itemAds,
  service,
  deletePrepareAds,
  addService,
}) => {
  const {categoryName, description, email, id, image, phone, title} = itemAds;
  const [category, setCategory] = useState(categoryName || '');
  const {showModal, hideModal} = useModal();

  const asyncDelete = async () => {
    deletePrepareAds(id);
  };

  const handleDelete = () => {
    Alert.alert('Удалить', 'Вы уверены, что хотите удалить эту услугу?', [
      {text: 'Отмена', style: 'cancel'},
      {
        text: 'Удалить',
        onPress: () => asyncDelete(),
      },
    ]);
  };

  const handlePublish = () => {
    Alert.alert(
      'Добавить услугу',
      'При добавлении убедитесь в корректности категории.',
      [
        {text: 'Отмена', style: 'cancel'},
        {
          text: 'Добавить',
          onPress: () =>
            addService({
              categoryName: category,
              description: description,
              phone: phone,
              email: email,
              title: title,
              image: image,
            }),
        },
      ],
    );
  };

  const handleOpenCategory = async () => {
    if (service.length === 0) return;
    showModal(
      <FlatList
        data={service}
        keyExtractor={(it, index) => `${it}-${index}`}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              setCategory(item.categoryName);
              hideModal();
            }}>
            <Text style={styles.text}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />,
    );
  };

  return (
    <View style={styles.card}>
      <Image
        source={{uri: 'data:image/jpeg;base64,' + itemAds.image}}
        style={styles.image}
      />
      <Text style={styles.title}>{itemAds.title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.buttonContainer}>
        <Button title='Удалить' color='red' onPress={handleDelete} />
        <Button
          title={category}
          color='gray'
          onPress={() => handleOpenCategory()}
        />
        <Button title='Опубликовать' color='green' onPress={handlePublish} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    padding: dp(12),
    marginVertical: dp(8),
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default RenderAdsService;
