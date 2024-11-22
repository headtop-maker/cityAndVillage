import {Button, Text} from 'react-native-paper';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {nativeFn} from '../../../shared/lib/nativeFn';
import {dp} from '../../../shared/lib/getDP';
import {AppState, Platform, View} from 'react-native';
import {useModal} from '../../Modal/ui/ModalProvider';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/models/storeHooks';
import {setCheckLegacy} from '../../../shared/models/counterSlice';
import {selectCheckLegacy} from '../../../shared/models/selectors';

const openSettings = async () => {
  await nativeFn.openAppPermissionSettings();
};

const OpenSettingsButton = () => {
  const [appState, setAppState] = useState(AppState.currentState);
  const [show, setShow] = useState(false);
  const checkLegacy = useAppSelector(selectCheckLegacy);
  const dispatch = useAppDispatch();
  const {showModal} = useModal();

  const handleShowModal = useCallback(() => {
    showModal(
      <View style={{padding: dp(5)}}>
        <Text>Уведомления отключены. </Text>
        <Text>Пожалуйста, включите их в настройках.. </Text>
      </View>,
    );
  }, [showModal]);

  const check = () => {
    if (Platform.OS === 'android' && Platform.Version < 33) {
      nativeFn.areNotificationsEnabled().then(data => {
        if (data === false) {
          !checkLegacy && handleShowModal();
          setShow(true);
          dispatch(setCheckLegacy(true));
        }
        if (data === true) {
          setShow(false);
        }
      });
    }
  };

  useEffect(() => {
    check();
  }, [appState]);

  useEffect(() => {
    const listener = AppState.addEventListener('change', state =>
      setAppState(state),
    );
    return () => {
      listener.remove();
    };
  }, [appState]);

  return (
    <>
      {show && (
        <Button
          icon='cellphone-settings'
          mode='outlined'
          style={{margin: dp(3)}}
          onPress={openSettings}>
          Настройки приложения
        </Button>
      )}
    </>
  );
};

export default memo(OpenSettingsButton);
