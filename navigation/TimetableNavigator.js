import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TimetableScreen from "../screens/Timetable";

const Stack = createNativeStackNavigator();
import TimetableDetail from "../screens/TimetableDetail";

export const TimetableNavigator = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                tabBarActiveBackgroundColor: '#002e2f',
                tabBarInactiveBackgroundColor: '#002e2f',
                tabBarActiveTintColor: '#fff',
                headerStyle: {
                    backgroundColor: '#002e2f',
                },
                headerTintColor: '#fff'
            }}
        >
            <Stack.Screen
                name='Расписание'
                component={TimetableScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='Редактирование'
                component={TimetableDetail}
            />
        </Stack.Navigator>
    )
}