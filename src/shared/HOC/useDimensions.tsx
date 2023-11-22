import {useCallback, useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

const getRem = (width: number) => {
  return Math.floor(width / 380) * 10;
  // if (width > 768) { // расчет из интернета
  //   return Math.floor(width / 17);
  // } else if (width > 414) {
  //   return Math.floor(width / 16);
  // } else if (width > 375) {
  //   return Math.floor(width / 21);
  // } else if (width > 320) {
  //   return Math.floor(width / 20);
  // }
};

const useDimensions = () => {
  const screen = Dimensions.get('screen');
  const [rem, setRem] = useState<number | undefined>(getRem(screen.width));
  const [screenWidth, setScreenWidth] = useState<number>(screen.width);
  const [screenHeigth, setScreenHeigth] = useState<number>(screen.width);
  const [isLandScape, setIsLandScape] = useState(
    screen.width > screen.height ? true : false,
  );

  const memoizedCallback = useCallback(
    (window: {width: number; height: number}) => {
      setScreenWidth(window.width);
      setScreenHeigth(window.height);
      setIsLandScape(window.width > window.height ? true : false);
      setRem(getRem(window.width));
    },
    [],
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({window}) => {
      memoizedCallback(window);
    });
    return () => subscription?.remove();
  }, [memoizedCallback]);
  return [screenWidth, screenHeigth, isLandScape, rem];
};

export default useDimensions;
