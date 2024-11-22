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

export const selectFireBaseTokenAdded = createSelector(
  selectRootCounter,
  state => state.fireBaseTokenAdded,
);

export const selectBannerIcon = createSelector(
  selectRootCounter,
  state => state.banner.icon,
);

export const selectBannerText = createSelector(
  selectRootCounter,
  state => state.banner.text,
);

export const selectBannerVisible = createSelector(
  selectRootCounter,
  state => state.banner.visible,
);

export const selectIsNewVersion = createSelector(
  selectRootCounter,
  state => state.isNewVersion,
);

export const selectAppInFiles = createSelector(
  selectRootCounter,
  state => state.appInFiles,
);

export const selectCurrentAppVersion = createSelector(
  selectRootCounter,
  state => state.currentAppVersion,
);

export const selectCheckLegacy = createSelector(
  selectRootCounter,
  state => state.checkLegacy,
);
