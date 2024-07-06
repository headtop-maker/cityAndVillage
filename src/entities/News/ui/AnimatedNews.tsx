import React, {FC} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
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
  withTiming,
} from 'react-native-reanimated';

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

const {height} = Dimensions.get('screen');

const AnimatedNews: FC<TNewsAnimatedImage> = ({uri, current}) => {
  const initY = height / 2.5;
  const translationY = useSharedValue(initY);
  const prevTranslationY = useSharedValue(initY);

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      prevTranslationY.value = translationY.value;
    })
    .onUpdate(event => {
      const maxTranslateY = height;

      translationY.value = clamp(
        prevTranslationY.value + event.translationY,
        initY,
        maxTranslateY / 1.4,
      );
    })
    .onFinalize(event => {
      if (event.translationY > 0) {
        translationY.value = withTiming(height / 1.4);
      } else {
        translationY.value = withTiming(initY);
      }
    })
    .runOnJS(true);

  const animatedStyles = useAnimatedStyle(() => ({
    height: translationY.value,
  }));

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={pan}>
        <View>
          <Animated.Image
            style={[styles.newsImage, animatedStyles]}
            source={{
              uri: uri,
            }}
          />
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
  newsImage: {
    margin: 10,
    borderRadius: 5,
  },
  newsDescription: {
    margin: 10,
  },
  newsContainer: {
    backgroundColor: '#FFFFFF',
    paddingLeft: 10,
    paddingRight: 10,
  },
  resize: {
    height: 5,
    width: 70,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#969696',
  },
  newsText: {
    alignSelf: 'flex-start',
  },
  newsItem: {
    margin: 15,
    borderColor: '#5e0788',
    borderBottomLeftRadius: 10,
  },
  circle: {
    height: 120,
    width: 120,
    borderRadius: 500,
    borderWidth: 1,
  },
});

export default AnimatedNews;
