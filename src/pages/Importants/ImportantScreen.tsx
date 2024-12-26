import React from 'react';

import {SafeAreaView, StyleSheet, View} from 'react-native';
import Important from '../../features/Important/ui/Important';
import withModal from '../../shared/HOC/withModal';
import {Button, Text} from 'react-native-paper';
import {useAppSelector} from '../../shared/models/storeHooks';
import {selectCurrentUserToken} from '../../shared/models/selectors';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import SCREENS from '../../shared/Navigation/screens';
import {IRouteParamList} from '../../shared/Navigation/types';
import {dp} from '../../shared/lib/getDP';

const ImportantScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<IRouteParamList>>();

  const currentUserToken = useAppSelector(selectCurrentUserToken);

  return (
    <SafeAreaView style={styles.container}>
      {currentUserToken ? (
        <>
          <Important />
        </>
      ) : (
        <View style={styles.auth}>
          <Text variant='titleLarge' style={{margin: 20}}>
            Пользователь не авторизован
          </Text>
          <Button
            icon='login'
            mode='outlined'
            onPress={() => navigation.navigate(SCREENS.LoginScreen)}>
            Войти или зарегистрироваться
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: dp(10),
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  icon: {position: 'absolute', right: dp(20), bottom: dp(50), zIndex: 10},

  sectionTitle: {
    fontSize: dp(18),
    fontWeight: '500',
  },
  auth: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default withModal(ImportantScreen);
