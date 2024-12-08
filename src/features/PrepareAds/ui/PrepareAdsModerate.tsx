import React, {memo} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {
  useAddServiceAdsMutation,
  useDeletePrepareAdsMutation,
  useGetPrepareAdsQuery,
  useGetServiceCategoryQuery,
} from '../../../shared/models/services';
import {GetPrepareAds} from '../../../shared/models/types';
import RenderAdsService from '../../../entities/PrepareAds/ui/RenderAdsService';

const PrepareAdsModerate = () => {
  const [addService] = useAddServiceAdsMutation();
  const [deletePrepareAds] = useDeletePrepareAdsMutation();
  const {data: categoryList} = useGetServiceCategoryQuery();
  const {data, refetch, isLoading} = useGetPrepareAdsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const renderService = ({item}: {item: GetPrepareAds[0]}) => (
    <RenderAdsService
      itemAds={item}
      deletePrepareAds={(id: string) => deletePrepareAds(id)}
      service={categoryList}
      addService={addService}
    />
  );

  return (
    <FlatList
      onRefresh={refetch}
      refreshing={isLoading}
      data={data}
      keyExtractor={item => item.id + 'prepare'}
      renderItem={renderService}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default memo(PrepareAdsModerate);
