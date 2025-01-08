import {useState} from 'react';
import {Alert, Image} from 'react-native';
import {nativeFn} from '../lib/nativeFn';

const useAddImage = () => {
  const [image, setImage] = useState('');
  const [imageSize, setImageSize] = useState({width: 0, height: 0});
  const handleImage = async () => {
    try {
      const result = await nativeFn.base64Image();
      Image.getSize(
        `data:image/jpeg;base64,${result.base64Image}`,
        (widthImage, heightImage) => {
          setImageSize({
            width: Math.floor(widthImage / 2),
            height: Math.floor(heightImage / 2),
          });
        },
      );
      if (result.base64Image) {
        setImage(result.base64Image);
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
