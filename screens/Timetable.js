import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { styles } from '../components/Style';

const TimetableScreen = ({navigation}) => {
    const user = useSelector(state => state.auth.user);
    const userData = useSelector(state => state.auth.userData);
    const lesson = useSelector(state => state.lesson.lesson);

    const dispatch = useDispatch();
    const changeLesson = (payload) => dispatch({type: 'CHANGE_LESSON', payload});

    const days = ['ПН', 'ВТ', 'СР', 'ЧТ','ПТ', 'СБ'];
    const [day, setDay] = useState(days[0]);
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_schedule.php?clue=${userData.clue}&user_id=${userData.user_id}&student_id=${user.student_id}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                console.log(response.schedule)
                setSchedule(response.schedule)
            })
            .catch(error => console.log(error));
    }, [user, lesson]);

    const Header = () => (
        <View style={styles.period_list_container}>
            {days.map(item =>
                <TouchableOpacity
                    key={item}
                    style={{...styles.period, backgroundColor: day === days[days.indexOf(item)] ? '#9E9E9E' : '#c9c9c9'}}
                    onPress={() => setDay(days[days.indexOf(item)])}
                >
                    <Text
                        key={item}
                        style={{textAlign: 'center'}}
                    >
                        {item}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );

    const Item = ({number, time, subject, item}) => (
        <TouchableOpacity
            style={
                { 
                    ...styles.listItemContainer, 
                    flexDirection: 'column' 
                }
        }
            onPress={() => {
                changeLesson(item);
                navigation.navigate('Редактирование');
            }}
        >
            <View style={{flexDirection: 'row'}}>
                <Text 
                    style={
                        {
                            color: '#000',
                            fontSize: 15,
                            fontWeight: 'bold',
                            paddingHorizontal: 15,
                            paddingBottom: 15
                        }
                    }
                >
                    {number}.
                </Text>
                <Text style={{fontSize: 15, fontStyle: 'italic'}}>
                    {time}
                </Text>
            </View>
            <Text 
                style={
                    {
                        paddingHorizontal: 15,
                        fontSize: 15
                    }
                }
            >
                {subject}
            </Text>
        </TouchableOpacity>
    );

    const renderItem = ({item}) => {
        if (item.week_day === (days.indexOf(day) + 1).toString()) {
            return (
                <Item
                    number={item.number_lesson}
                    time={
                        item.number_lesson === '0'
                        ? '8:45 - 9:25'
                        : item.number_lesson === '1'
                        ? '9:30 - 10:10'
                        : item.number_lesson === '2'
                        ? '10:25 - 11:05'
                        : item.number_lesson === '3'
                        ? '11:25 - 12:05'
                        : item.number_lesson === '4'
                        ? '12:20 - 13:00'
                        : item.number_lesson === '5'
                        ? '13:20 - 14:00'
                        : item.number_lesson === '6'
                        ? '14:15 - 14:55'
                        : item.number_lesson === '7'
                        ? '15:10 - 15:50'
                        : item.number_lesson === '8'
                        ? '15:55 - 16:35'
                        : item.number_lesson === '9'
                        ? '16:40 - 17:20'
                        : item.number_lesson === '10'
                        ? '17:25 - 18:05'
                        : ''
                    }
                    subject={item.subject}
                    item={item}
                />
            );
        }
    };

    return (
        <SafeAreaView>
            <Header />
            <FlatList
                data={schedule}
                renderItem={renderItem}
                keyExtractor={item => item.number_lesson + item.week_day}
            />
        </SafeAreaView>
    );
};

export default TimetableScreen;