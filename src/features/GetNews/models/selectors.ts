import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../../app/store';

const selectRootCounter = (state: RootState) => state.counter;

export const selectCurrentNewsId = createSelector(
  selectRootCounter,
  state => state.currentNewsId,
);
