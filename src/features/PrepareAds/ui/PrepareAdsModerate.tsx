import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import {useGetPrepareAdsQuery} from '../../../shared/models/services';
import {GetPrepareAds} from '../../../shared/models/types';

interface Service {
  _id: string;
  phone: string;
  email: string;
  categoryName: string;
  title: string;
  description: string;
  image: string;
  id: string;
}

const servicesData: Service[] = [
  {
    _id: '670f8f73462e4c8311c9361d',
    phone: '+795211111111',
    email: 'name@name.com',
    categoryName: 'build',
    title: 'Пример новой услуги',
    description:
      'Трудолюбивый сотрудник Рушан подготовит территорию вашего дома.',
    image: 'th-3852733366.jpg',
    id: '670f8f73462e4c8311c9361d',
  },
];

const PrepareAdsModerate = () => {
  const {data, refetch, isLoading} = useGetPrepareAdsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [services, setServices] = useState<Service[]>(servicesData);

  const handleDelete = (id: string) => {
    Alert.alert('Удалить', 'Вы уверены, что хотите удалить эту услугу?', [
      {text: 'Отмена', style: 'cancel'},
      {
        text: 'Удалить',
        onPress: () =>
          setServices(prev => prev.filter(service => service.id !== id)),
      },
    ]);
  };

  const handlePublish = (id: string) => {
    Alert.alert('Опубликовать', `Услуга с ID ${id} успешно опубликована!`);
  };

  const renderService = ({item}: {item: GetPrepareAds[0]}) => (
    <View style={styles.card}>
      <Image
        source={{uri: 'data:image/jpeg;base64,' + item.image}}
        style={styles.image}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title='Удалить'
          color='red'
          onPress={() => handleDelete(item.id)}
        />
        <Button
          title='Опубликовать'
          color='green'
          onPress={() => handlePublish(item.id)}
        />
      </View>
    </View>
  );

  return (
    <FlatList
      onRefresh={refetch}
      refreshing={isLoading}
      data={data}
      keyExtractor={item => item.id + 'prepare'}
      renderItem={renderService}
      contentContainerStyle={styles.container}
    />
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
});

export default PrepareAdsModerate;
