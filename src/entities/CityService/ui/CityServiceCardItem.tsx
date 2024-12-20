import React, {FC} from 'react';
import {
  View,
  Linking,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {IServices} from '../../../shared/models/types';
import {Card, Text, Button, IconButton, Tooltip} from 'react-native-paper';
import {dp} from '../../../shared/lib/getDP';

const {width} = Dimensions.get('screen');
const itemWidth = width / 1.3;
type TCityServiceCardItem = {
  item: IServices['response'][0];
  selected: string;
  setSelected: (data: string) => void;
  isAdmin: boolean;
  deleteItem: (data: string) => void;
};

const CityServiceCardItem: FC<TCityServiceCardItem> = ({
  item,
  selected,
  setSelected,
  isAdmin,
  deleteItem,
}) => {
  const {title, id, description, email, phone, image} = item;
  return (
    <View style={styles.itemFlat}>
      <Card mode='outlined'>
        <Card.Content>
          <Text variant='titleMedium'>{title}</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode='text' onPress={() => setSelected(id)}>
            {id === selected ? 'Скрыть' : 'Открыть'}
          </Button>
        </Card.Actions>
        {id === selected && (
          <>
            <Card.Cover
              source={{
                uri: image
                  ? 'data:image/jpeg;base64,' + image
                  : 'https://api.slingacademy.com/public/sample-photos/5.jpeg',
              }}
            />
            <Card.Content style={{marginTop: 15}}>
              <Text variant='bodyLarge'>{description}</Text>
            </Card.Content>
            <View style={styles.linkContainer}>
              {!!email && (
                <View style={styles.tools}>
                  <Tooltip title='Selected email'>
                    <IconButton
                      icon='email'
                      selected
                      size={dp(20)}
                      onPress={() =>
                        !!email && Linking.openURL(`mailto:${email}`)
                      }
                    />
                  </Tooltip>
                  <TouchableOpacity
                    onPress={() =>
                      !!email && Linking.openURL(`mailto:${email}`)
                    }>
                    <Text variant='titleMedium'>{email}</Text>
                  </TouchableOpacity>
                </View>
              )}
              {!!phone && (
                <View style={styles.tools}>
                  <Tooltip title='Selected phone'>
                    <IconButton
                      icon='phone'
                      selected
                      size={dp(20)}
                      onPress={() => !!phone && Linking.openURL(`tel:${phone}`)}
                    />
                  </Tooltip>
                  <TouchableOpacity
                    onPress={() => !!phone && Linking.openURL(`tel:${phone}`)}>
                    <Text variant='titleMedium'>{phone}</Text>
                  </TouchableOpacity>
                </View>
              )}
              {!!isAdmin && (
                <View style={styles.tools}>
                  <Tooltip title='Selected phone'>
                    <IconButton
                      icon='delete-outline'
                      selected
                      size={dp(20)}
                      onPress={() => !!isAdmin && deleteItem(id)}
                    />
                  </Tooltip>
                  <TouchableOpacity onPress={() => !!isAdmin && deleteItem(id)}>
                    <Text variant='titleMedium'>Удалить</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </>
        )}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  item: {
    width: itemWidth,
    padding: dp(4),
  },
  list: {
    alignItems: 'center',
    paddingHorizontal: (width - itemWidth) / 2,
  },
  itemFlat: {
    marginLeft: dp(10),
    marginRight: dp(10),
    marginBottom: dp(10),
  },
  title: {
    fontSize: dp(32),
  },
  linkContainer: {
    alignItems: 'flex-start',
  },
  tools: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CityServiceCardItem;
