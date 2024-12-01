import React, {FC, memo, useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {ImagesAssets} from '../../../shared/assets/picture/icons/ImageAssets';
import {CounterState} from '../../../shared/models/types';
import {convertDate} from '../../../shared/lib/convertDate';
import {dp} from '../../../shared/lib/getDP';
import {useModal} from '../../../features/Modal/ui/ModalProvider';
import {Button, TextInput} from 'react-native-paper';

type TImportantItem = {
  handleSendMessage: (message: string, recipient: string) => void;
};

const ImportantItem: FC<CounterState['important'][0] & TImportantItem> = ({
  title,
  description,
  createdAt,
  isImportant,
  imageBase64,
  author,
  handleSendMessage,
}) => {
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [imageSize, setImageSize] = useState({width: 0, height: 0});
  const {showModal} = useModal();
  const parts = description.split('\n'); // Разделяем текст на части

  const handleImage = () => {
    if (!imageBase64 || imageBase64.length < 0) return;
    showModal(
      <View style={{padding: dp(10)}}>
        <Image
          style={[
            styles.image,
            {
              width: imageSize.width,
              height: imageSize.height,
              maxWidth: dp(300),
              maxHeight: dp(800),
              resizeMode: 'stretch',
            },
          ]}
          source={{
            uri: imageBase64,
          }}
        />
      </View>,
    );
  };

  const sandMessage = () => {
    handleSendMessage(`${description}\n${message}`, author);
    setShowForm(false);
    setMessage('');
  };

  imageBase64.length > 0 &&
    Image.getSize(imageBase64, (widthImage, heightImage) => {
      setImageSize({
        width: Math.floor(widthImage),
        height: Math.floor(heightImage),
      });
    });

  return (
    <View style={[styles.importantContainer, styles.shadow]}>
      <View style={styles.importantBox}>
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
            {parts.map((part, index) => (
              <Text
                key={index}
                style={
                  index === parts.length - 1
                    ? styles.normalText
                    : styles.highlightedText
                }>
                {index === parts.length - 1 ? part : part + `\n`}
              </Text>
            ))}
          </Text>
          {imageBase64.length > 0 && (
            <TouchableOpacity
              onPress={() => imageBase64.length > 0 && handleImage()}>
              <Image
                style={[
                  styles.image,
                  {
                    width: imageSize.width / 1.5,
                    height: imageSize.height / 1.5,
                    maxWidth: dp(300),
                  },
                ]}
                source={{
                  uri: imageBase64,
                }}
              />
            </TouchableOpacity>
          )}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Button
              icon='message-draw'
              mode='text'
              onPress={() => setShowForm(!showForm)}>
              {!showForm ? 'Ответить' : 'Закрыть'}
            </Button>
            <Text style={styles.importantDate}>
              {convertDate(new Date(createdAt))}
            </Text>
          </View>
          {showForm && (
            <View>
              <TextInput
                label='Ответ'
                style={[styles.input, styles.textArea]}
                value={message}
                multiline
                numberOfLines={2}
                mode='outlined'
                onChangeText={setMessage}
              />
              <Button
                disabled={!message}
                icon='send-circle-outline'
                mode='text'
                onPress={sandMessage}>
                Отправить
              </Button>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default memo(ImportantItem);

const styles = StyleSheet.create({
  importantContainer: {
    borderRadius: dp(10),
    margin: dp(5),
    backgroundColor: '#fafbff',
    padding: dp(5),
  },
  highlightedText: {
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 4,
  },
  normalText: {
    color: '#333',
  },
  importantBox: {flexDirection: 'row', justifyContent: 'space-between'},
  importantImageBox: {
    width: '20%',
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
    width: dp(40),
    height: dp(40),
  },
  image: {
    marginTop: dp(10),
    marginBottom: dp(10),
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
  },
  input: {
    color: '#252525',
  },
  textArea: {
    textAlignVertical: 'top',
  },
});
