import React from 'react';
import { Text, View, Alert, ScrollView, Linking } from 'react-native';
import { Button } from 'react-native-paper'
import { useDispatch, useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/Ionicons';
import DocumentPicker from 'react-native-document-picker'

const LoadFile = () => {
    const user = useSelector(state => state.auth.user);
    const userData = useSelector(state => state.auth.userData);

    const dispatch = useDispatch();
    const setFiles = (files) => dispatch({type: 'SET_FILES', files});

    const name = useSelector(state => state.loads.subjectName);
    const lesson = useSelector(state => state.loads.selectedLesson);

    const _handleLink = (url) => {
        Linking.openURL(url);
    };

    const _refreshLesson = async () => {
        await fetch(`https://diary.alma-mater-spb.ru/e-journal/api/update_lesson.php?clue=${userData.clue}&user_id=${userData.user_id}&student_id=${user.student_id}&lesson_id=${lesson.lesson_id}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                response.lessons.map(item =>
                    setFiles(item.answer_student)
                )
            })
            .catch(error => console.log(error));
    };

    let data = new FormData();

    const _uploadFile = async () => {

        await fetch(`https://diary.alma-mater-spb.ru/e-journal/api/upload_file.php?clue=${userData.clue}&user_id=${userData.user_id}&student_id=${user.student_id}&lesson_id=${lesson.lesson_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
              },
            body: data
        })
        .then(response => response.json())
        .then(response => {
            console.log(data);
            if (response.status === 0) {

                Alert.alert('Файл успешно загружен');
                _refreshLesson();

            } else if (response.status === 2) {
                Alert.alert('Чего-то не хватает');
            } else {
                Alert.alert('Произошла ошибка, попробуйте ещё раз');
            }
        })
        .catch(error => {
            console.log(error.message)
            throw error
        });
    }

    const _pickFiles = async () => {
        try {
            const results = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            })
            for (const res of results) {
                data.append('file', {
                    name: res.name,
                    type: res.type,
                    uri: res.uri
                });
                console.log(res.name, res.type, res.uri);
            }
            _uploadFile()
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                Alert.alert('Загрузка отменена')
            } else {
                throw(err);
            }
        }
    };

    const _deleteFile = async (fileID) => {
        await fetch(`https://diary.alma-mater-spb.ru/e-journal/api/delete_file.php?clue=${userData.clue}&user_id=${userData.user_id}&file_id=${fileID}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(() => {
                _refreshLesson();
                Alert.alert('Файл удалён');
            })
            .catch(error => {
                console.log(error);
                throw error;
            });
    };

    const RenderLesson = () => (
        lesson.answer_student.map(item =>
            <View key={item.file_id} style={{flexDirection: 'row'}}>
                <Text
                    style={
                        {
                            color: '#0033FF',
                            fontSize: 16,
                            paddingVertical: 15,
                            borderBottomWidth: 1,
                            borderBottomColor: 'gray'
                        }
                    }
                    onPress={() => _handleLink(item.url)}
                >
                    {item.title}
                </Text>
                <Button
                    onPress={() => _deleteFile(item.file_id)}
                >
                    <Icon
                        name='close-outline'
                        size={25}
                        color='red'
                    />
                </Button>
            </View>
        )
    );

    return (
       <ScrollView>
            <View style={{padding: 10}}>
                <View style={
                    {
                        flexDirection: 'row'
                    }
                }>
                    <Text style={
                        {
                            fontSize: 16,
                            fontWeight: 'bold',
                            paddingRight: 10
                        }
                    }>{lesson.data_lesson}</Text>
                    <Text style={
                        {
                            fontSize: 16,
                            fontWeight: 'bold'
                        }
                    }>{name}</Text>
                </View>
                <Text
                    style={
                        {
                            fontSize: 18,
                            paddingVertical: 15,
                            borderBottomWidth: 1,
                            borderBottomColor: 'gray'
                        }
                    }
                    onPress={() => _pickFiles()}
                >
                    + Добавить файл
                </Text>
                <RenderLesson />
            </View>
       </ScrollView>
    );
};

export default LoadFile;