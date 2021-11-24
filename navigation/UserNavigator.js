import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import { MainNavigator } from './MainNavigator';
import AdsScreen from '../screens/Ads';
import SettingsScreen from '../screens/Settings';
import AccountScreen from '../screens/Account';
import LogOutScreen from '../screens/LogOut';
import AuthScreen from '../screens/AuthScreen';
import ActsScreen from "../screens/Acts";

// import { HomeToDetailsNav } from './Navs';

const Stack = createNativeStackNavigator();

export const UserNavigator = () => {
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
    
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
                {/* <Stack.Screen
                    name='Гимназист'
                    component={HomeToDetailsNav}
                /> */}
            </Stack.Group>
        </Stack.Navigator>
    );

    const NonAuthorized = () => (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='Авторизация'
                component={AuthScreen}
            />
            {/* <Stack.Screen
                name='Гимназист'
                component={HomeToDetailsNav}
            /> */}
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