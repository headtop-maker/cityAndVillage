import {
  View,
  Linking,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {IServices} from '../../../shared/models/types';
import {Card, Text, Button, IconButton, Tooltip} from 'react-native-paper';

const {width} = Dimensions.get('screen');
const itemWidth = width / 1.3;

const CityServiceCardItem = ({
  item,
  selected,
  setSelected,
}: {
  item: IServices['response'][0];
  selected: string;
  setSelected: (data: string) => void;
}) => (
  <View style={styles.itemFlat}>
    <Card mode='outlined'>
      <Card.Content>
        <Text variant='titleMedium'>{item.title}</Text>
      </Card.Content>
      <Card.Actions>
        <Button mode='text' onPress={() => setSelected(item.id)}>
          {item.id === selected ? 'Скрыть' : 'Открыть'}
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
            <Text variant='bodyLarge'>{item.description}</Text>
          </Card.Content>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Tooltip title='Selected email'>
              <IconButton
                icon='email'
                selected
                size={20}
                onPress={() => Linking.openURL(`mailto:${item.email}`)}
              />
            </Tooltip>
            <TouchableOpacity
              onPress={() => Linking.openURL(`mailto:${item.email}`)}>
              <Text variant='titleMedium'>{item.email}</Text>
            </TouchableOpacity>

            <Tooltip title='Selected phone'>
              <IconButton
                icon='phone'
                selected
                size={20}
                onPress={() => Linking.openURL(`tel:${item.phone}`)}
              />
            </Tooltip>
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${item.phone}`)}>
              <Text variant='titleMedium'>{item.phone}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </Card>
  </View>
);

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

export default CityServiceCardItem;
