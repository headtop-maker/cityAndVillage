import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../../app/store';

const selectRootCounter = (state: RootState) => state.counter;

export const selectNews = createSelector(
  selectRootCounter,
  state => state.news,
);

export const selectNewsLoading = createSelector(
  selectRootCounter,
  state => state.actionState.loadind,
);
