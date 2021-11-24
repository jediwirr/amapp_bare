import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, FlatList, Linking } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

import { styles, theme, theme_text } from '../components/Style';

const AdsScreen = () => {
    const user = useSelector(state => state.auth.user);
    const userData = useSelector(state => state.auth.userData);

    const [week, setWeek] = useState(0);
    const [ads, setAds] = useState({});

    const handleLink = (url) => {
        Linking.openURL(url);
    };

    useEffect(() => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_ad.php?clue=${userData.clue}&user_id=${userData.user_id}&student_id=${user.student_id}&week=${week}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                setAds(response)
                console.log(response)
            })
            .catch(error => console.log(error));
    }, [week, user]);

    const Item = ({day, ad}) => (
        <View style={{padding: 10}}>
            <Text style={
                {
                    fontSize: 18,
                    fontWeight: 'bold',
                    backgroundColor: '#DCDCDC',
                    padding: 5
                }
            }>
                {day}
            </Text>
            {ad.map(item =>
                <View key={item.ad_text}>
                    <Text>{item.ad_text}</Text>
                    <Text onPress={() => handleLink(item.url)}>{item.url ? 'Скачать' : ''}</Text>
                    <Text style={{fontStyle: 'italic', color: 'gray', borderBottomColor: 'gray', borderBottomWidth: 1}}>{item.name}, созд. {item.date_create}</Text>
                </View>
            )}
        </View>
    );

    const renderItem = ({item}) => (
        <Item
            day={
                item.dayOfWeek === 'Пн'
                ? 'Понедельник'
                : item.dayOfWeek === 'Вт'
                ? 'Вторник'
                : item.dayOfWeek === 'Ср'
                ? 'Среда'
                : item.dayOfWeek === 'Чт'
                ? 'Четверг'
                : item.dayOfWeek === 'Пт'
                ? 'Пятница'
                : item.dayOfWeek === 'Сб'
                ? 'Суббота'
                : item.dayOfWeek
            }
            ad={item.ad}
        />
    );

    return (
        <View>
            <ScrollView style={theme.light} contentContainerStyle={styles.adsScreen}>
                <Button
                    onPress={() => setWeek(week + 1)}
                >
                    <Icon
                        name='chevron-back-outline'
                        size={25}
                        color='#000'
                    />
                </Button>
                <Text style={{ ...theme_text.light, fontSize: 20 }}>{ads.stringData}</Text>
                <Button
                    onPress={() => setWeek(week - 1)}
                >
                    <Icon
                        name='chevron-forward-outline'
                        size={25}
                        color='#000'
                    />
                </Button>
            </ScrollView>

            <FlatList
                data={ads.ads}
                renderItem={renderItem}
                keyExtractor={item => item.dayLesson + item.monthLesson}
            />

        </View>
    )
}

export default AdsScreen;