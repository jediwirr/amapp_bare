import React, { useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { ip } from './RegForm';
import { useSelector, useDispatch } from 'react-redux';

import UserPanel from './UserPanel';

let header;

const ArticleDetails = (props) => {
    const { title } = props.route.params;
    const dataItem = useSelector(state => state.gym.dataItem);
    const dispatch = useDispatch();
    const loadDataItem = (title) => dispatch({type: 'LOAD_DATA_ITEM', title});

    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: title.length > 31 ? title.slice(0, 32) + '...' : title
        });
    }, []);

    useEffect(() => {
        loadDataItem(title);
    }, []);

    return (
        <ScrollView>
            <View style={styles.viewStyle}>
                <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                    {dataItem.title}
                </Text>

                <Text style={{fontSize: 18, fontStyle: 'italic'}}>
                    {dataItem.author}
                </Text>

                <View>
                    <Image
                        style={{flex: 1, alignSelf: 'center', margin: 10, width: 360, height: 360}}
                        source={{
                            uri: `${dataItem.imgPath}`,
                        }}
                    />
                </View>

                <Text style={{fontSize: 16, fontStyle: 'italic'}}>
                    {dataItem.photographer}
                </Text>

                <Text style={{fontSize: 20, marginTop: 15, fontWeight: 'bold'}}>
                    {dataItem.description}
                </Text>

                <Text style={{fontSize: 20, marginTop: 15}}>
                    {dataItem.content}
                </Text>

                <Text style={{fontSize: 18, fontStyle: 'italic'}}>
                    {dataItem.sign}
                </Text>
            </View>
            <UserPanel 
                ip={ip}
                title={dataItem.id}
                name={dataItem.title}
                description = {dataItem.description}
                content = {dataItem.content}
                uri = {dataItem.web_uri}
                color={dataItem.color}
                numOfLikes={dataItem.likes} 
                datetime={dataItem.published} 
                comment={() => console.log('comment')}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create ({
    viewStyle: {
        padding: 10,
        margin: 10
    },
    btnStyle: {
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 15,
        padding: 10
    },
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
        color: 'gray', 
        fontSize: 15, 
        marginBottom: 10, 
        padding: 18, 
        borderWidth: 1, 
        borderColor: "gray"
    }
})

export { header }
export default ArticleDetails;
