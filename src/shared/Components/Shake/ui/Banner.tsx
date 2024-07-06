import React, {FC, useState} from 'react';
import {Banner, Icon} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../../models/storeHooks';
import {
  selectBannerIcon,
  selectBannerText,
  selectBannerVisible,
} from '../../../models/selectors';
import {setBanner} from '../../../models/counterSlice';

const MyBanner: FC = () => {
  const icon = useAppSelector(selectBannerIcon);
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
