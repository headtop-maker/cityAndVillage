import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

const selectRootCounter = (state: RootState) => state.counter;

export const selectCurrentUser = createSelector(
  selectRootCounter,
  state => state.currentUser,
);

export const selectCurrentUserToken = createSelector(
  selectRootCounter,
  state => state.currentUser?.userToken,
);
