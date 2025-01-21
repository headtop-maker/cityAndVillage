import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

// Моковые данные для списка ответов
const replies = [
  {
    id: '1',
    user: 'Иван Петров',
    avatar: 'https://via.placeholder.com/50',
    text: 'Я считаю, что JavaScript подходит для большинства задач благодаря своей универсальности.',
    likes: 15,
    time: '2 часа назад',
  },
  {
    id: '2',
    user: 'Анна Иванова',
    avatar: 'https://via.placeholder.com/50',
    text: 'На мой взгляд, Python идеально подходит для анализа данных и машинного обучения.',
    likes: 28,
    time: '1 час назад',
  },
  {
    id: '3',
    user: 'Сергей Смирнов',
    avatar: 'https://via.placeholder.com/50',
    text: 'Не забывайте про TypeScript! Он делает разработку на JavaScript более безопасной.',
    likes: 12,
    time: '30 минут назад',
  },
];

const DiscussionsScreen = () => {
  const renderReplyCard = ({item}: {item: (typeof replies)[0]}) => (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.username}>{item.user}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.text}>{item.text}</Text>
        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={styles.replyButton}>Ответить</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={replies}
        renderItem={renderReplyCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  text: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeText: {
    fontSize: 14,
    color: '#e74c3c',
  },
  replyButton: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: 'bold',
  },
});

export default DiscussionsScreen;
