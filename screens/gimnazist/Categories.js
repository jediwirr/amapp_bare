import React from 'react';
import { Text, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './Home';

const Categories = (props) => {
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

export default Categories;