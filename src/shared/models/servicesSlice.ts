import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {getServices} from '../../entities/ProfessionalServices/serviceList/model/actions';

export const serviceAdapter = createEntityAdapter();
export const servicesSelectors = serviceAdapter.getSelectors<RootState>(
  state => state.service,
);

const servicesSlice = createSlice({
  name: 'services',
  initialState: serviceAdapter.getInitialState(),
  reducers: {
    setSevices: serviceAdapter.addMany,
    serviceReceived(state, action) {
      serviceAdapter.setAll(state, action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(getServices.fulfilled, (state, action) => {
      serviceAdapter.setAll(state, action.payload);
    });
  },
});

export const {setSevices, serviceReceived} = servicesSlice.actions;

export default servicesSlice.reducer;
