import React, {useCallback, useLayoutEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/models/storeHooks';
import {getAllUsers, setImportantMessage} from '../model/models';
import {selectAllUsers} from '../model/selectors';
import {userRole} from '../../../shared/models/types';
import UserItem from '../../../entities/User/ui/UserItem';
import DialogItem from '../../../entities/Dialog/ui/DialogItem';
import DialogText from '../../../entities/DialogText/ui/DialogText';
import {
  selectCurrentUserEmail,
  selectCurrentUserName,
  selectCurrentUserRole,
} from '../../../entities/News/models/selectors';

// interface UsersProps {}

const Users = () => {
  const [selectedId, setSelectedId] = useState<number | undefined>();
  const [importantText, setImportantText] = useState('');
  const [visible, setVisible] = useState(false);
  const [visibleImportant, setVisibleImportant] = useState(false);
  const [checked, setChecked] = useState(false);

  const currentRole = useAppSelector(selectCurrentUserRole);
  const userName = useAppSelector(selectCurrentUserName);
  const userEmail = useAppSelector(selectCurrentUserEmail);

  const allUsers = useAppSelector(selectAllUsers);
  const dispatch = useAppDispatch();

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

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
      showImportant={() => setVisibleImportant(true)}
    />
  );

  const clearData = () => {
    setImportantText('');
    setSelectedId(undefined);
    setChecked(false);
  };

  const handleMessage = () => {
    if (
      !currentRole ||
      currentRole !== userRole.admin ||
      !userName ||
      !userEmail
    ) {
      return;
    }
    const recipient = allUsers?.find(item => item.id === selectedId)?.email;

    !!recipient &&
      dispatch(
        setImportantMessage({
          author: userEmail,
          recipient: recipient,
          title: 'Сообщение пользователю',
          description: importantText,
          isImportant: checked,
        }),
      );
    clearData();
  };

  return (
    <View style={styles.container}>
      <DialogItem
        visible={visible}
        hideDialog={hideDialog}
        confirmAction={() => console.log('jjjj')}
        dialogText={'Заблокировать/Активировать пользователя'}
      />
      <DialogText
        visible={visibleImportant}
        hideDialog={() => setVisibleImportant(false)}
        confirmAction={handleMessage}
        dialogText={'Создать обращение :'}
        onChangeText={setImportantText}
        text={importantText}
        setChecked={setChecked}
        checked={checked}
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
