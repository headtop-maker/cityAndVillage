import {Dimensions, PixelRatio} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');
const baseWidth = 375;

const scale = screenWidth / baseWidth;

export const dp = (size: number) => {
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};
