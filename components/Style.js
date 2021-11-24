import { StyleSheet } from 'react-native';
import { StatusBar } from 'react-native';
import { Platform } from 'react-native';


export const theme = StyleSheet.create({
    dark: {
        backgroundColor: '#000'
    },
    light: {
        backgroundColor: '#fff'
    }
});

export const theme_text = StyleSheet.create({
    dark: {
        color: '#fff'
    },
    light: {
        color: '#000'
    }
});

export const styles = StyleSheet.create({
    safeArea: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },  
    container: {
      flex: 2,
      alignItems: 'center',
      justifyContent: 'center'
    },
    input: {
        borderRadius: 5,
        backgroundColor: '#fff',
        paddingHorizontal: 70,
        paddingVertical: 6,
        marginTop: 20
    },
    greeting: {
        fontSize: 25,
        color: '#fff'
    },
    logo: {
        width: 40,
        height: 30,
        marginLeft: 10
    },
    logoText: {
        paddingBottom: 10,
        fontSize: 23,
        color: '#fff'
    },
    list: {
        padding: 10
    },
    listItem: {
        fontSize: 21,
        marginLeft: 10,
        color: '#000'
    },
    listItemContainer: {
        // paddingVertical: 5,
        flexDirection: 'row',
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },
    modalPanel: {
        flexDirection: 'row',
        padding: 25
    },
    modalButton: {
        color: 'red'
    },
    settingsScreen: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: 10, 
        paddingLeft: 5 
    },
    adsScreen: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        padding: 15
    },
    account_role: {
        fontWeight: 'bold', 
        fontSize: 21, 
        textAlign: 'center'
    },
    account_name: {
        fontSize: 21, 
        textAlign: 'center', 
        marginTop: 30
    },
    period_list_container: {
        flexDirection: 'row',
        backgroundColor: '#c9c9c9' 
    },
    period: {
        paddingVertical: 8,
        borderRadius: 10,
        flex: 6,
        borderRightColor: '#fff',
        borderRightWidth: 1
    },
    calendarDay: {
        padding: 26,
        borderWidth: 1,
        borderColor: 'gray'
    },
    lessonInfoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 5,
        backgroundColor: '#20B2AA'
    },
    lessonInfo: {
        padding: 5,
        fontSize: 18
    },
    detailsHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    }
  });

  export const styles_dark = StyleSheet.create({
    listItem: {
        fontSize: 21,
        marginLeft: 10,
        color: '#fff'
    }
  });