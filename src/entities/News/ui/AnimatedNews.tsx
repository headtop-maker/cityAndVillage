import React, {FC} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {Text} from 'react-native-paper';
import Animated, {
  clamp,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {dp} from '../../../shared/lib/getDP';

type TNewsAnimatedImage = {
  uri: string | undefined;
  current:
    | {
        id: string;
        createdAt: Date;
        title: string;
        description: string;
        image: string;
        author: string;
      }
    | undefined;
};

const {height, width} = Dimensions.get('screen');

const AnimatedNews: FC<TNewsAnimatedImage> = ({uri, current}) => {
  const initY = height / 2.5;
  const initX = width;
  const translationY = useSharedValue(initY);
  const prevTranslationY = useSharedValue(initY);

  const translationX = useSharedValue(initX);
  const prevTranslationX = useSharedValue(initX);

  const offsetX = useSharedValue(0);
  const currentOffsetX = useSharedValue(0);

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      prevTranslationY.value = translationY.value;
      prevTranslationX.value = translationX.value;
    })
    .onUpdate(event => {
      translationY.value = clamp(
        prevTranslationY.value + event.translationY,
        initY,
        height / 1.4,
      );

      translationX.value = clamp(
        initX * (translationY.value / initY),
        initX,
        4000,
      );
      const param = currentOffsetX.value + event.translationX;

      offsetX.value = param < 0 ? param : 0;

      const val = translationY.value / initY;
      console.log('offsetX', offsetX.value, initX * val);
    })
    .onFinalize(() => {
      currentOffsetX.value = offsetX.value;
    })
    .runOnJS(true);

  const animatedStyles = useAnimatedStyle(() => ({
    height: translationY.value,
    width: translationX.value,
    transform: [{translateX: offsetX.value}],
  }));

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={pan}>
        <View>
          <Animated.View style={[animatedStyles]}>
            <Image
              style={[styles.image]}
              source={{
                uri: uri,
              }}
            />
          </Animated.View>
          <View style={styles.resize} />
          <Animated.View>
            <View style={styles.newsItem}>
              <Text variant='titleLarge' style={styles.newsText}>
                {current?.title}
              </Text>
            </View>
          </Animated.View>
        </View>
      </GestureDetector>

      <Animated.ScrollView
        style={styles.newsContainer}
        showsVerticalScrollIndicator={true}
        persistentScrollbar={true}>
        <Text variant='bodyLarge' style={styles.newsDescription}>
          {current?.description}
        </Text>
      </Animated.ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  newsDescription: {
    margin: dp(10),
  },
  newsContainer: {
    backgroundColor: '#FFFFFF',
    paddingLeft: dp(10),
    paddingRight: dp(10),
  },
  resize: {
    height: dp(5),
    width: dp(70),
    alignSelf: 'center',
    borderRadius: dp(10),
    backgroundColor: '#969696',
  },
  newsText: {
    alignSelf: 'flex-start',
  },
  newsItem: {
    margin: dp(15),
    borderColor: '#5e0788',
    borderBottomLeftRadius: dp(10),
  },
  circle: {
    height: dp(120),
    width: dp(120),
    borderRadius: 500,
    borderWidth: 1,
  },
});

export default AnimatedNews;
