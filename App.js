/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/Store';
import { NavigationContainer } from '@react-navigation/native';
import { UserNavigator } from './navigation/UserNavigator';

const App = () => {
  return(
    <Provider store={store}>
      <NavigationContainer>
        <UserNavigator />
      </NavigationContainer>
    </Provider>
  )
}

export default App;
