import {useCallback, useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {nativeFn} from '../lib/nativeFn';

const useDimensions = () => {
  const screen = Dimensions.get('screen');
  const [rem, setRem] = useState<number>(10);
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
    },
    [screenWidth, screenHeigth, isLandScape],
  );

  const handleRem = async () => {
    setRem(Math.round(await nativeFn.getDpToPX()));
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({window}) => {
      memoizedCallback(window);
    });
    handleRem();

    return () => subscription?.remove();
  }, [memoizedCallback]);
  return {screenWidth, screenHeigth, isLandScape, rem};
};

export default useDimensions;
