import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import Animated from 'react-native-reanimated';
import ServiceList from '../../../entities/ProfessionalServices/serviceList/ui/ServiceList';
import {servicesSelectors} from '../../../shared/models/servicesSlice';
import {callOtherFn} from '../../../shared/api/ApiCall';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/models/storeHooks';
import {selectIsLoading} from '../../../shared/models/selectors';
import withModal from '../../../shared/HOC/withModal';
import {getServices} from '../../../entities/ProfessionalServices/serviceList/model/actions';
import ServiceCardItem from '../../../entities/CityService/ui/CityServiceCardItem';

const CityServices = () => {
  const [selected, setSelected] = useState('');
  const isLoading = useAppSelector(selectIsLoading);
  const lists = useAppSelector(servicesSelectors.selectAll);
  const dispatch = useAppDispatch();

  const handleSelected = (data: string) => {
    if (selected === data) {
      setSelected('');
      return;
    }
    setSelected(data);
  };

  const handleOnRefrash = () => {
    const param = callOtherFn.getRequestParams();
    if (!!param) {
      dispatch(getServices(param));
    }
  };

  return (
    <View
      style={{flex: 1, backgroundColor: '#FFFFFF', flexDirection: 'column'}}>
      <SafeAreaView style={{flex: 1}}>
        <Animated.FlatList
          stickyHeaderIndices={[0]}
          ListHeaderComponent={<ServiceList />}
          data={lists}
          renderItem={({item}) => (
            <ServiceCardItem
              item={item}
              selected={selected}
              setSelected={handleSelected}
            />
          )}
          refreshing={isLoading}
          onRefresh={handleOnRefrash}
          keyExtractor={item => item.id + 'list'}
        />
      </SafeAreaView>
    </View>
  );
};

export default withModal(CityServices);
