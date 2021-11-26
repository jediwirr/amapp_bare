import React, {useEffect} from 'react';
import {Text, View, ScrollView, Pressable, TouchableOpacity, SafeAreaView, Linking} from 'react-native';
import { Button } from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { styles, theme, theme_text } from '../components/Style';
import { days, months } from "../components/Date";
// import Calendar from "./Calendar";

const DiaryScreen = ({navigation}) => {
    const lessons = useSelector(state => state.lesson.lessons)
    const full_date = new Date(Date());
    const year = useSelector(state => state.date.year);
    const month = useSelector(state => state.date.month);
    const day = full_date.getDay();

    const dispatch = useDispatch();
    const setLessons = (payload) => dispatch({type: 'SET_LESSONS', payload});
    const setDate = (date) => dispatch({type: 'SET_DATE', date});
    const set_m = (month_num, month) => dispatch({type: 'SET_MONTH', month_num,  month});
    const set_d = (day) => dispatch({type: 'SET_DAY', day});
    // const toggleCalendar = () => dispatch({type: 'TOGGLE_CALENDAR'});
    const toggleLessonInfo = (lesson) => dispatch({type: 'TOGGLE_LESSON_INFO', lesson});

    const d = useSelector(state => state.date.stringDay);
    const m = useSelector(state => state.date.stringMonth);
    const date = useSelector(state => state.date.stringDate);
    // const isCalendar = useSelector(state => state.calendar.openCalendar);

    const userData = useSelector(state => state.auth.userData);
    const user = useSelector(state => state.auth.user);

    const get_month = () => {
        for (let i=0; i<12; i++) {
            if (month === i) {
                set_m(month, months[i]);
            }
        }

        return m;
    };

    const get_day = () => {
        for (let i=0; i<7; i++) {
            if (day === i) {
                set_d(days[i]);
            }
        }

        return d;
    };

    const date_lesson = `${year}-${month < 10 ? '0' + (month + 1).toString() : month + 1}-${date < 10 ? '0' + date.toString() : date}`;

    useEffect(() => {
        setDate(new Date(Date()).getDate());
        get_day();
        get_month();
    }, []);

    useEffect(() => {
        setLessons([]);

        const fetchData = async (url) => {
            await fetch(url, {
                method: 'GET'
            })
            .then(response => response.json())
            .then(response => {
                setLessons(response.lessons)
            })
            .catch(error => console.log(error));
        };

        fetchData(`https://diary.alma-mater-spb.ru/e-journal/api/open_diary.php?clue=${userData.clue}&user_id=${userData.user_id}&student_id=${user.student_id}&date_lesson=${date_lesson}`);

    }, [date, user]);

    const getNextMonth = () => {
        let i=months.indexOf(m);
        setDate(1);
        m === months[11] ? set_m(0, months[0]) : set_m(month + 1, months[i + 1]);
    };

    const getPrevMonth = () => {
        let i=months.indexOf(m);

        if (
            m === months[4]
            || m === months[6]
            || m === months[9]
            || m === months[11]
        ) {
            setDate(30);
        } else if (m === months[2]) {
            setDate(year % 4 === 0 ? 29 : 28);
        } else {
            setDate(31);
        }

        m === months[0] ? set_m(11, months[11]) : set_m(month - 1, months[i - 1]);
    };

    const getNextDate = () => {

        if (
            m === months[0]
            || m === months[2]
            || m === months[4]
            || m === months[6]
            || m === months[7]
            || m === months[9]
            || m === months[11]
        )
        {
            date === 31 ? getNextMonth() : setDate(date + 1)
        } else if (m === months[1]) {
            date === 28 || date === 29 ? getNextMonth() : setDate(date + 1)
        } else {
            date === 30 ? getNextMonth() : setDate(date + 1)
        }

        d === days[6] ? set_d(days[0]) : set_d(days[days.indexOf(d) + 1]);
    };

    const getPrevDate = () => {

        date === 1 ? getPrevMonth() : setDate(date - 1);
        d === days[0] ? set_d(days[6]) : set_d(days[days.indexOf(d) - 1]);
    };

    return (
        <SafeAreaView>

            <ScrollView style={theme.light} contentContainerStyle={styles.adsScreen}>
                <Button
                    onPress={() => getPrevDate()}
                >
                    <Icon
                        name='chevron-back-outline'
                        size={25}
                        color='#000'
                    />
                </Button>
                <Pressable
                    style={{ flexDirection: 'column' }}
                    onPress={() => console.log('calendar')}
                >
                    <Text style={{ ...theme_text.light, fontSize: 20 }}>{date} {m}</Text>
                    <Text style={{ ...theme_text.light, fontSize: 20, textAlign: 'center' }}>{d}</Text>
                </Pressable>
                <Button
                    onPress={() => getNextDate()}
                >
                    <Icon
                        name='chevron-forward-outline'
                        size={25}
                        color='#000'
                    />
                </Button>
            </ScrollView>

            <ScrollView>
                {lessons.map(lesson =>
                    <TouchableOpacity
                        key={lesson.lesson_id}
                        style={
                            {
                                margin: 10,
                                paddingBottom: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: 'gray'
                            }
                        }
                        onPress={() => {
                            toggleLessonInfo(lesson)
                            navigation.navigate('Lesson')
                        }}
                    >

                        <View
                            style={
                                {
                                    paddingLeft: 10,
                                    borderLeftWidth: 3,
                                    borderLeftColor: lessons.indexOf(lesson) % 2 === 0 ? 'blue' : 'red'
                                }
                            }
                        >
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={{fontWeight: 'bold'}}>{lesson.subject_name}</Text>
                                <Text style={{color: 'green', paddingHorizontal: 15, fontSize: 16}}>{lesson.value}</Text>
                            </View>

                            <Text>
                                {lesson.homework}
                            </Text>

                            <Text
                                style={{color: lesson.comment_type === 1 ? 'green' : 'red'}}
                            >{lesson.comment}</Text>
                            {
                                lesson.numrows_files_lesson === 0 
                                ? null 
                                : <Text>Файлы({lesson.numrows_files_lesson})</Text>
                            }
                        </View>
                    </TouchableOpacity>
                )}
                <View style={{padding: 50}}>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default DiaryScreen;