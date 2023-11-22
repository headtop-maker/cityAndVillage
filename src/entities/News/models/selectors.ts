import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../../app/store';

const selectRootCounter = (state: RootState) => state.counter;

export const selectimageForNewsFromServer = createSelector(
  selectRootCounter,
  state => state.imageForNewsFromServer,
);
