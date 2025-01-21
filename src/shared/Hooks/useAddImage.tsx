import {useState} from 'react';
import {Alert, Image} from 'react-native';
import {nativeFn} from '../lib/nativeFn';
import {base64ByteSize} from '../lib/base64ByteSize';

const useAddImage = () => {
  const [image, setImage] = useState('');
  const [imageSize, setImageSize] = useState({width: 0, height: 0});
  const handleImage = async () => {
    try {
      const {base64Image} = await nativeFn.base64Image();

      if (base64ByteSize(base64Image) > 95000) {
        Alert.alert('Ошибка выбора', 'Размер изображения слишком большой');
        return;
      }

      Image.getSize(
        `data:image/jpeg;base64,${base64Image}`,
        (widthImage, heightImage) => {
          setImageSize({
            width: Math.floor(widthImage / 2),
            height: Math.floor(heightImage / 2),
          });
        },
      );

      if (base64Image) {
        setImage(base64Image);
      }
    } catch (error) {
      Alert.alert('Ошибка сжатия изображения', error.toString());
    }
  };

  const removeImage = () => {
    setImage('');
  };

  return {handleImage, image, imageSize, removeImage};
};

export default useAddImage;
