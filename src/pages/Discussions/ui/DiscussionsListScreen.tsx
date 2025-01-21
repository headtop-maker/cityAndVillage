import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {dp} from '../../../shared/lib/getDP';
import {navigate} from '../../../shared/lib/navigationRef';
import SCREENS from '../../../shared/Navigation/screens';
import {Icon} from 'react-native-paper';

// Моковые данные для списка обсуждений
const discussions = [
  {
    id: '1',
    title: 'Какой лучший язык программирования?',
    description: 'Давайте обсудим преимущества и недостатки популярных языков.',
    author: 'Иван Петров',
    avatar: 'https://via.placeholder.com/50',
    commentsCount: 12,
    likes: 45,
  },
  {
    id: '2',
    title: 'React vs Vue: что выбрать?',
    description: 'Какие у вас предпочтения и почему?',
    author: 'Анна Иванова',
    avatar: 'https://via.placeholder.com/50',
    commentsCount: 34,
    likes: 78,
  },
  // Добавьте больше данных, если нужно
];

const DiscussionsListScreen = () => {
  const renderDiscussionCard = ({item}: {item: (typeof discussions)[0]}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigate(SCREENS.DiscussionsScreen)}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.meta}>
          <Text style={styles.author}>{item.author}</Text>
          <View style={styles.stats}>
            <Text style={styles.statText}>💬 {item.commentsCount}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon} onPress={() => console.log('111')}>
        <Icon source='pencil-plus-outline' color='#6e26f3' size={40} />
      </TouchableOpacity>
      <FlatList
        data={discussions}
        renderItem={renderDiscussionCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: dp(16),
  },
  icon: {
    position: 'absolute',
    right: dp(20),
    bottom: dp(50),
    zIndex: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: dp(8),
    padding: dp(16),
    marginBottom: dp(16),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
  },

  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: dp(8),
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: dp(12),
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  author: {
    fontSize: 12,
    color: '#999',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#999',
    marginLeft: dp(8),
  },
});

export default DiscussionsListScreen;
