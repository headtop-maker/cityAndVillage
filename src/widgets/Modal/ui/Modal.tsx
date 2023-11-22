import React from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ActivityIndicator,
} from 'react-native';
import {useAppSelector} from '../../../shared/models/storeHooks';
import {selectModalError, selectModalText} from '../model/selectors';
import {useDispatch} from 'react-redux';
import {resetModalText} from '../../../shared/models/counterSlice';

const ModalScreen = () => {
  const modalText = useAppSelector(selectModalText);
  const error = useAppSelector(selectModalError);
  const dispatch = useDispatch();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={!!modalText}
      style={styles.modalOpacity}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView]}>
          <Text style={styles.modalText}>{modalText ? modalText : ''}</Text>
          {!error && <ActivityIndicator size="large" />}
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => dispatch(resetModalText())}>
            <Text style={styles.textStyle}>Закрыть</Text>
          </Pressable>
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
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
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
