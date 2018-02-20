import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'

class DeckDetails extends Component {

    static navigationOptions = ({ navigation }) => {

        return {
            title: navigation.state.params.deckId
        }
    }

    render() {

        const { title, questions } = this.props.deck
        const { navigation, deckId } = this.props

        return (
            <View style={styles.container}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{questions.length} card{questions.length !== 1 ? 's' : ''}</Text>
                </View>
                <View>
                    <TouchableOpacity
                        style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn, { backgroundColor: white, borderWidth: 1}] }
                        onPress={() => navigation.navigate('AddCard', { deckId: deckId })} >
                        <Text style={[styles.btnText, {color:'black'}]}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn }
                        onPress={() => navigation.navigate('QuizFlow', { deckId: deckId })} >
                        <Text style={styles.btnText}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}

function mapStateToProps(state, { navigation }) {
    const { deckId } = navigation.state.params
    return {
        deckId,
        deck: state[deckId],
        navigation
    }
}

export default connect(mapStateToProps)(DeckDetails)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-around',
        alignItems: 'center',
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