import React, {useLayoutEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
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
import {Button, TextInput, Text, Portal, Dialog} from 'react-native-paper';

import {setImageFile} from '../models/models';
import useDimensions from '../../../shared/HOC/useDimensions';
import {dp} from '../../../shared/lib/getDP';
import {serviceApi} from '../../../shared/models/services';

// interface AddContentScreeProps {}

const AddNews = () => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const images = useAppSelector(selectimageForNewsFromServer);
  const currentRole = useAppSelector(selectCurrentUserRole);
  const userName = useAppSelector(selectCurrentUserName);
  const {rem} = useDimensions();
  const hideDialog = () => setVisible(false);

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(getImageForNews());
  }, [dispatch]);

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
    dispatch(setImageFile());
    dispatch(serviceApi.util.invalidateTags(['UploadFile']));
  };

  const handleShowImage = async () => {
    await dispatch(getImageForNews());
    await setVisible(true);
  };

  const imageItems = ({
    item,
  }: {
    item: {
      url: string;
    };
  }) => (
    <ImageItem
      url={item.url}
      setImageSrc={data => {
        setImageSrc(data);
        hideDialog();
      }}
    />
  );
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              legacyImplementation={false}
              data={images}
              renderItem={imageItems}
              keyExtractor={(id, index) => id + 'images' + index}
              numColumns={2}
              contentContainerStyle={styles.dialog}
            />
          </Dialog>
        </Portal>
        <View
          style={[styles.inputContainer, styles.shadow, {margin: rem / 2.5}]}>
          <Text
            style={[styles.titleTextStyle, {marginTop: rem / 2.5}]}
            variant='titleLarge'>
            Добавить новость
          </Text>
          <View style={styles.addFileContainer}>
            <Button
              mode='outlined'
              style={{margin: rem / 3}}
              onPress={handleAddImage}>
              Загрузить
            </Button>
            <TouchableOpacity
              style={[styles.refresh, {margin: rem / 3}]}
              onPress={() => dispatch(getImageForNews())}>
              <Image style={styles.imageRef} source={ImagesAssets.refresh} />
            </TouchableOpacity>
          </View>
          <Button
            mode='contained'
            style={{margin: rem / 3}}
            onPress={handleShowImage}>
            Выбрать изображение
          </Button>
          <TextInput
            style={styles.input}
            label='Заголовок'
            value={title}
            onChangeText={setTitle}
            mode='outlined'
          />
          <TextInput
            style={styles.input}
            label='Описание новости'
            value={description}
            onChangeText={setDescription}
            mode='outlined'
            multiline={true}
          />

          <TextInput
            style={styles.input}
            label='Ссылка на изображение'
            value={imageSrc}
            onChangeText={setImageSrc}
            mode='outlined'
            disabled={true}
          />

          <Button
            mode='outlined'
            style={{margin: dp(10)}}
            onPress={handleClick}>
            Добавить
          </Button>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default AddNews;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  dialog: {padding: 15},
  refresh: {
    alignItems: 'flex-end',
  },
  input: {
    margin: dp(5),
  },
  inputContainer: {
    borderRadius: dp(10),
    backgroundColor: '#FFFFFF',
  },
  titleTextStyle: {
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
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: dp(10),
  },
  text: {
    fontWeight: 'bold',
    fontSize: dp(17),
  },
  imageRef: {width: dp(30), height: dp(30)},
  addFileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
