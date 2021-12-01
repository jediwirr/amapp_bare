import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'

const ip = 'gimnazist.herokuapp.com/api'
// gimnazist.herokuapp.com/api
// 192.168.0.217:80/api
// 192.168.0.88
// 192.168.61.249
// 192.168.0.115

async function PostData(url='', data={}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    });
    return response.json();
}

function RegForm(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')


    return (
        <View style={styles.inputStyle}>
            <TextInput
                label = 'Введите логин'
                mode = 'outlined'
                value = {username}
                onChangeText = {text => setUsername(text)}
            /> 
            <TextInput
                autoCapitalize = 'none'
                keyboardType = 'email-address'
                label = 'Введите e-mail'
                mode = 'outlined'
                value = {email}
                onChangeText = {text => setEmail(text)}
            /> 
            <TextInput
                secureTextEntry
                autoCapitalize = 'none'
                label = 'Введите пароль'
                mode = 'outlined'
                value = {password}
                onChangeText = {text => setPassword(text)}
            /> 
            <Button style={{marginTop: 15}}
                mode = 'outlined'
                onPress = {() => PostData(`https://${ip}/users/`, 
                    {
                        'username': `${username}`, 
                        'password': `${password}`,
                        'email': `${email}`
                    })
                    .then(data => {
                        PostData(`https://${ip}/emails/`, 
                        {
                            'email': `${data.email}`,
                            'subject': 'Вы зарегистрировались', 
                            'message': `Ваш логин: ${data.username}, ваш пароль: ${data.password}`
                        })
                        console.log(data.id)
                        props.navigation.navigate("Form")
                    })
                }
            >Зарегистрироваться</Button>
        </View>
    )
}

const styles = StyleSheet.create ({
    inputStyle: {
        padding: 10,
        marginTop: 30
    }
})

export { ip }
export { styles }
export { PostData }
export default RegForm
