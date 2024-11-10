import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {useAppSelector} from '../../../shared/models/storeHooks';
import {selectModalText} from '../model/selectors';
import {useDispatch} from 'react-redux';
import {resetModalText} from '../../../shared/models/counterSlice';
import {Snackbar} from 'react-native-paper';
import {dp} from '../../../shared/lib/getDP';

const ModalScreen = () => {
  const modalText = useAppSelector(selectModalText);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(resetModalText());
  };

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={!!modalText}
      style={styles.modalOpacity}
      onRequestClose={handleCloseModal}>
      <View style={styles.centeredView}>
        <Snackbar
          visible={!!modalText}
          onDismiss={handleCloseModal}
          action={{
            label: 'Закрыть',
            onPress: () => {
              handleCloseModal();
            },
          }}>
          {modalText || ''}
        </Snackbar>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOpacity: {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
  modalView: {
    backgroundColor: 'white',
    borderRadius: dp(5),
    padding: dp(35),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: dp(15),
    textAlign: 'center',
  },
});

export default ModalScreen;

{
  /* <View style={[styles.modalView]}>
          <Text style={styles.modalText} variant="bodyLarge">
            {modalText ? modalText : ''}
            {otherText ? otherText : ''}
          </Text>

          <Button mode="outlined" onPress={handleCloseModal}>
            Закрыть
          </Button>
        </View> */
}

// backgroundColor: 'rgba(0, 0, 0, 0.5)',
