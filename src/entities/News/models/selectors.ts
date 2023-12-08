import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../../app/store';

const selectRootCounter = (state: RootState) => state.counter;

export const selectimageForNewsFromServer = createSelector(
  selectRootCounter,
  state => state.imageForNewsFromServer,
);

export const selectCurrentUserRole = createSelector(
  selectRootCounter,
  state => state.currentUser?.role,
);

export const selectCurrentUserName = createSelector(
  selectRootCounter,
  state => state.currentUser?.userName,
);

export const selectCurrentUserEmail = createSelector(
  selectRootCounter,
  state => state.currentUser?.userEmail,
);
