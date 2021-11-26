import React from 'react';
import { Text, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { styles } from '../components/Style';

const AccountScreen = () => {
    const user = useSelector(state => state.auth.user);
    const students = useSelector(state => state.auth.students);
    const userType = useSelector(state => state.auth.userType);

    const dispatch = useDispatch();
    const setUser = (name, surname) => dispatch({type: 'SET_USER', name, surname});

    const Header = () => (
        <Text 
            style={{...styles.account_role, color: '#000'}}
        >
            {
                userType === 1 ? 'Ученик' : 'Родитель'
            }
        </Text>
    );

    const Item = ({name, surname}) => (
        <TouchableOpacity onPress={() => setUser(name, surname)}>
            <Text style={{...styles.account_name, color: user.name === name && user.surname === surname ? 'red' : '#000'}}
            >{name} {surname}</Text>
        </TouchableOpacity>
    );

    const renderItem = ({item}) => {
        return <Item name={item.name} surname={item.surname} />
    };

    return (
        <FlatList
            ListHeaderComponent={Header}
            data={students}
            renderItem={renderItem}
            keyExtractor={item => item.student_id}
        />
    );
};

export default AccountScreen;