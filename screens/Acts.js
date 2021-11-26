import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, Linking } from 'react-native';
import { useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/Ionicons';

import { styles } from '../components/Style';

const ActsScreen = () => {
    const user = useSelector(state => state.auth.user);
    const userData = useSelector(state => state.auth.userData);
    const [acts, setActs] = useState([]);
    const {height} = Dimensions.get('screen');

    const months = [
        {name: 'Сентябрь', num: '9'},
        {name: 'Октябрь', num: '10'},
        {name: 'Ноябрь', num: '11'},
        {name: 'Декабрь', num: '12'},
        {name: 'Январь', num: '1'},
        {name: 'Февраль', num: '2'},
        {name: 'Март', num: '3'},
        {name: 'Апрель', num: '4'},
        {name: 'Май', num: '5'}
    ];

    const handleLink = (url) => {
        Linking.openURL(url);
    };

    useEffect(() => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_acts.php?clue=${userData.clue}&user_id=${userData.user_id}&student_id=${user.student_id}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => setActs(response.acts))
            .catch(error => console.log(error));
    }, []);

    const openAct = async (month) => {
        handleLink(`https://diary.alma-mater-spb.ru/e-journal/parents/print_user.php?clue=${userData.clue}&month=${month}&student=${user.student_id}`);
        console.log(month);
    };

    const Header = () => (
        <Text
            style={
                {
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginTop: height / 50
                }
            }
        >
            Квитанции на оплату
        </Text>
    );

    const Item = ({monthNum, month, date}) => (
        <TouchableOpacity
            style={{...styles.listItemContainer, flexDirection: 'row', justifyContent: 'space-between'}}
            onPress={() => openAct(monthNum)}
        >
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{month}</Text>
            <View style={{flexDirection: 'row'}}>
                <Icon
                    name='document-outline'
                    size={25}
                />
                <Text>{acts.type === 1 ? `созд. ${date}` : `изм. ${date}`}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderItem = ({item}) => {
        const selectedMonth = months.filter(m => m.num === item.month)

        return (
            <Item
                monthNum={
                    selectedMonth.map(m => 
                        m.num === item.month ? m.num : ''
                    )
                }
                month={
                    months.map(m => 
                        m.num === item.month ? m.name : ''
                    )
                }
                date={item.date}
            />
        )
    };

    return (
        <FlatList
        style={{padding: 10}}
            ListHeaderComponent={Header}
            data={acts}
            renderItem={renderItem}
            keyExtractor={item => item.month + item.date}
        />
    );
};

export default ActsScreen;