import React, { useLayoutEffect }  from 'react';
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const LoadDetails = ({navigation}) => {
    const subject = useSelector(state => state.loads.subject);
    const name = useSelector(state => state.loads.subjectName);
    const dispatch = useDispatch();
    const selectLesson = (payload) => dispatch({type: 'SELECT_LESSON', payload});

    useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: name });
      }, []);

    return (
        <ScrollView>
            
            {subject.map(item =>
                <TouchableOpacity
                    key={item.lesson_id}
                    style={
                        {
                            flexDirection: 'row',
                            padding: 10,
                            margin: 5,
                            borderBottomWidth: 1,
                            borderBottomColor: 'gray',
                            fontSize: 16
                        }
                    }
                    onPress={() => {
                        selectLesson(item)
                        navigation.navigate('Загрузка файлов')
                    }}
                >
                    <Text style={{fontWeight: 'bold'}}>
                        {item.data_lesson}
                    </Text>
                    <View>
                        <Text style={{paddingLeft: 10}}>
                            {item.homework}
                        </Text>
                        <Text
                            style={
                                {
                                    paddingLeft: 10,
                                    paddingTop: 10,
                                    fontStyle: 'italic',
                                    color: item.answer_student.length === 0 ? 'black' : 'red'
                                }
                            }
                        >
                            {
                                item.answer_student.length === 0
                                ? 'Нет загруженных файлов'
                                : `Загруженных файлов - ${item.answer_student.length}`
                            }
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
        </ScrollView>
    );
};

export default LoadDetails;