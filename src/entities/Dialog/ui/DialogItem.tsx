import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Dialog, Portal, Text, TextInput} from 'react-native-paper';

interface DialogItemProps {
  hideDialog: () => void;
  visible: boolean;
  dialogText: string;
  confirmAction: () => void;
}

const DialogItem: FC<DialogItemProps> = ({
  hideDialog,
  visible,
  dialogText,
  confirmAction,
}) => {
  const handleConfirm = () => {
    confirmAction();
    hideDialog();
  };

  return (
    <View style={styles.container}>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Подтвердите</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{dialogText}</Text>
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={handleConfirm}>Ok</Button>
            <Button onPress={hideDialog}>Отмена</Button>
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
