import React from 'react';
import {
  NavigationContainer,
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SCREENS from './screens';
import MainScreen from '../../pages/Main/ui/MainScreen';
import NewsScreen from '../../pages/News/ui/NewsScreen';
import ImportantScreen from '../../pages/Importants/ImportantScreen';
import TabScreen from '../../pages/Tab/TabScreen';
import AddContentScreen from '../../pages/AddContent/ui/AddContentScreen';
import ServiceScreen from '../../pages/Service/ui/ServiceScreen';
import CurrentNewsScreen from '../../pages/News/ui/CurrentNewsScreen';
import {useAppSelector} from '../models/storeHooks';
import {selectCurrentUserToken} from '../models/selectors';
import LoginScreen from '../../pages/Login/ui/LoginScreen';
import RegistrationScreen from '../../pages/Registration/RegistrationScreen';
const navigationRef = createNavigationContainerRef();

const Stack = createNativeStackNavigator();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function push(...args) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(...args));
  }
}

const MainStack = () => {
  const currentUserToken = useAppSelector(selectCurrentUserToken);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="TabScreen"
        screenOptions={{headerShown: false}}>
        {currentUserToken ? (
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
        ) : (
          <Stack.Group>
            <Stack.Screen name={SCREENS.LoginScreen} component={LoginScreen} />

            <Stack.Screen
              name={SCREENS.RegistrationScreen}
              component={RegistrationScreen}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
