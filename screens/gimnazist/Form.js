import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import { PostData, styles, ip } from './RegForm';
import { useDispatch } from 'react-redux';

let resp;

async function GetData(url='', data={}) {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
          }
    });
    return response.json();
}

function Form(props) {
    const dispatch = useDispatch();
    const signIn = (id, name) => dispatch({type: 'SIGN_IN', id, name});

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

        return (
            <View style={styles.inputStyle}>
                <TextInput
                    label = 'Введите логин'
                    mode = 'outlined'
                    value = {username}
                    onChangeText = {text => setUsername(text)}
                /> 
                <TextInput
                    secureTextEntry
                    autoCapitalize='none'
                    label = 'Введите пароль'
                    mode = 'outlined'
                    value = {password}
                    onChangeText = {text => setPassword(text)}
                /> 
                <Button style={{marginTop: 15}}
                    mode = 'outlined'
                    onPress = {() => PostData(`https://${ip}:80/api/tokens/`, 
                        {
                            'username': `${username}`, 
                            'password': `${password}`
                        })
                        .then(data => {
                            resp = (JSON.stringify(data));
                            resp = resp.replace(/"/g, '');
                            resp = resp.replace(/:/g, ' ');
                            resp = resp.replace(/{/g, '');
                            resp = resp.replace(/}/g, '');
                            })
                        .then(() => {
                            if (username) {
                                GetData(`https://${ip}:80/api/users/profile/${username}`, 
                                {})
                                .then(data => {
                                    signIn(data.id, data.username);
                                })
                            }
                            })
                    }
                >Войти</Button>
                <Button style={{marginTop: 15}}
                    mode = 'outlined'
                    color = 'red'
                    onPress = {() => props.navigation.navigate("RegForm")}
                >Зарегистрироваться</Button>
            </View>
        )
}

export { resp, GetData };
export default Form;
