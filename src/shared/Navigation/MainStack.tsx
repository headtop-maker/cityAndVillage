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
import {
  selectCurrentUserToken,
  selectFireBaseTokenAdded,
} from '../models/selectors';
import LoginScreen from '../../pages/Login/ui/LoginScreen';
import RegistrationScreen from '../../pages/Registration/RegistrationScreen';
import {response} from '../api/axiosInstance';
import {
  requestReadStoragePermission,
  requestStoragePermission,
} from '../lib/permissions';
import {checkStoragePermission} from '../lib/checkPermissions';
import {navigationRef, Stack} from '../lib/navigationRef';
import {requestUserPermission} from '../lib/requestUserPermission';
import BootSplash from 'react-native-bootsplash';
import {Alert} from 'react-native';

import messaging from '@react-native-firebase/messaging';
import {useAddFireBaseTokenMutation} from '../models/services';

const MainStack = () => {
  const [addToken] = useAddFireBaseTokenMutation();
  const currentUserToken = useAppSelector(selectCurrentUserToken);
  const fireBaseTokenAdded = useAppSelector(selectFireBaseTokenAdded);

  const isPermissions = async () => {
    const check = await checkStoragePermission();
    !check && (await requestStoragePermission());

    !check && (await requestReadStoragePermission());
  };

  const firebasePermissions = async () => {
    await requestUserPermission();
  };

  const getToken = async () => {
    const token = await messaging().getToken();
    if (!fireBaseTokenAdded) {
      addToken({tokens: token});
    }
  };

  useLayoutEffect(() => {
    !!currentUserToken && response.setToken(currentUserToken);
  }, [currentUserToken]);

  useLayoutEffect(() => {
    (async function () {
      await isPermissions();
      await firebasePermissions();
      await getToken();
    })();
    return messaging().onMessage(async remoteMessage => {
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
      );
    });
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        BootSplash.hide();
      }}>
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
