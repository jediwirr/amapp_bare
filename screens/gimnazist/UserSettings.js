import React from 'react';
import { Text, View, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './Home';

const UserSettings = (props) => {
    const dispatch = useDispatch();
    const userid = useSelector(state => state.gym.userid);
    const signOut = () => dispatch({type: 'SIGN_OUT'});
    const loadFavs = (payload) => dispatch({type: 'LOAD_FAVORITES_LIST', payload});

    const data = useSelector(state => state.gym.data);
    const fav_as = data.filter(item => item.likes.includes(userid));

    return(
        <View style={styles.cardStyle}>
            <View style={styles.listStyle}>
                <Icon 
                    name='heart' 
                    size={30}
                    color="#711E63"
                />
                <Text style={{fontSize: 18}}
                    onPress={() => {
                        if (fav_as.length === 0) {
                            Alert.alert('Вы пока не отмечали понравившиеся материалы')
                        } else {
                            loadFavs(userid);
                            props.navigation.navigate("МАТЕРИАЛЫ");
                        }
                    }} 
                >Понравившиеся материалы</Text>
            </View>
            <View style={styles.listStyle}>
                <Icon 
                    name='exit' 
                    size={30}
                    color="#711E63"
                /> 
                <Text style={{fontSize: 18}}
                    onPress={() => signOut()}
                >Выйти</Text>
            </View>
        </View>
    );
};

export default UserSettings;