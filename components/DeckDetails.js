import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import styles from '../styles/deckDetails'

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
                <View style={styles.titleBox}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{questions.length} card{questions.length !== 1 ? 's' : ''}</Text>
                </View>
                <View>
                    <TouchableOpacity
                        style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn, { backgroundColor: 'white', borderWidth: 1}] }
                        onPress={() => navigation.navigate('AddCard', { deckId: deckId })} >
                        <Text style={[styles.btnText, {color:'black'}]}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn }
                        onPress={() => questions.length > 0 && navigation.navigate({
                            routeName: 'QuizFlow',
                            params: { deckId: deckId },
                            key: 'DECK_DETAILS'})} >
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

