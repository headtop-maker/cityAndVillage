import React, {useLayoutEffect, useState} from 'react';

import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import withModal from '../../../shared/HOC/withModal';
import CityServices from '../../../features/cityServices/ui/CityServices';
import {Icon, Text} from 'react-native-paper';

import UpdateApp from '../../../features/Update/ui/UpdateApp';
import Documents from '../../../features/documents/ui/Documents';
import ServiceItem from '../../../entities/ProfessionalServices/serviceItem/ui/ServiceItem';
import {TServiceItem} from '../../../shared/types';
import SendMessage from '../../../features/SendMessage/ui/SendMessage';
import MyBanner from '../../../shared/Components/Shake/ui/Banner';

import {dp} from '../../../shared/lib/getDP';
import {nativeFn} from '../../../shared/lib/nativeFn';
import {navigate} from '../../../shared/lib/navigationRef';
import SCREENS from '../../../shared/Navigation/screens';

const MainScreen = () => {
  const [section, setSection] = useState<TServiceItem['imgSrc']>('government');

  useLayoutEffect(() => {
    if (section) {
      setSection('government');
    }
  }, []);

  const handleSettings = async () => {
    await nativeFn.openAppPermissionSettings();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon} onPress={handleSettings}>
        <Icon source='application-cog' color='#6e26f3' size={30} />
      </TouchableOpacity>
      <FlatList
        data={[]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={null}
        ListFooterComponent={
          <View style={styles.wrapper}>
            <MyBanner />
            <UpdateApp />
            <View style={styles.service}>
              <ScrollView
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                overScrollMode='never'>
                <ServiceItem
                  setSection={() => navigate(SCREENS.DiscussionsListScreen)}
                  nameService='Обсуждения'
                  imgSrc='discuss'
                  id={1}
                />
                <ServiceItem
                  setSection={setSection}
                  nameService='Cлужбы'
                  imgSrc='government'
                  id={2}
                />
                <ServiceItem
                  setSection={setSection}
                  nameService='Документы'
                  imgSrc='document'
                  id={3}
                />
                <ServiceItem
                  setSection={setSection}
                  nameService='Обращение'
                  imgSrc='mail'
                  id={4}
                />
              </ScrollView>
            </View>

            <FlatList data={[]} renderItem={undefined} />
            {section === 'government' && (
              <>
                <Text variant='titleLarge'>Городские службы</Text>
                <CityServices />
              </>
            )}
            {section === 'document' && (
              <>
                <Text variant='titleLarge'>Документы</Text>
                <Documents />
              </>
            )}
            {section === 'mail' && (
              <>
                <Text variant='titleLarge'>Создать обращение</Text>
                <SendMessage />
              </>
            )}
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfb',
  },
  wrapper: {
    justifyContent: 'space-between',
    padding: dp(13),
  },
  service: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: dp(15),
  },
  icon: {position: 'absolute', right: dp(20), bottom: dp(50), zIndex: 10},
});

export default withModal(MainScreen);
