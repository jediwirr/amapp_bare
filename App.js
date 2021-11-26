/**
 * by anton pastukhov
 * andm1793@gmail.com
 */

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store/Store';
import { NavigationContainer } from '@react-navigation/native';
import { UserNavigator } from './navigation/UserNavigator';
import SplashScreen from 'react-native-splash-screen'

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

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
        <StatusBar 
          style={Platform.OS === 'android' ? 'light' : 'dark'} 
          backgroundColor='#002e2f' 
        />
        <UserNavigator />
      </NavigationContainer>
    </Provider>
  )
}

export default App;
