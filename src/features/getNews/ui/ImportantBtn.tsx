import * as React from 'react';

import {useAppDispatch} from '../../../shared/models/storeHooks';
import {resetCurrentUser} from '../../../shared/models/counterSlice';
import {Button} from 'react-native-paper';

const ImportantBtn = () => {
  const dispatch = useAppDispatch();

  return (
    <Button
      icon='logout'
      mode='text'
      onPress={() => dispatch(resetCurrentUser())}>
      Выйти
    </Button>
  );
};

export default ImportantBtn;
