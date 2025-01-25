import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../../../app/store';

const selectRootCounter = (state: RootState) => state.counter;

export const selectModalText = createSelector(
  selectRootCounter,
  state => state.actionState.modalText,
);

export const selectModalError = createSelector(
  selectRootCounter,
  state => state.actionState.error,
);
