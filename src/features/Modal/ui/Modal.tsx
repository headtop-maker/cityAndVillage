import React, {useEffect, useState} from 'react';
import {Alert, Modal, StyleSheet, View} from 'react-native';
import {useAppSelector} from '../../../shared/models/storeHooks';
import {selectModalText} from '../model/selectors';
import {useDispatch} from 'react-redux';
import {resetModalText} from '../../../shared/models/counterSlice';
import {Button, Text} from 'react-native-paper';
import {callOtherFn} from '../../../shared/api/ApiCall';

const ModalScreen = () => {
  const [otherText, setOtherText] = useState('');
  const modalText = useAppSelector(selectModalText);
  const dispatch = useDispatch();

  useEffect(() => {
    callOtherFn.setOtherFn(setOtherText);
  }, []);

  const handleCloseModal = () => {
    dispatch(resetModalText());
    callOtherFn.getOtherFn('');
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={!!modalText || !!otherText}
      style={styles.modalOpacity}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView]}>
          <Text style={styles.modalText} variant="bodyLarge">
            {modalText ? modalText : ''}
            {otherText ? otherText : ''}
          </Text>

          <Button mode="outlined" onPress={handleCloseModal}>
            Закрыть
          </Button>
        </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalOpacity: {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
  modalView: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 35,
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
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalScreen;
