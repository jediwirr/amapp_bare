import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {styles, theme_text} from '../components/Style';
import QuartersHeader from '../components/QuartersHeader';

const LoadsScreen = ({navigation}) => {
    const user = useSelector(state => state.auth.user);
    const userData = useSelector(state => state.auth.userData);

    const dispatch = useDispatch();
    const loadSubject = (payload, name) => dispatch({type: 'LOAD_SUBJECT', payload, name});

    const [subjects, setSubjects] = useState([]);
    const term = useSelector(state => state.marks.term);

    useEffect(() => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_marks.php?clue=${userData.clue}&user_id=${userData.user_id}&student_id=${user.student_id}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                setSubjects(response.marks);
            })
            .catch(error => console.log(error));
    }, [user]);

    const _selectLesson = (id, name) => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_homework.php?clue=${userData.clue}&user_id=${userData.user_id}&student_id=${user.student_id}&quarter=${term}&subject_id=${id}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response =>
                {
                    console.log(response);
                    loadSubject(response.lessons, name);
                    navigation.navigate('LoadDetails');
                }
            )
            .catch(error => console.log(error))
    };

    const Item = ({subject, id}) => (
        <View
            style={
                {
                    padding: 15,
                    margin: 5,
                    backgroundColor: '#dcdcdc',
                    borderRadius: 50
                }
            }
        >
            <Text style={theme_text.light}
                  onPress={() => _selectLesson(id, subject)}
            >
                {subject}
            </Text>
        </View>

    );

    const renderItem = ({item}) => {
        return  <Item subject={item.subject} id={item.subject_id} />
    };

    return (
        <SafeAreaView>
            <QuartersHeader term={term} />
            <FlatList
            data={subjects}
            renderItem={renderItem}
            keyExtractor={item => item.subject_id}
            ListFooterComponent={
                <View style={{padding: 20}}></View>
            }
        />

        </SafeAreaView>
    );
};

export default LoadsScreen;