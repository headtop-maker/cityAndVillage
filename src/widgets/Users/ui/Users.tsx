import React, {useLayoutEffect} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/models/storeHooks';
import {getAllUsers} from '../model/models';
import {selectAllUsers} from '../model/selectors';

// interface UsersProps {}
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
];

type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Users = () => {
  const allUsers = useAppSelector(selectAllUsers);
  const dispatch = useAppDispatch();
  console.log(allUsers);
  useLayoutEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const userItems = ({
    item,
  }: {
    item: {
      title: string;
    };
  }) => <Item title={item.title} />;

  return (
    <View style={styles.container}>
      <Text>Name</Text>
      <Text>Email</Text>
      <FlatList
        data={DATA}
        renderItem={userItems}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
