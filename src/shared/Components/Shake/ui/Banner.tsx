import React, {FC} from 'react';
import {Banner} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../../models/storeHooks';
import {selectBannerText, selectBannerVisible} from '../../../models/selectors';
import {setBanner} from '../../../models/counterSlice';

const MyBanner: FC = () => {
  const text = useAppSelector(selectBannerText);
  const visible = useAppSelector(selectBannerVisible);

  const dispatch = useAppDispatch();

  return (
    <Banner
      visible={visible}
      actions={[
        {
          label: 'Закрыть',
          onPress: () =>
            dispatch(setBanner({icon: '', text: '', visible: false})),
        },
      ]}>
      {text}
    </Banner>
  );
};

export default MyBanner;
