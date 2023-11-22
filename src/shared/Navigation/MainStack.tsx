import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SCREENS from './screens';
import MainScreen from '../../pages/Main/ui/MainScreen';
import NewsScreen from '../../pages/News/ui/NewsScreen';
import ImportantScreen from '../../pages/Importants/ImportantScreen';
import TabScreen from '../../pages/Tab/TabScreen';
import AddContentScreen from '../../pages/AddContent/ui/AddContentScreen';
import ServiceScreen from '../../pages/Service/ui/ServiceScreen';
import CurrentNewsScreen from '../../pages/News/ui/CurrentNewsScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TabScreen"
        screenOptions={{headerShown: false}}>
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
        <Stack.Screen name={SCREENS.ServiceScreen} component={ServiceScreen} />

        <Stack.Screen
          name={SCREENS.CurrentNewsScreen}
          component={CurrentNewsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
