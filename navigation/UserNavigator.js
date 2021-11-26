import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';

import { MainNavigator } from './MainNavigator';
import AdsScreen from '../screens/Ads';
import SettingsScreen from '../screens/Settings';
import AccountScreen from '../screens/Account';
import LogOutScreen from '../screens/LogOut';
import AuthScreen from '../screens/AuthScreen';
import ActsScreen from "../screens/Acts";
import { ip } from '../screens/gimnazist/RegForm';

import { HomeToDetailsNav } from './Navs';

const Stack = createNativeStackNavigator();

export const UserNavigator = () => {
    const isSignedIn = useSelector(state => state.auth.isSignedIn);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const loadData = (payload) => dispatch({type: 'LOAD_DATA', payload});

    const _sendToken = async (token) => {
        const data = {
            'push_token': token,
            'owner': ''
        }
    
        await fetch(`http://${ip}/tokens/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(error => console.log(error))
    };

    const _handleNotifiaction = (message) => {
        console.log(message);

        fetch(`http://${ip}/articles/`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(response =>
            loadData(response)
        )
        .then(() => {
            navigation.navigate('Гимназист', {
                screen: message.data.screen,
                params: { title: message.notification.title },
            });
        })
        .catch(error => console.log(error));
    };

    useEffect(() => {
        messaging().getToken().then(token => {
            console.log(token);
            _sendToken(token);
        });
    }, []);

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
          Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });
    
        return unsubscribe;
      }, []);

    useEffect(() => {
        messaging().onNotificationOpenedApp(remoteMessage => {
           _handleNotifiaction(remoteMessage);
        });

        messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                _handleNotifiaction(remoteMessage);
            }
        });
    }, []);
    
    const Nav = () => (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#002e2f',
            },
            headerTintColor: '#fff',
            headerShown: false
        }}>
            <Stack.Group screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name='Меню'
                    component={MainNavigator}
                />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen
                    name='Объявления'
                    component={AdsScreen}
                    options={{
                        headerShown: true
                    }}
                />
                <Stack.Screen
                    name='Акты'
                    component={ActsScreen}
                    options={{
                        headerShown: true
                    }}
                />
                <Stack.Screen
                    name='Настройки'
                    component={SettingsScreen}
                />
                <Stack.Screen
                    name='Профиль'
                    component={AccountScreen}
                    options={{
                        headerShown: true
                    }}
                />
                <Stack.Screen
                    name='Выход'
                    component={LogOutScreen}
                />
                <Stack.Screen
                    name='Гимназист'
                    component={HomeToDetailsNav}
                />
            </Stack.Group>
        </Stack.Navigator>
    );

    const NonAuthorized = () => (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='Авторизация'
                component={AuthScreen}
            />
            <Stack.Screen
                name='Гимназист'
                component={HomeToDetailsNav}
            />
        </Stack.Navigator>
    );

    return (
        isSignedIn ? (
            <Nav />
        ) : (
            <NonAuthorized />
        )
    )
}