import React, {useState} from 'react';
import {
  Dimensions,
  Linking,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card, Text, Button, IconButton, Tooltip} from 'react-native-paper';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import ServiceList from '../../../entities/ProfessionalServices/serviceList/ui/ServiceList';
import {servicesSelectors} from '../../../shared/models/servicesSlice';
import {IServices} from '../../../shared/models/types';
import {callOtherFn} from '../../../shared/api/ApiCall';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/models/storeHooks';
import {selectIsLoading} from '../../../shared/models/selectors';
import withModal from '../../../shared/HOC/withModal';
import {getServices} from '../../../entities/ProfessionalServices/serviceList/model/actions';

const {width} = Dimensions.get('screen');
const itemWidth = width / 1.3;

const ItemFlat = ({
  item,
  selected,
  setSelected,
}: {
  item: IServices['response'][0];
  selected: string;
  setSelected: (data: string) => void;
}) => (
  <View style={styles.itemFlat}>
    <Card mode="outlined">
      <Card.Content>
        <Text variant="titleMedium">{item.title}</Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="text" onPress={() => setSelected(item.id)}>
          {item.id === selected ? 'Скрыть' : 'Подробнее'}
        </Button>
      </Card.Actions>
      {item.id === selected && (
        <>
          <Card.Cover
            source={{
              uri: 'https://api.slingacademy.com/public/sample-photos/5.jpeg',
            }}
          />
          <Card.Content style={{marginTop: 15}}>
            <Text variant="bodyLarge">{item.description}</Text>
          </Card.Content>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Tooltip title="Selected email">
              <IconButton
                icon="email"
                selected
                size={20}
                onPress={() => Linking.openURL(`mailto:${item.email}`)}
              />
            </Tooltip>
            <TouchableOpacity
              onPress={() => Linking.openURL(`mailto:${item.email}`)}>
              <Text variant="titleMedium">{item.email}</Text>
            </TouchableOpacity>

            <Tooltip title="Selected phone">
              <IconButton
                icon="phone"
                selected
                size={20}
                onPress={() => Linking.openURL(`tel:${item.phone}`)}
              />
            </Tooltip>
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${item.phone}`)}>
              <Text variant="titleMedium">{item.phone}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </Card>
  </View>
);

const ServiceScreen = () => {
  const [selected, setSelected] = useState('');
  const scrollY = useSharedValue(0);
  const isLoading = useAppSelector(selectIsLoading);
  const lists = useAppSelector(servicesSelectors.selectAll);
  const dispatch = useAppDispatch();

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.x;
  });

  const handleSelected = (data: string) => {
    if (selected === data) {
      setSelected('');
      return;
    }
    setSelected(data);
  };

  const handleOnRefrash = () => {
    const param = callOtherFn.getRequestParams();
    if (!!param) {
      dispatch(getServices(param));
    }
  };

  return (
    <View
      style={{flex: 1, backgroundColor: '#FFFFFF', flexDirection: 'column'}}>
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

      <SafeAreaView style={{flex: 1}}>
        <Animated.FlatList
          stickyHeaderIndices={[0]}
          ListHeaderComponent={<ServiceList />}
          data={lists}
          renderItem={({item}) => (
            <ItemFlat
              item={item}
              selected={selected}
              setSelected={handleSelected}
            />
          )}
          refreshing={isLoading}
          onRefresh={handleOnRefrash}
          keyExtractor={item => item.id + 'list'}
        />
      </SafeAreaView>
    </View>
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
    const output = [0.9, 1, 0.9];
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
export default withModal(ServiceScreen);
