import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../screens/gimnazist/Home';
import UserSettings from '../screens/gimnazist/UserSettings';
import Categories from '../screens/gimnazist/Categories';
import ArticleDetails from '../screens/gimnazist/ArticleDetails';
import { Button } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const myStyles = {
    title: "Гимназист",
    headerTintColor: "gray"
}

export const HomeToDetailsNav = ({navigation}) => {
    const username = useSelector(state => state.userName);

    return (
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen 
                    name="Home" 
                    component={HomeOrCatNav}
                    options={{
                        ...myStyles,
                        headerLeft: () => (
                            <Icon
                                name='chevron-back' 
                                size={30}
                                color='gray'
                                onPress={() => navigation.goBack()}
                            />
                        )
                    }}
                />
                <Stack.Screen 
                    name="Details" 
                    component={ArticleDetails}
                    options={{...myStyles}}
                />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen 
                    name="UserSettings" 
                    component={UserSettings}
                    options={{
                        ...myStyles,
                        title: username
                    }}
                />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export const HomeOrCatNav = () => {
    return(
        <Tab.Navigator screenOptions={{ 
                headerShown: false,
                tabBarActiveTintColor: 'black',
            }}
        >
            <Tab.Screen 
                name="МАТЕРИАЛЫ" 
                component={Home} 
                options={{
                    tabBarIcon: () => (
                        <Icon
                            name="library"
                            size={25}
                            color='#711E63'
                        />
                    )
                }}
            />
            <Tab.Screen 
                name="РУБРИКИ" 
                component={Categories} 
                options={{
                    tabBarIcon: () => (
                        <Icon
                            name="apps"
                            size={25}
                            color='#711E63'
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}