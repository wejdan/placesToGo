/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {store} from './store/store';
import {Provider} from 'react-redux';
import Navigation from './navigation/Navigation';
import {ThemeProvider} from 'styled-components/native';
import {theme} from './theme';
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
