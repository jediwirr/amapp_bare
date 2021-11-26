import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { Card } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { fetchContent } from '../../store/asyncActions/getContent';
import UserPanel from './UserPanel';
import { ip } from './RegForm';

const Home = (props) => {
    const data = useSelector(state => state.gym.data);
    const cl = useSelector(state => state.gym.catList);

    const dispatch = useDispatch();

    const loadList = (payload) => dispatch({type: 'LOAD_CATEGORY_LIST', payload});

    useEffect(() => {
        loadList('');
    }, []);

    useEffect(() => {
        dispatch(fetchContent());
    }, []);

    const clickedItem = (title) => {
        props.navigation.navigate("Details", {title: title});
    }

    const renderData = (item) => {

        return (
            <Card style={styles.cardStyle} onPress = {() => clickedItem(item.title)}>
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
};

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
