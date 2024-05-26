import React, {useEffect, useLayoutEffect, useState} from 'react';

import {StyleSheet, View} from 'react-native';

import withModal from '../../../shared/HOC/withModal';
import CityServices from '../../../features/cityServices/ui/CityServices';

import {useGetAllImportantContactsQuery} from '../../../shared/models/services';
import {Text} from 'react-native-paper';
import useDimensions from '../../../shared/HOC/useDimensions';

import UpdateApp from '../../../features/Update/ui/UpdateApp';
import Documents from '../../../features/documents/ui/Documents';
import ServiceItem from '../../../entities/ProfessionalServices/serviceItem/ui/ServiceItem';
import {TServiceItem} from '../../../shared/types';

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
      <View>
        <View style={[styles.wrapper, {padding: rem / 2}]}>
          <UpdateApp />
          <View style={styles.service}>
            <ServiceItem
              setSection={setSection}
              nameService="Cлужбы"
              imgSrc="government"
              id={100}
            />
            <ServiceItem
              setSection={setSection}
              nameService="Документы"
              imgSrc="document"
              id={100}
            />
            <ServiceItem
              setSection={setSection}
              nameService="Обращение"
              imgSrc="mail"
              id={100}
            />
          </View>
          {section === 'government' && (
            <>
              <Text variant="titleLarge">Городские службы</Text>
              <CityServices />
            </>
          )}
          {section === 'document' && (
            <>
              <Text variant="titleLarge">Документы</Text>
              <Documents />
            </>
          )}
          {section === 'mail' && (
            <>
              <Text variant="titleLarge">Создать обращение</Text>
            </>
          )}
        </View>
      </View>
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
