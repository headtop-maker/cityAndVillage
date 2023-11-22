import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SCREENS from '../../shared/Navigation/screens';
import NewsScreen from '../News/ui/NewsScreen';
import ImportantScreen from '../Importants/ImportantScreen';
import MainScreen from '../Main/ui/MainScreen';
import TabItem from './ui/TabItem';
import AddContentScreen from '../AddContent/ui/AddContentScreen';
import ServiceScreen from '../Service/ui/ServiceScreen';

const Tab = createBottomTabNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#f9f9f9',
          height: 55,
        },
      }}>
      <Tab.Screen
        options={{
          title: 'Главная',
          tabBarIcon: ({focused}) => {
            return <TabItem focused={focused} imgSrc="house" />;
          },
        }}
        name={SCREENS.MainScreen}
        component={MainScreen}
      />
      <Tab.Screen
        options={{
          title: 'Новости',
          tabBarIcon: ({focused}) => {
            return <TabItem focused={focused} imgSrc="newspaper" />;
          },
        }}
        name={SCREENS.NewsScreen}
        component={NewsScreen}
      />
      <Tab.Screen
        options={{
          title: 'Создать',
          tabBarIcon: ({focused}) => {
            return <TabItem focused={focused} imgSrc="add" />;
          },
        }}
        name={SCREENS.AddContentScreen}
        component={AddContentScreen}
      />
      <Tab.Screen
        options={{
          title: 'Важное',
          tabBarIcon: ({focused}) => {
            return <TabItem focused={focused} imgSrc="alert" />;
          },
        }}
        name={SCREENS.ImportantScreen}
        component={ImportantScreen}
      />
      <Tab.Screen
        options={{
          title: 'Услуги',
          tabBarIcon: ({focused}) => {
            return <TabItem focused={focused} imgSrc="service" />;
          },
        }}
        name={SCREENS.ServiceScreen}
        component={ServiceScreen}
      />
    </Tab.Navigator>
  );
};

export default TabScreen;
