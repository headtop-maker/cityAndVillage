import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {
  crateNews,
  getImageForNews,
  getNews,
} from '../../entities/News/models/models';
import {getImportant} from '../../entities/Important/models/models';
import {CounterState} from './types';

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
      .addCase(getNews.rejected, (state, action) => {
        state.actionState.loadind = false;
        state.actionState.modalText = 'Ошибка получения данных';
        state.actionState.error = action.error.message;
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
      .addCase(getImportant.rejected, (state, action) => {
        state.actionState.loadind = false;
        state.actionState.modalText = 'Ошибка получения данных';
        state.actionState.error = action.error.message;
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
      .addCase(crateNews.rejected, (state, action) => {
        state.actionState.loadind = false;
        state.actionState.modalText = 'Ошибка обновления данных';
        state.actionState.error = action.error.message;
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
      .addCase(getImageForNews.rejected, (state, action) => {
        state.actionState.loadind = false;
        state.actionState.modalText = 'Ошибка получения данных';
        state.actionState.error = action.error.message;
      });
  },
});

export const {resetModalText, incrementByAmount, setCurrentNewsId} =
  counterSlice.actions;

export default counterSlice.reducer;
