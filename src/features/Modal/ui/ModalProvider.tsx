import React, {
  FC,
  ReactElement,
  createContext,
  useContext,
  useState,
} from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {dp} from '../../../shared/lib/getDP';

type TModalContextType = {
  showModal: (content: ReactElement) => void;
  hideModal: () => void;
} | null;

const ModalContext = createContext<TModalContextType>(null);

export const ModalProvider: FC<{children: ReactElement}> = ({children}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<ReactElement | null>(null);

  const showModal = (content: ReactElement) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{showModal, hideModal}}>
      {children}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType='fade'
        onRequestClose={hideModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {modalContent}
            <Button mode='outlined' onPress={hideModal}>
              Закрыть
            </Button>
          </View>
        </View>
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    padding: dp(20),
    backgroundColor: 'white',
    borderRadius: dp(5),
    alignItems: 'center',
  },
});
