import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Button,
  Dialog,
  Portal,
  Switch,
  Text,
  TextInput,
} from 'react-native-paper';

interface DialogItemProps {
  hideDialog: () => void;
  visible: boolean;
  dialogText: string;
  confirmAction: () => void;
  onChangeText: (data: string) => void;
  text: string;
  setChecked: (data: boolean) => void;
  checked: boolean;
}

const DialogText: FC<DialogItemProps> = ({
  hideDialog,
  visible,
  dialogText,
  confirmAction,
  onChangeText,
  text,
  setChecked,
  checked,
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
            <View style={styles.textStyle}>
              <Text variant="titleMedium">Важно</Text>
              <Switch value={checked} onValueChange={setChecked} />
            </View>

            <TextInput
              label="Сообщение"
              value={text}
              onChangeText={onChangeText}
              mode="flat"
              style={{marginTop: 10}}
              multiline={true}
            />
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={handleConfirm} disabled={!text}>
              Ok
            </Button>
            <Button onPress={hideDialog}>Отмена</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default DialogText;

const styles = StyleSheet.create({
  container: {flex: 1},
  textStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
