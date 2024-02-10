import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet, View} from 'react-native';
import {Card, Text, Button} from 'react-native-paper';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import ServiceList from '../../../entities/ProfessionalServices/serviceList/ui/ServiceList';

const {width} = Dimensions.get('screen');
const itemWidth = width / 1.2;

type ItemProps = {title: string};

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28be',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6r',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d7y',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d7d',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bh',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd911a97f6r',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145575e29d7y',
    title: 'Third Item',
  },
];

const ItemFlat = ({title}: ItemProps) => (
  <View style={styles.itemFlat}>
    <Card mode="outlined">
      <Card.Content>
        <Text variant="titleLarge">{title}</Text>
        <Text variant="bodyMedium">Card content</Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="text">Перейти</Button>
      </Card.Actions>
    </Card>
  </View>
);

const ServiceScreen = () => {
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      style={{flex: 1, backgroundColor: '#FFFFFF', flexDirection: 'column'}}
      stickyHeaderIndices={[1]}>
      <SafeAreaView>
        <Animated.FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          keyExtractor={x => x.toString() + 'serviceTitle'}
          renderItem={({index}) => <Item index={index} scrollY={scrollY} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
          snapToInterval={itemWidth}
          onScroll={scrollHandler}
          decelerationRate="fast"
        />
      </SafeAreaView>
      <SafeAreaView style={{margin: 5}}>
        <ServiceList />
      </SafeAreaView>

      <SafeAreaView style={{flex: 1}}>
        <Animated.FlatList
          data={DATA}
          renderItem={({item}) => <ItemFlat title={item.title} />}
          keyExtractor={item => item.id + 'list'}
        />
      </SafeAreaView>
    </Animated.ScrollView>
  );
};

const Item = ({
  index,
  scrollY,
}: {
  index: number;
  scrollY: SharedValue<number>;
}) => {
  const itemScaleStyle = useAnimatedStyle(() => {
    const input = [
      index * itemWidth - itemWidth,
      index * itemWidth,
      index * itemWidth + itemWidth,
    ];
    const output = [0.95, 1, 0.95];
    const clamp = {
      extrapolateLeft: Extrapolation.CLAMP,
      extrapolateRight: Extrapolation.CLAMP,
    };
    return {
      transform: [{scale: interpolate(scrollY.value, input, output, clamp)}],
    };
  });
  return (
    <Animated.View style={[styles.item, itemScaleStyle]}>
      <Card mode="elevated">
        <Card.Cover
          source={{
            uri: 'https://api.slingacademy.com/public/sample-photos/8.jpeg',
          }}
        />
        <Card.Content>
          <Text variant="titleMedium">Card title</Text>
        </Card.Content>
      </Card>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {},
  item: {
    width: itemWidth,
    padding: 4,
  },
  list: {
    alignItems: 'center',
    paddingHorizontal: (width - itemWidth) / 2,
  },
  itemFlat: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
  },
});
export default ServiceScreen;
