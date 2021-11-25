import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { styles } from '../components/Style';
import QuartersHeader from '../components/QuartersHeader';

const MarksScreen = () => {
    const darkTheme = useSelector(state => state.theme.darkTheme);
    const userData = useSelector(state => state.auth.userData);
    const user = useSelector(state => state.auth.user);

    const [subjects, setSubjects] = useState('');
    const [showAll, setShowAll] = useState(false);

    // SET IT AUTAMOTICALLY!!!
    const term = useSelector(state => state.marks.term);

    const filterText = [{title: 'Оценки за неделю', status: false}, {title: 'Все оценки', status: true}];

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

    const Item = ({ title, marks, allMarks, final }) => (
        <View 
            style={
                {
                    ...styles.listItemContainer, 
                    flexDirection: 'column', 
                    paddingRight: 15 
                }
            }
        >
            <Text
                style={
                    {
                        color: darkTheme ? '#fff' : '#000',
                        fontSize: 16,
                        paddingHorizontal: 15,
                        fontWeight: 'bold'
                    }
                }
            >
                {title}
            </Text>
            <View 
                style={
                    {
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }
                }
            >
            <Text
                style={
                    {
                        color: '#0080ff',
                        paddingHorizontal: 15,
                        fontSize: 16
                    }
                }
            >
                {
                    showAll === true ? allMarks : marks
                }
            </Text>
            <Text 
                style={
                    {
                        fontSize: 16, 
                        color: final === '5' 
                        ? '#008040' 
                        : final === '4' 
                        ? '#e1e100' 
                        : final === '2' 
                        ? '#ff0000' 
                        : '#000'
                    }
                }
                >
                {final}
            </Text>
            </View>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item
            title={item.subject}
            marks={item.weekMarks}
            allMarks={
                term === '1'
                ? item.stringMarks[0]
                : term === '2'
                ? item.stringMarks[1]
                : term === '3'
                ? item.stringMarks[2]
                : term === '4'
                ? item.stringMarks[3]
                : term === '5'
                ? item.stringMarks[4]
                : term === '6'
                ? item.stringMarks[5]
                : item.stringMarks[0]
            }
            final={
                item.itogoMarks[0] != 0 && term === '1'
                ? item.itogoMarks[0]
                : item.itogoMarks[1] != 0 && term === '2'
                ? item.itogoMarks[1]
                : item.itogoMarks[2] != 0 && term === 'I'
                ? item.itogoMarks[2]
                : item.itogoMarks[3] != 0 && term === '3'
                ? item.itogoMarks[3]
                : item.itogoMarks[4] != 0 && term === '4'
                ? item.itogoMarks[4]
                : item.itogoMarks[5] != 0 && term === 'II'
                ? item.itogoMarks[5]
                : ''
            }
        />
    );

    const Filter = () => (
        <View 
            style={
                    {
                        backgroundColor: '#e0e0e0', 
                        flexDirection: 'row', 
                        justifyContent: 'space-evenly' 
                    }
                }
            >
            {
                filterText.map(item => (
                    <TouchableOpacity
                        key={item.title}
                        onPress={() => setShowAll(item.status)}
                        style={
                            {
                                flex: 2,
                                padding: 15,
                                borderColor: '#fff',
                                borderWidth: 1,
                                backgroundColor: showAll === item.status ? '#9E9E9E' : '#c9c9c9'
                            }
                        }
                    >
                        <Text style={{fontSize: 16}}>
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    );

    return (
        <SafeAreaView
            style={styles.safeArea}
        >
            <Filter />
            <FlatList
                data={subjects}
                renderItem={renderItem}
                keyExtractor={item => item.subject_id}
                ListHeaderComponent={
                    showAll
                    ? <QuartersHeader term={term} />
                    : <></>
                }
                ListFooterComponent={
                    <Text style={{paddingVertical: 25}}></Text>
                }
            />
        </SafeAreaView>
    );
};

export default MarksScreen;
