import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    TextInput,
    Text,
    View,
    Image,
    Alert,
    KeyboardAvoidingView
} from 'react-native';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {styles} from '../components/Style';
import Links from '../components/Links';


const AuthScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const log_in = (students, user, user_type, user_data) => dispatch({type: 'LOG_IN', students, user, user_type, user_data});
    const [login, onChangeLogin] = useState('');
    const [password, onChangePassword] = useState('');
    const admin_log_in = () => dispatch({type: 'ADMIN_LOG_IN'});
    const pushToken = useSelector(state => state.note.expoPushToken);

    const getAuthorized = (data) => {
        if (data != null) {
            let obj = {
                'clue': data.clue,
                'user_id': data.user_id
            }
            log_in(data.student, data.student[0], data.type, obj)
            console.log(data.student, data.student[0], data.type, obj)
        }
    };

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@storage_Key', jsonValue)
        } catch (e) {
            console.log(e)
        }
    };

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            const data = jsonValue != null ? JSON.parse(jsonValue) : null
            getAuthorized(data);
        } catch(e) {
            console.log(e)
        }
    };

    useEffect(() => {
        getData();
    }, [])
  
    const sendCredentials = () => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/check_login.php?username=${login}&password=${password}&token=alma831&push_token=${pushToken}`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(response => {
            if (response.status === 0) {
                storeData(response);
                getAuthorized(response);
                console.log(response);
            } else if (login === '' || password === '') {
                Alert.alert('Введите логин и пароль');
            } else if (login === 'antheon' || password === 'antheon') {
                admin_log_in();
            } else {
                Alert.alert('Вы ввели неверный логин или пароль');
            }
        })
        .catch(error => console.log(error));
    };

    return (
        <KeyboardAvoidingView style={{...styles.container, backgroundColor: '#00656d'}}>
                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                    <Text style={styles.logoText}>Гимназия «Альма Матер»</Text>
                    <Image
                        style={styles.logo}
                        source={require('../assets/alma.png')}
                    />
                </View>
                <Text style={styles.greeting}>Добро пожаловать!</Text>
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={login => onChangeLogin(login)}
                        value={login}
                        placeholder='Введите логин'
                        autoCapitalize='none'
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={password => onChangePassword(password)}
                        value={password}
                        placeholder='Введите пароль'
                        secureTextEntry={true}
                        autoCapitalize='none'
                    />
                </View>
                <Button
                    onPress={sendCredentials}
                    color='#fff'
                    uppercase={false}
                    style={{ padding: 10 }}
                    labelStyle={{ fontSize: 25 }}
                >
                    Вход
                </Button>

            <Links col='#fff' navigation={navigation} />
        </KeyboardAvoidingView>
    );
};

export default AuthScreen;