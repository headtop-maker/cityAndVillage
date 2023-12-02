import React, {useCallback, useLayoutEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/models/storeHooks';
import {getAllUsers} from '../model/models';
import {selectAllUsers} from '../model/selectors';
import {
  Avatar,
  Button,
  Card,
  Icon,
  IconButton,
  MD3Colors,
  Text,
} from 'react-native-paper';
import {userRole} from '../../../shared/models/types';

// interface UsersProps {}

const Users = () => {
  const allUsers = useAppSelector(selectAllUsers);
  const dispatch = useAppDispatch();

  const fetchUsers = useCallback(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useLayoutEffect(() => {
    fetchUsers();
  }, [dispatch, fetchUsers]);

  const userItems = ({
    item,
  }: {
    item: {
      id: number;
      name: string;
      email: string;
      banned: boolean;
      userRole: userRole;
    };
  }) => (
    <View
      style={{
        margin: 10,
        backgroundColor: item.banned ? '#e9e9e9' : '#bbffbb',
        borderRadius: 10,
        padding: 10,
      }}>
      <Text variant="titleSmall">Имя : {item.name}</Text>
      <Text variant="titleSmall">E-mail : {item.email}</Text>
      <View style={{flexDirection: 'row'}}>
        <Text variant="bodyLarge">
          Роль : {item.userRole}
          {'  '}
        </Text>

        <Text variant="bodyLarge">
          Статус : {item.banned ? 'Заблокирован' : 'Активен'}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={allUsers}
        renderItem={userItems}
        keyExtractor={item => item.id + 'users'}
        onRefresh={() => fetchUsers()}
        refreshing={false}
      />
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
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
