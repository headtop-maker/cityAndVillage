import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {Chip} from 'react-native-paper';

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
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bt',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6y',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d7w',
    title: 'Third Item',
  },
];

type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Chip mode="outlined" onPress={() => console.log('Pressed')}>
      {title}
    </Chip>
  </View>
);

const ServiceList = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    let yOffset = event.nativeEvent.contentOffset.x / 1;
    setScrollPosition(yOffset);
  };
  console.log('scrollPosition', scrollPosition);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id + 'service'}
        horizontal={true}
        snapToAlignment={'start'}
        scrollEventThrottle={16}
        decelerationRate={'fast'}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={event => handleScroll(event)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {margin: 3},
  title: {
    fontSize: 32,
  },
});

export default ServiceList;
