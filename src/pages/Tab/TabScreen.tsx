import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SCREENS from '../../shared/Navigation/screens';
import NewsScreen from '../News/ui/NewsScreen';
import ImportantScreen from '../Importants/ImportantScreen';
import MainScreen from '../Main/ui/MainScreen';
import TabItem from './ui/TabItem';
import AddContentScreen from '../AddContent/ui/AddContentScreen';
import ServiceScreen from '../CityAdsService/ui/CityServices';
import {useAppSelector} from '../../shared/models/storeHooks';
import {
  selectCurrentAppVersion,
  selectCurrentUserRole,
  selectCurrentUserToken,
} from '../../shared/models/selectors';
import {userRole} from '../../shared/models/types';

import ImportantBtn from '../../features/getNews/ui/ImportantBtn';
import {Button, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {IRouteParamList} from '../../shared/Navigation/types';
import IsConnect from '../../features/IsConnect/ui/IsConnect';
import {StyleSheet, View} from 'react-native';

const Tab = createBottomTabNavigator();

const TabScreen = () => {
  const role = useAppSelector(selectCurrentUserRole);
  const isAdmin = role === userRole.admin;
  const currentUserToken = useAppSelector(selectCurrentUserToken);
  const currentAppVersion = useAppSelector(selectCurrentAppVersion);

  const navigation =
    useNavigation<NativeStackNavigationProp<IRouteParamList>>();

  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => (
          <View style={styles.headerRightContainer}>
            <IsConnect />
            <View>
              <Text variant='labelSmall'>{currentAppVersion || ''}</Text>
            </View>
            {currentUserToken ? (
              <ImportantBtn />
            ) : (
              <View style={{alignItems: 'center'}}>
                <Button
                  icon='login'
                  mode='text'
                  onPress={() => navigation.navigate(SCREENS.LoginScreen)}>
                  Войти
                </Button>
              </View>
            )}
          </View>
        ),
        tabBarStyle: styles.tabBarStyle,
      }}>
      <Tab.Screen
        options={{
          title: 'Главная',
          tabBarIcon: ({focused}) => {
            return <TabItem focused={focused} imgSrc='house' />;
          },
        }}
        name={SCREENS.MainScreen}
        component={MainScreen}
      />
      <Tab.Screen
        options={{
          title: 'Новости',
          tabBarIcon: ({focused}) => {
            return <TabItem focused={focused} imgSrc='newspaper' />;
          },
        }}
        name={SCREENS.NewsScreen}
        component={NewsScreen}
      />
      {!!isAdmin && (
        <Tab.Screen
          options={{
            title: 'Создать',
            tabBarIcon: ({focused}) => {
              return <TabItem focused={focused} imgSrc='add' />;
            },
          }}
          name={SCREENS.AddContentScreen}
          component={AddContentScreen}
        />
      )}
      <Tab.Screen
        options={{
          title: 'Сообщения',
          tabBarIcon: ({focused}) => {
            return <TabItem focused={focused} imgSrc='alert' />;
          },
        }}
        name={SCREENS.ImportantScreen}
        component={ImportantScreen}
      />
      <Tab.Screen
        options={{
          title: 'Услуги',
          tabBarIcon: ({focused}) => {
            return <TabItem focused={focused} imgSrc='service' />;
          },
        }}
        name={SCREENS.ServiceScreen}
        component={ServiceScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#f9f9f9',
    height: 55,
  },
});

export default TabScreen;
