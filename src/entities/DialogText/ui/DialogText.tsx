import React, {FC} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {
  Button,
  Dialog,
  Portal,
  Switch,
  Text,
  TextInput,
} from 'react-native-paper';

import {dp} from '../../../shared/lib/getDP';

interface DialogItemProps {
  hideDialog: () => void;
  visible: boolean;
  dialogText: string;
  image: string;
  confirmAction: () => void;
  handleImage: () => void;
  removeImage: () => void;
  onChangeText: (data: string) => void;
  text: string;
  setChecked: (data: boolean) => void;
  checked: boolean;
  imageSize: {
    width: number;
    height: number;
  };
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
  image,
  removeImage,
  handleImage,
  imageSize,
}) => {
  const handleConfirm = async () => {
    confirmAction();
    hideDialog();
  };

  return (
    <View style={styles.container}>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Подтвердите</Dialog.Title>
          <Dialog.Content>
            <Text variant='bodyMedium'>{dialogText}</Text>
            <View style={styles.textStyle}>
              <Text variant='titleMedium'>Важно</Text>
              <Switch value={checked} onValueChange={setChecked} />
            </View>
            {image && (
              <View>
                <Image
                  style={[
                    styles.image,
                    {
                      width: imageSize.width,
                      height: imageSize.height,
                      maxWidth: dp(300),
                      maxHeight: dp(400),
                      alignSelf: 'center',
                      marginVertical: dp(5),
                      resizeMode: 'contain',
                    },
                  ]}
                  source={{
                    uri: 'data:image/jpeg;base64,' + image,
                  }}
                />
                <Button mode='text' onPress={removeImage}>
                  Удалить
                </Button>
              </View>
            )}
            <TextInput
              label='Сообщение'
              value={text}
              onChangeText={onChangeText}
              mode='flat'
              style={{marginTop: 10}}
              multiline={true}
            />
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={handleImage}>Изображение</Button>
            <Button onPress={handleConfirm} disabled={!text}>
              Отправить
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
  image: {
    marginTop: dp(10),
    marginBottom: dp(10),
    borderRadius: 5,
    alignSelf: 'center',
  },
});
