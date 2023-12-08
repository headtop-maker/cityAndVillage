import {createSlice} from '@reduxjs/toolkit';
import type {Action, AnyAction, PayloadAction} from '@reduxjs/toolkit';
import {
  crateNews,
  getImageForNews,
  getNews,
} from '../../entities/News/models/models';
import {getImportant} from '../../entities/Important/models/models';
import {CounterState} from './types';
import {createUsers} from '../../widgets/Registration/models/models';
import {loginUsers} from '../../widgets/Login/model/models';
import {
  getAllUsers,
  setImportantMessage,
} from '../../widgets/Users/model/models';

interface RejectedAction extends Action {
  error: Error;
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('rejected');
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
  },
  extraReducers: builder => {
    builder
      .addCase(getNews.pending, state => {
        state.actionState.loadind = true;
        state.actionState.error = undefined;
        state.actionState.modalText = 'Информация обновляется';
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.actionState.loadind = false;
        state.actionState.modalText = '';
        state.news = action.payload;
      })

      .addCase(getImportant.pending, state => {
        state.actionState.loadind = true;
        state.actionState.error = undefined;
        state.actionState.modalText = 'Информация обновляется';
      })
      .addCase(getImportant.fulfilled, (state, action) => {
        state.actionState.loadind = false;
        state.actionState.modalText = '';
        state.important = action.payload;
      })

      .addCase(crateNews.pending, state => {
        state.actionState.loadind = true;
        state.actionState.error = undefined;
        state.actionState.modalText = 'Информация обновляется';
      })
      .addCase(crateNews.fulfilled, (state, action) => {
        state.actionState.loadind = false;
        state.actionState.modalText = '';
        state.important = action.payload;
      })

      .addCase(getImageForNews.pending, state => {
        state.actionState.loadind = true;
        state.actionState.error = undefined;
        state.actionState.modalText = 'Информация обновляется';
      })
      .addCase(getImageForNews.fulfilled, (state, action) => {
        state.actionState.loadind = false;
        state.actionState.modalText = '';
        state.imageForNewsFromServer = action.payload;
      })

      .addCase(createUsers.pending, state => {
        state.actionState.loadind = true;
        state.actionState.error = undefined;
        state.actionState.modalText = 'Информация обновляется';
      })
      .addCase(createUsers.fulfilled, (state, action) => {
        state.actionState.loadind = false;
        state.actionState.modalText = '';
        state.currentUser = action.payload;
      })
      .addCase(loginUsers.pending, state => {
        state.actionState.loadind = true;
        state.actionState.error = undefined;
        state.actionState.modalText = 'Информация обновляется';
      })
      .addCase(loginUsers.fulfilled, (state, action) => {
        state.actionState.loadind = false;
        state.actionState.modalText = '';
        state.currentUser = action.payload;
      })
      .addCase(getAllUsers.pending, state => {
        state.actionState.loadind = true;
        state.actionState.error = undefined;
        state.actionState.modalText = 'Информация обновляется';
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.actionState.loadind = false;
        state.actionState.modalText = '';
        state.allUsers = action.payload;
      })
      .addCase(setImportantMessage.pending, state => {
        state.actionState.loadind = true;
        state.actionState.error = undefined;
        state.actionState.modalText = 'Обращение отправляется';
      })
      .addCase(setImportantMessage.fulfilled, state => {
        state.actionState.loadind = false;
        state.actionState.error = undefined;
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
} = counterSlice.actions;

export default counterSlice.reducer;
