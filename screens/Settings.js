import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {Switch} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';

import {styles, theme} from '../components/Style';

const SettingsScreen = () => {
    const dispatch = useDispatch();
    const change_theme = () => dispatch({type: 'CHANGE_THEME'});
    const darkTheme = useSelector(state => state.theme.darkTheme);

    return (
        <ScrollView
            style={
                    darkTheme
                    ? theme.dark
                    : theme.light
                }
            contentContainerStyle={
                    styles.settingsScreen
            }
        >
            <Text
                style={
                    {
                        fontSize: 21,
                        color: darkTheme ? '#fff' : '#000'
                    }
                }
            >
                Тёмная тема
            </Text>
            <View>
                <Switch 
                    value={darkTheme}
                    onValueChange={change_theme}
                />
            </View>
        </ScrollView>
    );
};

export default SettingsScreen;