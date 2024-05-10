import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

const selectRootCounter = (state: RootState) => state.counter;

export const selectCurrentUser = createSelector(
  selectRootCounter,
  state => state.currentUser,
);

export const selectCurrentUserRole = createSelector(
  selectRootCounter,
  state => state.currentUser?.role,
);

export const selectCurrentUserToken = createSelector(
  selectRootCounter,
  state => state.currentUser?.userToken,
);

export const selectIsLoading = createSelector(
  selectRootCounter,
  state => state.actionState.loadind,
);
