import React, {useCallback, useLayoutEffect, useState} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/models/storeHooks';
import {getAllUsers} from '../model/models';
import {selectAllUsers} from '../model/selectors';
import {Button, Text} from 'react-native-paper';
import {userRole} from '../../../shared/models/types';
import UserItem from '../../../entities/User/ui/UserItem';
import DialogItem from '../../../entities/Dialog/ui/DialogItem';

// interface UsersProps {}

const Users = () => {
  const [selectedId, setSelectedId] = useState<number>();

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

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
    <UserItem
      item={item}
      selectedId={selectedId}
      setSelectedId={setSelectedId}
      showDialog={showDialog}
    />
  );

  return (
    <View style={styles.container}>
      <DialogItem
        visible={visible}
        hideDialog={hideDialog}
        dialogText={'Заблокировать/Активировать пользователя'}
      />
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
    backgroundColor: '#ecf3fe',
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
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
