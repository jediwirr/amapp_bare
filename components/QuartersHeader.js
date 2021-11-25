import React from "react";
import { Text, View, TouchableOpacity } from 'react-native';
import { useDispatch } from "react-redux";

import { styles } from '../components/Style';

const QuartersHeader = ({term}) => {
    const periods = ['1', '2', '5', '3', '4', '6'];
    const dispatch = useDispatch();
    const setTerm = (payload) => dispatch({type: 'SET_TERM', payload});

    return (
        <View style={styles.period_list_container}>
            {periods.map(period =>
                <TouchableOpacity
                    key={period}
                    style={
                        {
                            ...styles.period, 
                            backgroundColor: term === period 
                            ? '#9E9E9E' 
                            : '#c9c9c9'
                        }
                    }
                    onPress={() =>
                        {
                            setTerm(period)
                            console.log(`${term} - term, ${period} - period`)
                        }
                    }
                >
                    <Text
                        key={period}
                        style={{textAlign: 'center'}}
                    >
                        {
                            period === '5' 
                            ? 'I'
                            : period === '6' 
                            ? 'II'
                            : period
                        }
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default QuartersHeader;