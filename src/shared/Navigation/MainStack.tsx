import React, {useLayoutEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SCREENS from './screens';
import MainScreen from '../../pages/Main/ui/MainScreen';
import NewsScreen from '../../pages/News/ui/NewsScreen';
import ImportantScreen from '../../pages/Importants/ImportantScreen';
import TabScreen from '../../pages/Tab/TabScreen';
import AddContentScreen from '../../pages/AddContent/ui/AddContentScreen';
import ServiceScreen from '../../pages/CityService/ui/CityServices';
import CurrentNewsScreen from '../../pages/News/ui/CurrentNewsScreen';
import {useAppSelector} from '../models/storeHooks';
import {selectCurrentUserToken} from '../models/selectors';
import LoginScreen from '../../pages/Login/ui/LoginScreen';
import RegistrationScreen from '../../pages/Registration/RegistrationScreen';
import {response} from '../api/axiosInstance';
import {requestStoragePermission} from '../lib/permissions';
import {checkStoragePermission} from '../lib/checkPermissions';
import {navigationRef, Stack} from '../lib/navigationRef';
import {requestUserPermission} from '../lib/requestUserPermission';

import messaging from '@react-native-firebase/messaging';

const MainStack = () => {
  const currentUserToken = useAppSelector(selectCurrentUserToken);

  const isPermissions = async () => {
    const check = await checkStoragePermission();
    !check && requestStoragePermission();
  };

  const firebasePermissions = async () => {
    await requestUserPermission();
  };

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('tokenFB', token);
  };

  useLayoutEffect(() => {
    !!currentUserToken && response.setToken(currentUserToken);
  }, [currentUserToken]);

  useLayoutEffect(() => {
    isPermissions();
    firebasePermissions();
    getToken();
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => console.log('nav ready')}>
      <Stack.Navigator
        initialRouteName='TabScreen'
        screenOptions={{headerShown: false}}>
        <Stack.Group>
          <Stack.Screen name={SCREENS.TabScreen} component={TabScreen} />
          <Stack.Screen name={SCREENS.MainScreen} component={MainScreen} />
          <Stack.Screen name={SCREENS.NewsScreen} component={NewsScreen} />
          <Stack.Screen
            name={SCREENS.ImportantScreen}
            component={ImportantScreen}
          />
          <Stack.Screen
            name={SCREENS.AddContentScreen}
            component={AddContentScreen}
          />
          <Stack.Screen
            name={SCREENS.ServiceScreen}
            component={ServiceScreen}
          />

          <Stack.Screen
            name={SCREENS.CurrentNewsScreen}
            component={CurrentNewsScreen}
          />
        </Stack.Group>

        <Stack.Group>
          <Stack.Screen name={SCREENS.LoginScreen} component={LoginScreen} />

          <Stack.Screen
            name={SCREENS.RegistrationScreen}
            component={RegistrationScreen}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
