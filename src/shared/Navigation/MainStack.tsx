import React, {useLayoutEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SCREENS from './screens';
import MainScreen from '../../pages/Main/ui/MainScreen';
import NewsScreen from '../../pages/News/ui/NewsScreen';
import ImportantScreen from '../../pages/Importants/ImportantScreen';
import TabScreen from '../../pages/Tab/TabScreen';
import AddContentScreen from '../../pages/AddContent/ui/AddContentScreen';
import ServiceScreen from '../../pages/CityAdsService/ui/CityServices';
import CurrentNewsScreen from '../../pages/News/ui/CurrentNewsScreen';
import {useAppSelector} from '../models/storeHooks';
import {selectCurrentUserToken} from '../models/selectors';
import LoginScreen from '../../pages/Login/ui/LoginScreen';
import RegistrationScreen from '../../pages/Registration/RegistrationScreen';
import {response} from '../api/axiosInstance';
import {
  requestMediaPermission,
  requestReadStoragePermission,
  requestStoragePermission,
} from '../lib/permissions';
import {checkStoragePermission} from '../lib/checkPermissions';
import {navigate, navigationRef, Stack} from '../lib/navigationRef';
import {requestUserPermission} from '../lib/requestUserPermission';
import BootSplash from 'react-native-bootsplash';
import {Alert} from 'react-native';

import messaging from '@react-native-firebase/messaging';
import {useAddFireBaseTokenMutation} from '../models/services';
import {requestNotificationPermission} from '../lib/requestNotificationPermission';
import {requestNotificationLegacy} from '../lib/requestNotificationLegacy';
import {selectCurrentUserEmail} from '../../entities/News/models/selectors';
import {LinkingNav} from './types';
import PrepareServiceScreen from '../../pages/PrepareService/PrepareServiceScreen';

const MainStack = () => {
  const [addToken] = useAddFireBaseTokenMutation();
  const currentUserToken = useAppSelector(selectCurrentUserToken);
  const userEmail = useAppSelector(selectCurrentUserEmail);

  const isPermissions = async () => {
    const check = await checkStoragePermission();
    !check && (await requestStoragePermission());

    !check && (await requestReadStoragePermission());
  };

  const firebasePermissions = async () => {
    await requestUserPermission();
  };

  const getFirebaseToken = async () => {
    if (!currentUserToken || !userEmail) return;
    const newFirebasetoken = await messaging().getToken();
    newFirebasetoken && addToken({tokens: newFirebasetoken, owner: userEmail});
  };

  useLayoutEffect(() => {
    !!currentUserToken && response.setToken(currentUserToken);
  }, [currentUserToken]);

  useLayoutEffect(() => {
    (async function () {
      await requestNotificationPermission();
      await requestNotificationLegacy();
      await requestMediaPermission();
      await isPermissions();
      await firebasePermissions();
      await getFirebaseToken();
    })();
    return messaging().onMessage(async remoteMessage => {
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
      );
      if (remoteMessage.data) {
        if (remoteMessage.data.type === LinkingNav.message) {
          navigate(SCREENS.ImportantScreen);
        }
        if (remoteMessage.data.type === LinkingNav.news) {
          navigate(SCREENS.NewsScreen);
        }
      }
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
          <Stack.Screen
            name={SCREENS.PrepareServiceScreen}
            component={PrepareServiceScreen}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
