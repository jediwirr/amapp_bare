import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import MenuScreen from '../screens/Menu';
import MarksScreen from '../screens/Marks';
import { LoadsNavigator } from "./LoadsNavigator";
import { TimetableNavigator } from "./TimetableNavigator";
import { DiaryNavigator } from './DiaryNavigator';

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveBackgroundColor: '#002e2f',
                tabBarInactiveBackgroundColor: '#002e2f',
                tabBarActiveTintColor: '#fff',
                headerTintColor: '#fff'
            }}>
            <Tab.Group>
                <Tab.Screen
                    name="Main"
                    component={MenuScreen}
                    options={{
                        tabBarIcon: () => (
                            <Icon 
                                name='home-outline'
                                color='#fff'
                                size={25}
                            />
                        ),
                        title: 'Меню',
                        headerShown: false
                    }}
                />
                <Tab.Screen
                    name="DiaryNavigator"
                    component={DiaryNavigator}
                    options={{
                        headerShown: false,
                        tabBarIcon: () => (
                            <Icon 
                                name='book-outline'
                                color='#fff'
                                size={25}
                            />
                        ),
                        title: 'Дневник'
                    }}
                />
                <Tab.Screen
                    name="Отметки"
                    component={MarksScreen}
                    options={{
                        tabBarIcon: () => (
                            <Icon 
                                name='create-outline'
                                color='#fff'
                                size={25}
                            />
                        ),
                        title: 'Отметки',
                        headerShown: false
                    }}
                />
                <Tab.Screen
                    name="LoadsNavigator"
                    component={LoadsNavigator}
                    options={{
                        headerShown: false,
                        tabBarIcon: () => (
                            <Icon 
                                name='attach'
                                color='#fff'
                                size={25}
                            />
                        ),
                        title: 'Загрузка'
                    }}
                />
                <Tab.Screen
                    name="TimetableNavigator"
                    component={TimetableNavigator}
                    options={{
                        headerShown: false,
                        tabBarIcon: () => (
                            <Icon 
                                name='calendar-outline'
                                color='#fff'
                                size={25}
                            />
                        ),
                        title: 'Расписание'
                    }}
                />
            </Tab.Group>
        </Tab.Navigator>
    );
};
