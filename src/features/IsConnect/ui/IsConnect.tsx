import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {Icon, Text} from 'react-native-paper';

const IsConnect = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>();

  useEffect(() => {
    // Подписываемся на изменения подключения
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    // Отписываемся при размонтировании компонента
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={{flexDirection: 'row', width: '50%', alignItems: 'center'}}>
      {!isConnected && (
        <>
          <Icon source='lan-disconnect' color='#6e26f3' size={20} />
          <Text variant='bodyMedium' style={{color: '#ff0606'}}>
            Нет сети
          </Text>
        </>
      )}
    </View>
  );
};

export default IsConnect;
