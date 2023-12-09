import * as React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {userRole} from '../../../shared/models/types';
import {FC} from 'react';

interface UserItemProps {
  item: {
    id: number;
    name: string;
    email: string;
    banned: boolean;
    userRole: userRole;
  };
  setSelectedId: (data: number | undefined) => void;
  selectedId: number | undefined;
  showDialog: () => void;
  showImportant: () => void;
}

const UserItem: FC<UserItemProps> = ({
  item,
  setSelectedId,
  selectedId,
  showDialog,
  showImportant,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selectedItem}
        onPress={() => setSelectedId(item.id)}>
        <View style={styles.userInfo}>
          <Text variant="titleMedium">{item.name}</Text>
          <Text variant="titleSmall">{item.email}</Text>
          <View style={styles.role}>
            <Text variant="bodyLarge">Роль : {item.userRole}</Text>
          </View>
        </View>

        <View style={styles.actionBtn}>
          <Button
            mode={item.banned ? 'outlined' : 'contained'}
            onPress={() => {
              setSelectedId(item.id);
              showDialog();
            }}>
            {item.banned ? 'Активировать' : 'Заблокировать'}
          </Button>
        </View>
      </TouchableOpacity>
      {item.id === selectedId && (
        <View style={styles.btnBlock}>
          <Button
            mode="contained-tonal"
            onPress={() => {
              showImportant();
              setSelectedId(item.id);
            }}>
            Создать обращение
          </Button>
          <Button mode="outlined" onPress={() => setSelectedId(undefined)}>
            Скрыть
          </Button>
        </View>
      )}
    </View>
  );
};

export default UserItem;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  selectedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionBtn: {
    justifyContent: 'center',
    flex: 0.45,
  },
  role: {flexDirection: 'row'},
  userInfo: {flex: 0.55},
});
