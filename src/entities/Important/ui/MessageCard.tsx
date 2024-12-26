import React, {FC, memo, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {CounterState} from '../../../shared/models/types';
import {convertDate} from '../../../shared/lib/convertDate';
import {dp} from '../../../shared/lib/getDP';

type TImportantItem = {
  onReply: () => void;
  handleImage: (imageBase64: string) => void;
};

const MessageCard: FC<CounterState['important'][0] & TImportantItem> = ({
  title,
  description,
  createdAt,
  isImportant,
  imageBase64,
  author,
  onReply,
  handleImage,
}) => {
  const [imageSize, setImageSize] = useState({width: 0, height: 0});

  const parts = description.split('\n'); // Разделяем текст на части

  useEffect(() => {
    imageBase64.length > 0 &&
      Image.getSize(imageBase64, (widthImage, heightImage) => {
        setImageSize({
          width: Math.floor(widthImage),
          height: Math.floor(heightImage),
        });
      });
  }, [imageBase64]);

  return (
    <View
      style={[
        styles.card,
        isImportant ? styles.importantCard : styles.simpleCard,
      ]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.author}>{author}</Text>
          <Text style={styles.normalText}>{title}</Text>
        </View>
      </View>
      {imageBase64.length > 0 && (
        <TouchableOpacity
          onPress={() => imageBase64.length > 0 && handleImage(imageBase64)}>
          <Image
            style={[
              styles.image,
              {
                width: imageSize.width / 2.5,
                height: imageSize.height / 2.5,
                resizeMode: 'contain',
              },
            ]}
            source={{
              uri: imageBase64,
            }}
          />
        </TouchableOpacity>
      )}
      <Text style={styles.message}>
        {' '}
        {parts.map((part, index) => (
          <Text
            key={index + 'importantTxt'}
            style={
              index === parts.length - 1
                ? [styles.normalText]
                : [styles.highlightedText]
            }>
            {index === parts.length - 1 ? part : part + `\n`}
          </Text>
        ))}
      </Text>
      <View style={styles.footer}>
        <Text style={styles.timestamp}>{convertDate(new Date(createdAt))}</Text>
        <TouchableOpacity style={styles.replyButton} onPress={onReply}>
          <Text style={styles.replyText}>Ответить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 5,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    marginTop: dp(10),
    marginBottom: dp(10),
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
  },
  importantCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#ff5252',
  },
  input: {
    color: '#252525',
  },
  textArea: {
    textAlignVertical: 'top',
  },
  highlightedText: {
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 4,
  },
  normalText: {
    color: '#333',
  },
  simpleCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#7bcf66',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  author: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  message: {
    fontSize: 14,
    color: '#555',
    marginVertical: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },
  replyButton: {
    backgroundColor: '#007BFF',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  replyText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default memo(MessageCard);
