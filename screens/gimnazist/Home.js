import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, FlatList, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import UserPanel from './UserPanel';
import { ip } from './RegForm';

export const ErrorScreen = () => {
    return(
        <View style={styles.cardStyle}>
            <Text style={styles.listStyle}>ПРОИЗОШЛА ОШИБКА</Text>
            <Text>Перезагрузите приложение</Text>
        </View>
    )
}

export const UserSettings = (props) => {
    const dispatch = useDispatch();
    const userid = useSelector(state => state.gym.userid);
    const signOut = () => dispatch({type: 'SIGN_OUT'});
    const loadFavs = (payload) => dispatch({type: 'LOAD_FAVORITES_LIST', payload});

    const data = useSelector(state => state.gym.data);
    const fav_as = data.filter(item => item.likes.includes(userid));

    return(
        <View style={styles.cardStyle}>
            <View style={styles.listStyle}>
                <Icon 
                    name='heart' 
                    size={30}
                    color="#711E63"
                />
                <Text style={{fontSize: 18}}
                    onPress={() => {
                        if (fav_as.length === 0) {
                            Alert.alert('Вы пока не отмечали понравившиеся материалы')
                        } else {
                            loadFavs(userid);
                            props.navigation.navigate("МАТЕРИАЛЫ");
                        }
                    }} 
                >Понравившиеся материалы</Text>
            </View>
            <View style={styles.listStyle}>
                <Icon 
                    name='exit' 
                    size={30}
                    color="#711E63"
                /> 
                <Text style={{fontSize: 18}}
                    onPress={() => signOut()}
                >Выйти</Text>
            </View>
        </View>
    )
}

export const Categories = (props) => {
    const data = useSelector(state => state.gym.data);
    const dispatch = useDispatch();
    const initialCats = data.map(item => item.category);
    const loadList = (payload) => dispatch({type: 'LOAD_CATEGORY_LIST', payload});

    const loadCatItems = (cat) => {
        loadList(cat);
        props.navigation.navigate("МАТЕРИАЛЫ");
    }

    let cats = Array.from(new Set(initialCats));

    return(
        <ScrollView style={styles.cardStyle}>
            <Text 
               onPress={() => {
                    loadCatItems('');
                }} 
                style={styles.listStyle}
            >Все материалы</Text>
            {cats.map(item => 
                <Text 
                    onPress={() => {
                        loadCatItems(item);
                    }}
                    key={item} 
                    style={styles.listStyle}
                >{item}</Text>)}
        </ScrollView>
    );
};

const Home = (props) => {

    const data = useSelector(state => state.gym.data);
    const cl = useSelector(state => state.gym.catList);
    const userid = useSelector(state => state.gym.userid);

    const dispatch = useDispatch();

    const loadData = (payload) => dispatch({type: 'LOAD_DATA', payload});
    const loadList = (payload) => dispatch({type: 'LOAD_CATEGORY_LIST', payload});

    const handled = useSelector(state => state.gym.handled);

    useEffect(() => {
        loadList('');
    }, [])

    useEffect(() => {
        fetch(`http://${ip}/articles/`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(response =>
            loadData(response)
        )
        .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        loadData(data);
    }, [handled])

    const clickedItem = (data) => {
        props.navigation.navigate("Details", {data:data});
    }

    const renderData = (item) => {

        return (
            <Card style={styles.cardStyle} onPress = {() => clickedItem(item)}>
                <Text style={{color: 'gray', fontSize: 15}}>{item.category.toUpperCase()}</Text>
                <Text style={{fontSize: 22, fontWeight: 'bold'}}>{item.title}</Text>
                <Text style={{fontSize: 16, fontStyle: 'italic'}}>{item.author}</Text>
                <View>
                    <Image
                        style={{flex: 1, alignSelf: 'center', margin: 10, width: 360, height: 360}}
                        source={{
                            uri: `${item.imgPath}`,
                        }}
                    />
                </View>
                <Text style={{fontSize: 18}}>{item.description}</Text>
                <UserPanel 
                    ip={ip}  
                    title={item.id}
                    name={item.title}
                    description = {item.description}
                    content = {item.content}
                    uri = {item.web_uri}
                    color={item.likes.includes(userid) ? 'red' : 'gray'}
                    l = {item.likes}
                    numOfLikes={Array.from(new Set(item.likes)).length} 
                    datetime={item.published} 
                    comment={() => clickedItem(item)}
                />
            </Card>
        )
    }

    return (
            <View style={{flex: 1}}>
                <FlatList 
                    data = {cl.length > 0 ? cl : data}
                    renderItem = {({item}) => {
                        return renderData(item)
                    }}
                    keyExtractor = {item => `${item.id}`}
                />
            </View>
    )
}

export const styles = StyleSheet.create({
    cardStyle: {
        padding: 10,
        margin: 10
    },
    fabStyle: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    listStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 25,
        marginBottom: 15,
        fontSize: 18
    }
})

export default Home;
