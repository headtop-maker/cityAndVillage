import * as React from 'react';
import {View, FlatList} from 'react-native';

import {servicesMock} from '../../shared/mocks';
import ServiceItem from '../../entities/ProfessionalServices/ServiceItem';

const ProfService = () => {
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
          />
        )}
        keyExtractor={(id, index) => id + 'service' + index}
      />
    </View>
  );
};

export default ProfService;
