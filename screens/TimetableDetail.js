import React, { useState } from 'react';
import { View, TextInput, Dimensions, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";

const TimetableDetail = ({navigation}) => {
    const user = useSelector(state => state.auth.user);
    const userData = useSelector(state => state.auth.userData);
    const lesson = useSelector(state => state.tt.lesson);
    const {width} = Dimensions.get('screen');
    const [text, setText] = useState(lesson.subject);

    const dispatch = useDispatch();
    const changeLesson = (payload) => dispatch({type: 'CHANGE_LESSON', payload});

    const goBack = () => navigation.goBack();

    const setChange = (item) => {
        changeLesson(item);

        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/edit_schedule.php?clue=${userData.clue}&user_id=${userData.user_id}&student_id=${user.student_id}&week_day=${lesson.week_day}&subject=${item}&number_lesson=${lesson.number_lesson}`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(error => console.log(error));

        goBack();
    };

    return (
      <View style={{ flex: 1, alignItems: 'center', paddingTop: 15 }}>
          <TextInput
            style={
                {
                    padding: 10,
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 50,
                    textAlign: 'center',
                    width: width / 1.3
                }
            }
            autoCapitalize='none'
            value={text}
            onChangeText={text => setText(text)}
          />
          <View style={
              {
                  flexDirection: Platform.OS === 'ios' ? 'row' : 'column',
                  justifyContent: 'space-between',
                  width: width / 2
              }
          }>
              <Button style={{marginTop: 35, borderRadius: 50}}
                      mode='contained'
                      onPress={() => setChange(text)}
              >
                  Сохранить
              </Button>
              <Button style={{marginTop: 35, borderRadius: 50}}
                      mode='contained'
                      onPress={() => goBack()}
              >
                  Вернуться
              </Button>
          </View>
      </View>
    );
};

export default TimetableDetail;