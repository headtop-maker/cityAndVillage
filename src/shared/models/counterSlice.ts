import {createSlice} from '@reduxjs/toolkit';
import type {Action, AnyAction, PayloadAction} from '@reduxjs/toolkit';
import {
  crateNews,
  getImageForNews,
  getNews,
} from '../../entities/News/models/models';
import {getImportant} from '../../entities/Important/models/models';
import {CounterState} from './types';
import {createUsers} from '../../features/Registration/models/models';
import {loginUsers} from '../../features/Login/model/models';
import {
  getAllUsers,
  setBannedUser,
  setImportantMessage,
} from '../../features/Users/model/models';

interface RejectedAction extends Action {
  error: Error;
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('rejected');
}

function isPendingAction(action: AnyAction) {
  return action.type.endsWith('pending');
}

function isFulfilledAction(action: AnyAction) {
  return action.type.endsWith('fulfilled');
}

const initialState: CounterState = {
  value: 0,
  news: [],
  important: [],
  imageForNewsFromServer: [],
  actionState: {
    loadind: false,
    error: undefined,
    modalText: '',
    showIndicator: true,
  },
  allUsers: undefined,
  currentNewsId: '',
  currentUser: undefined,
  banner: {
    icon: '',
    text: '',
    visible: false,
  },
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    resetModalText: state => {
      state.actionState.modalText = '';
    },
    resetCurrentUser: state => {
      state.currentUser = undefined;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    setCurrentNewsId: (state, action: PayloadAction<string>) => {
      state.currentNewsId = action.payload;
    },
    setErrorText: (state, action: PayloadAction<string>) => {
      state.actionState.modalText = action.payload;
    },
    setBanner: (state, action: PayloadAction<CounterState['banner']>) => {
      state.banner = action.payload;
    },
  },
  extraReducers: builder => {
    builder

      .addCase(getNews.fulfilled, (state, action) => {
        state.news = action.payload;
      })
      .addCase(getImportant.fulfilled, (state, action) => {
        state.important = action.payload;
      })
      .addCase(crateNews.fulfilled, (state, action) => {
        state.important = action.payload;
      })
      .addCase(getImageForNews.fulfilled, (state, action) => {
        state.imageForNewsFromServer = action.payload;
      })
      .addCase(createUsers.fulfilled, (state, action) => {
        state.actionState.error = undefined;
        state.actionState.modalText = action.payload;
      })

      .addCase(loginUsers.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })

      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
      })

      .addCase(setImportantMessage.fulfilled, state => {
        state.actionState.loadind = false;
        state.actionState.modalText = '';
      })

      .addCase(setBannedUser.fulfilled, (state, action) => {
        const payload = action.payload;
        state.actionState.loadind = false;
        state.actionState.modalText = '';
        state.allUsers = state.allUsers?.map(current => {
          if (current.id === payload.id) {
            return {
              id: payload.id,
              name: payload.name,
              email: payload.email,
              banned: payload.banned,
              userRole: payload.userRole,
            };
          }
          return current;
        });
      })
      .addMatcher(isPendingAction, state => {
        state.actionState.loadind = true;
        state.actionState.error = undefined;
        state.actionState.modalText = 'Информация обновляется';
      })
      .addMatcher(isFulfilledAction, state => {
        state.actionState.loadind = false;
        state.actionState.modalText = '';
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.actionState.loadind = false;
        state.actionState.modalText = 'Ошибка получения данных';
        state.actionState.error = action.error.message;
      });
  },
});

export const {
  resetModalText,
  incrementByAmount,
  setCurrentNewsId,
  resetCurrentUser,
  setErrorText,
  setBanner,
} = counterSlice.actions;

export default counterSlice.reducer;
