import React from 'react';
import { Share, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const UserPanel = (props) => {
    const pubDate = props.datetime ? props.datetime.substring(0, 10).split('-').reverse().join('.') : '';

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
