import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Dialog, Portal, Text} from 'react-native-paper';

interface DialogItemProps {
  hideDialog: () => void;
  visible: boolean;
  dialogText: string;
}

const DialogItem: FC<DialogItemProps> = ({hideDialog, visible, dialogText}) => {
  return (
    <View style={styles.container}>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Подтверердите</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{dialogText}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default DialogItem;

const styles = StyleSheet.create({
  container: {flex: 1},
});
