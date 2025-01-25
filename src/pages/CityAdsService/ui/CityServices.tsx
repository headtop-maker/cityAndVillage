import React, {useState} from 'react';
import {
  Linking,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import ServiceList from '../../../entities/CityAdsService/serviceList/ui/ServiceList';
import {servicesSelectors} from '../../../shared/models/servicesSlice';
import {callOtherFn} from '../../../shared/api/ApiCall';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/models/storeHooks';
import {
  selectCurrentUserRole,
  selectCurrentUserToken,
  selectIsLoading,
} from '../../../shared/models/selectors';
import withModal from '../../../shared/HOC/withModal';
import {getServices} from '../../../entities/CityAdsService/serviceList/model/actions';
import ServiceCardItem from '../../../entities/CityService/ui/CityServiceCardItem';
import {Button, IconButton, Text, Tooltip} from 'react-native-paper';
import {useModal} from '../../../shared/Components/Modal/ui/ModalProvider';
import {dp} from '../../../shared/lib/getDP';
import {navigate} from '../../../shared/lib/navigationRef';
import SCREENS from '../../../shared/Navigation/screens';
import {userRole} from '../../../shared/models/types';
import {useDeleteServiceAdsMutation} from '../../../shared/models/services';

const CityServices = () => {
  const [deleteServiceAds] = useDeleteServiceAdsMutation();
  const [selected, setSelected] = useState('');
  const isLoading = useAppSelector(selectIsLoading);
  const lists = useAppSelector(servicesSelectors.selectAll);
  const role = useAppSelector(selectCurrentUserRole);
  const currentUserToken = useAppSelector(selectCurrentUserToken);
  const isAdmin = role === userRole.admin;

  const {showModal, hideModal} = useModal();
  const dispatch = useAppDispatch();

  const handleNavigate = () => {
    navigate(SCREENS.PrepareServiceScreen);
    hideModal();
  };

  const handleShowModal = () => {
    showModal(
      <View style={{padding: dp(10)}}>
        <Text>Напишите нам </Text>
        {!currentUserToken && (
          <Text style={{color: '#ff0202'}}>Пользователь не авторизован !</Text>
        )}
        <View style={styles.contact}>
          <Tooltip title='Selected email'>
            <IconButton
              icon='lead-pencil'
              selected
              size={20}
              onPress={() => !!currentUserToken && handleNavigate()}
              disabled={!currentUserToken}
            />
          </Tooltip>
          <TouchableOpacity
            onPress={() => !!currentUserToken && handleNavigate()}
            disabled={!currentUserToken}>
            <Text variant='titleMedium'>{'Заполнить форму'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contact}>
          <Tooltip title='Selected email'>
            <IconButton
              icon='email'
              selected
              size={20}
              onPress={() => Linking.openURL(`mailto:cityandvillage@yandex.ru`)}
            />
          </Tooltip>
          <TouchableOpacity
            onPress={() => Linking.openURL(`mailto:cityandvillage@yandex.ru`)}>
            <Text variant='titleMedium'>{'cityandvillage@yandex.ru'}</Text>
          </TouchableOpacity>
        </View>
      </View>,
    );
  };

  const handleSelected = (data: string) => {
    if (selected === data) {
      setSelected('');
      return;
    }
    setSelected(data);
  };

  const handleOnRefrash = () => {
    const param = callOtherFn.getRequestParams();
    if (param) {
      dispatch(getServices(param));
    }
  };

  const handleDelete = async (id: string) => {
    await deleteServiceAds(id);
    await handleOnRefrash();
  };

  return (
    <View style={styles.container}>
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
              isAdmin={isAdmin}
              deleteItem={handleDelete}
            />
          )}
          refreshing={isLoading}
          onRefresh={handleOnRefrash}
          keyExtractor={item => item.id + 'list'}
        />
      </SafeAreaView>
      <Button mode='text' onPress={handleShowModal}>
        {'Хотите разметить свое объявление?'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
  },
  contact: {flexDirection: 'row', alignItems: 'center'},
});

export default withModal(CityServices);
