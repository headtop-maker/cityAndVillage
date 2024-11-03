import React, {useState} from 'react';
import {View, FlatList} from 'react-native';

import {servicesMock} from '../../../shared/mocks';
import ServiceItem from '../../../entities/ProfessionalServices/serviceItem/ui/ServiceItem';

const ProfService = () => {
  const [section, setSection] = useState(''); // исследовать
  return (
    <View>
      <FlatList
        horizontal={true}
        data={servicesMock}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <ServiceItem
            nameService={item.nameService}
            imgSrc={item.imgSrc}
            id={item.id}
            setSection={data => setSection(data)}
          />
        )}
        keyExtractor={(id, index) => id + 'service' + index}
      />
    </View>
  );
};

export default ProfService;
