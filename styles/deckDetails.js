import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    titleBox: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#444',
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 30,
        color: '#999',
        textAlign: 'center'
    },
    iosSubmitBtn: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginRight:40,
        marginLeft:40,
        marginTop: 20,
        marginBottom: 20,
    },
    androidSubmitBtn: {
        backgroundColor: 'black',
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2,
        height: 45,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    btnText: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center',
    },
})