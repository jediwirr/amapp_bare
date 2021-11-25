import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoadsScreen from '../screens/Loads';
import LoadDetails from "../screens/LoadDetails";
import LoadFile from '../screens/LoadFile';

const Stack = createNativeStackNavigator();

export const LoadsNavigator = () => {

    return (
        <Stack.Navigator screenOptions={{
            tabBarActiveBackgroundColor: '#002e2f',
            tabBarInactiveBackgroundColor: '#002e2f',
            tabBarActiveTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#002e2f',
                
              },
            headerTintColor: '#fff'
        }}>
            <Stack.Screen
                name='Загрузка'
                component={LoadsScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='LoadDetails'
                component={LoadDetails}
            />
            <Stack.Screen
                name='Загрузка файлов'
                component={LoadFile}
            />
        </Stack.Navigator>
    );
};