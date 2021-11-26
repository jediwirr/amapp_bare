/**
 * by anton pastukhov
 * andm1793@gmail.com
 */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/Store';
import { NavigationContainer } from '@react-navigation/native';
import { UserNavigator } from './navigation/UserNavigator';

const App = () => {
  const config = {
    screens: {
      Гимназист: 'gym'
    }
  }

  const linking = {
    prefixes: ['https://amapp.com', 'amapp://'],
    config
  }

  return(
    <Provider store={store}>
      <NavigationContainer linking={linking}>
        <UserNavigator />
      </NavigationContainer>
    </Provider>
  )
}

export default App;
