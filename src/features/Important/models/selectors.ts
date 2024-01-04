import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../../app/store';

const selectRootCounter = (state: RootState) => state.counter;

export const selectImportant = createSelector(
  selectRootCounter,
  state => state.important,
);

export const selectImportantLoading = createSelector(
  selectRootCounter,
  state => state.actionState.loadind,
);
