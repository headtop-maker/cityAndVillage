import React, {useCallback, useLayoutEffect, useState} from 'react';
import {View, StyleSheet, FlatList, TextInput} from 'react-native';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/models/storeHooks';
import {getAllUsers, setBannedUser, setImportantMessage} from '../model/models';
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
import {dp} from '../../../shared/lib/getDP';

const Users = () => {
  const [query, setQuery] = useState('');
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

  const sortUser =
    allUsers.length > 0 &&
    [...allUsers].sort((a, b) => a.name.localeCompare(b.name, 'ru'));

  const filteredData = sortUser.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );

  const recipient = allUsers?.find(item => item.id === selectedId)?.email;
  const currentBanned = allUsers?.find(item => item.id === selectedId)?.banned;

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const fetchUsers = useCallback(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useLayoutEffect(() => {
    fetchUsers();
  }, [dispatch, fetchUsers]);

  const lock =
    !currentRole || currentRole !== userRole.admin || !userName || !userEmail;

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
    if (lock) {
      return;
    }

    !!recipient &&
      dispatch(
        setImportantMessage({
          author: userEmail,
          authorName: userName,
          recipient: recipient,
          title: 'От: ' + userName,
          description: importantText,
          isImportant: checked,
        }),
      );
    clearData();
  };

  const bannedUser = () => {
    !!recipient &&
      selectedId &&
      dispatch(setBannedUser({id: selectedId, banned: !currentBanned}));
    clearData();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Введите ФИО'
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={filteredData}
        renderItem={userItems}
        keyExtractor={item => item.id + 'users'}
        onRefresh={() => fetchUsers()}
        refreshing={false}
      />
      <DialogItem
        visible={visible}
        hideDialog={hideDialog}
        confirmAction={bannedUser}
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
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf3fe',
  },
  input: {
    height: dp(50),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: dp(8),
    fontSize: 16,
    color: 'blue',
    backgroundColor: '#FFFFFF',
    margin: dp(5),
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: dp(20),
    marginVertical: dp(8),
    marginHorizontal: dp(16),
  },
  title: {
    fontSize: dp(32),
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
