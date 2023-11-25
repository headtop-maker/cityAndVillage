import React, {useLayoutEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
} from 'react-native';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/models/storeHooks';
import {crateNews, getImageForNews} from '../../../entities/News/models/models';
import {
  selectCurrentUserName,
  selectCurrentUserRole,
  selectimageForNewsFromServer,
} from '../models/selectors';
import ImageItem from './ImageItem';
import {ImagesAssets} from '../../../shared/assets/picture/icons/ImageAssets';
import {userRole} from '../../../shared/models/types';

// interface AddContentScreeProps {}

const AddNews = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const images = useAppSelector(selectimageForNewsFromServer);
  const currentRole = useAppSelector(selectCurrentUserRole);
  const userName = useAppSelector(selectCurrentUserName);

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(getImageForNews());
  }, [dispatch]);

  const isLockSend = !!title && !!description && !!imageSrc;

  const handleClick = () => {
    if (!currentRole || currentRole !== userRole.admin || !userName) {
      return;
    }

    dispatch(
      crateNews({
        description,
        title,
        image: imageSrc,
        author: userName,
      }),
    );
    setTitle('');
    setDescription('');
    setImageSrc('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.inputContainer, styles.shadow]}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Добавить новость</Text>
        </View>
        <TouchableOpacity
          style={{alignItems: 'flex-end', margin: 10}}
          onPress={() => dispatch(getImageForNews())}>
          <Image style={styles.imageRef} source={ImagesAssets.refresh} />
        </TouchableOpacity>
        <FlatList
          showsHorizontalScrollIndicator={false}
          legacyImplementation={false}
          data={images}
          style={{height: 250}}
          renderItem={({item}) => (
            <ImageItem
              id={item.id}
              description={item.description}
              title={item.title}
              url={item.url}
              user={item.user}
              setImageSrc={setImageSrc}
            />
          )}
          keyExtractor={(id, index) => id + 'images' + index}
        />
        <TextInput
          style={styles.input}
          onChangeText={setTitle}
          value={title}
          placeholder="Заголовок"
          keyboardType="default"
        />
        <TextInput
          style={[styles.input, {height: 100, textAlignVertical: 'top'}]}
          onChangeText={setDescription}
          value={description}
          placeholder="Описание новости"
          keyboardType="default"
          multiline={true}
          numberOfLines={4}
        />
        <TextInput
          style={styles.input}
          onChangeText={setImageSrc}
          value={imageSrc}
          placeholder="Ссылка на изображение"
          keyboardType="default"
          editable={false}
        />
        <TouchableOpacity
          style={[
            styles.createButton,
            {backgroundColor: !isLockSend ? '#ececec' : '#a2ff6b'},
          ]}
          disabled={!isLockSend}
          onPress={handleClick}>
          <Text>Добавить</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddNews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 5,
    borderColor: '#1467ed',
  },
  inputContainer: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  createButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    margin: 12,
    borderWidth: 0.5,
    padding: 10,
    borderColor: '#1467ed',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  textContainer: {justifyContent: 'center', alignItems: 'center', padding: 10},
  text: {fontWeight: 'bold', fontSize: 17},
  imageRef: {width: 30, height: 30},
});
