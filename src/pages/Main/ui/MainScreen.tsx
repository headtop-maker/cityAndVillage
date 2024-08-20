import React, {useLayoutEffect, useState} from 'react';

import {StyleSheet, View, FlatList} from 'react-native';

import withModal from '../../../shared/HOC/withModal';
import CityServices from '../../../features/cityServices/ui/CityServices';

import {Text} from 'react-native-paper';
import useDimensions from '../../../shared/HOC/useDimensions';

import UpdateApp from '../../../features/Update/ui/UpdateApp';
import Documents from '../../../features/documents/ui/Documents';
import ServiceItem from '../../../entities/ProfessionalServices/serviceItem/ui/ServiceItem';
import {TServiceItem} from '../../../shared/types';
import SendMessage from '../../../features/SendMessage/ui/SendMessage';
import MyBanner from '../../../shared/Components/Shake/ui/Banner';
import FlightTicket from '../../../features/CustomRender/ui/FlightTicket';

const MainScreen = () => {
  const [section, setSection] = useState<TServiceItem['imgSrc']>('government');

  const {rem} = useDimensions();

  useLayoutEffect(() => {
    if (!!section) {
      setSection('government');
    }
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={[]}
        renderItem={null}
        ListFooterComponent={
          <View style={[styles.wrapper, {padding: rem / 2}]}>
            <MyBanner />
            <UpdateApp />

            <View style={styles.service}>
              <ServiceItem
                setSection={setSection}
                nameService='Cлужбы'
                imgSrc='government'
                id={100}
              />
              <ServiceItem
                setSection={setSection}
                nameService='Документы'
                imgSrc='document'
                id={100}
              />
              <ServiceItem
                setSection={setSection}
                nameService='Обращение'
                imgSrc='mail'
                id={100}
              />
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
  },
  service: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
});

export default withModal(MainScreen);
