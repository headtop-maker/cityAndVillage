import React from 'react';
import {Provider} from 'react-redux';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {PersistGate} from 'redux-persist/integration/react';
import MainStack from './src/shared/Navigation/MainStack';
import {persistor, store} from './src/app/store';
import {ModalProvider} from './src/shared/Components/Modal/ui/ModalProvider';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
  },
};

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <ModalProvider>
            <MainStack />
          </ModalProvider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
