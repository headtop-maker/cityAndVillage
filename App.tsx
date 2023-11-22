import React from 'react';

import {Provider} from 'react-redux';

import {PersistGate} from 'redux-persist/integration/react';
import MainStack from './src/shared/Navigation/MainStack';
import {persistor, store} from './src/app/store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainStack />
      </PersistGate>
    </Provider>
  );
}

export default App;
