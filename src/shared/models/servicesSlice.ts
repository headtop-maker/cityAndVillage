import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

export const serviceAdapter = createEntityAdapter();
export const servicesSelectors = serviceAdapter.getSelectors<RootState>(
  state => state.service,
);

const servicesSlice = createSlice({
  name: 'services',
  initialState: serviceAdapter.getInitialState(),
  reducers: {
    setSevices: serviceAdapter.addMany,
  },
});

export const {setSevices} = servicesSlice.actions;

export default servicesSlice.reducer;
