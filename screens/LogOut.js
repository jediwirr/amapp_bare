import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles, theme } from '../components/Style';

const LogOutScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const log_out = () => dispatch({type: 'LOG_OUT'});
    const setDate = (date) => dispatch({type: 'SET_DATE', date});

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('@storage_Key', value);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <ScrollView  style={theme.light} contentContainerStyle={styles.container}>

            <Text
                style={{color: '#000', fontSize: 18}}
            >
                Вы уверены, что хотите выйти из профиля?
            </Text>

            <View style={styles.modalPanel}>
                <Button 
                    mode={'text'}
                    color='blue'
                    onPress={
                        storeData(''),
                        // setDate(new Date(Date()).getDate()),
                        log_out
                    }
                >
                    ДА
                </Button>

                <Button 
                    mode={'text'}
                    color='red'
                    onPress={
                        () => navigation.navigate('Меню')
                    }
                >
                    НЕТ
                </Button>
            </View>

        </ScrollView>
    );
};

export default LogOutScreen;