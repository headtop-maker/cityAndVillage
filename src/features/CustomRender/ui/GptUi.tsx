import React from 'react';
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';

const data = [
  {
    id: '1',
    artist: 'MANIZHA',
    title: 'Люстра',
    plays: '201K',
    likes: '2,760',
    comments: '82',
    shares: '10',
    imageUrl: 'https://rickandmortyapi.com/api/character/avatar/597.jpeg', // Замените на настоящий URL изображения
  },
  {
    id: '2',
    artist: 'Igor Piskunov',
    title: 'Gutter Brothers x Kat Haus - Fam...',
    plays: '27.2K',
    likes: '364',
    comments: '22',
    shares: '3',
    imageUrl: 'https://rickandmortyapi.com/api/character/avatar/38.jpeg', // Замените на настоящий URL изображения
  },
  {
    id: '3',
    artist: '2v',
    title: 'Karma Fields – Skyline(AA Edit)',
    plays: '30K',
    likes: '381',
    comments: '16',
    shares: '6',
    imageUrl: 'https://rickandmortyapi.com/api/character/avatar/684.jpeg', // Замените на настоящий URL изображения
  },
];

const TrackItem = ({item}: {item: (typeof data)[0]}) => (
  <View style={styles.trackContainer}>
    <Image source={{uri: item.imageUrl}} style={styles.image} />
    <View style={styles.textContainer}>
      <Text style={styles.artist}>{item.artist}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.metricsContainer}>
        <Text style={styles.metric}>▶ {item.plays}</Text>
        <Text style={styles.metric}>♥ {item.likes}</Text>
        <Text style={styles.metric}>💬 {item.comments}</Text>
        <Text style={styles.metric}>🔁 {item.shares}</Text>
      </View>
    </View>
  </View>
);

const GptUi = () => {
  return (
    <FlatList
      data={data}
      renderItem={({item}) => <TrackItem item={item} />}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  trackContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  artist: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 14,
    color: '#666',
  },
  metricsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  metric: {
    marginRight: 10,
    fontSize: 12,
    color: '#666',
  },
});

export default GptUi;
