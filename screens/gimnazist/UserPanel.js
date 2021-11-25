import React from 'react';
import { Share, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

const UserPanel = (props) => {
    const pubDate = props.datetime.substring(0, 10).split('-').reverse().join('.');

    const dispatch = useDispatch();

    const onShare = async (uri) => {
        try {
            const result = await Share.share({
                message: uri
            })
            console.log(result);
        } catch(error) {
            console.log(error);
        }
    };

    return (
        <View>
            <Text style={{
                fontWeight: 'bold', 
                fontSize: 16, 
                flexDirection: 'row', 
                justifyContent: 'space-around',
                paddingTop: 5,
                paddingLeft: 20
                }}
            >{props.numOfLikes === 0 ? '' : `Понравилось: ${props.numOfLikes}`}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Text style={{padding: 10, fontStyle: 'italic'}}>{pubDate}</Text>
                <Icon 
                    name="share-social-outline"
                    size={25}
                    color='gray'
                    onPress={() => onShare(props.uri)}
                />
            </View>
        </View>
    )
}

export default UserPanel;
