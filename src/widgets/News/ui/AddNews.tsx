import React, {useLayoutEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  NativeModules,
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
} from '../../../entities/News/models/selectors';
import ImageItem from '../../../entities/News/ui/ImageItem';
import {ImagesAssets} from '../../../shared/assets/picture/icons/ImageAssets';
import {userRole} from '../../../shared/models/types';
import {Button, TextInput, Text} from 'react-native-paper';
import {FileParamsType} from '../../../shared/types';
import axios from 'axios';

// interface AddContentScreeProps {}

const {KotlinModules} = NativeModules;

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

  const handleAddImage = async () => {
    try {
      const file: FileParamsType = await KotlinModules.openFile();
      console.log('file', file);
      const formData = new FormData();

      formData.append('file', {
        uri: file.fileUri,
        type: 'image/jpeg',
        name: 'photo.jpg', // поправить имя
      });
      const response = await axios({
        method: 'post',
        url: 'http://192.168.1.101:3000/upload',
        data: formData,
        headers: {
          accept: 'application/json',
          'content-type': 'multipart/form-data',
        },
      });
      console.log('response', response);
    } catch (e) {
      console.error(e);
    }
  };

  const imageItems = ({
    item,
  }: {
    item: {
      description: string;
      id: number;
      title: string;
      url: string;
      user: number;
    };
  }) => (
    <ImageItem
      id={item.id}
      description={item.description}
      title={item.title}
      url={item.url}
      user={item.user}
      setImageSrc={setImageSrc}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.inputContainer, styles.shadow]}>
        <Text style={styles.titleTextStyle} variant="titleLarge">
          Добавить новость
        </Text>
        <View style={styles.addFileContainer}>
          <Button
            mode="outlined"
            style={styles.createButton}
            onPress={handleAddImage}>
            Загрузить
          </Button>
          <TouchableOpacity
            style={{alignItems: 'flex-end', margin: 10}}
            onPress={() => dispatch(getImageForNews())}>
            <Image style={styles.imageRef} source={ImagesAssets.refresh} />
          </TouchableOpacity>
        </View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          legacyImplementation={false}
          data={images}
          style={{height: 200}}
          renderItem={imageItems}
          keyExtractor={(id, index) => id + 'images' + index}
        />

        <TextInput
          style={styles.input}
          label="Заголовок"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
        />
        <TextInput
          style={styles.input}
          label="Описание новости"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          multiline={true}
        />

        <TextInput
          style={styles.input}
          label="Ссылка на изображение"
          value={imageSrc}
          onChangeText={setImageSrc}
          mode="outlined"
          disabled={true}
        />

        <Button
          mode="elevated"
          style={styles.createButton}
          disabled={!isLockSend}
          onPress={handleClick}>
          Добавить
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default AddNews;

const styles = StyleSheet.create({
  container: {
    // flex: 0.6,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  input: {
    margin: 5,
  },
  inputContainer: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  createButton: {
    margin: 12,
  },
  titleTextStyle: {
    marginTop: 10,
    alignSelf: 'center',
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
  addFileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
