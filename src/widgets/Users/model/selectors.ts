import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../../app/store';

const selectRootCounter = (state: RootState) => state.counter;

export const selectAllUsers = createSelector(
  selectRootCounter,
  state => state.allUsers,
);
