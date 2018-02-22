import React, { Component } from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Platform} from 'react-native'
import { connect } from 'react-redux'
import {white, green} from '../utils/colors'

class QuizResults extends Component {

    handleBackToDeck = () => {
        const { navigation } = this.props
        navigation.goBack('DECK_DETAILS')
    }

    handleBackToQuiz = () => {
        const { navigation, deckId } = this.props
        this.props.navigation.state.params.onNavigateBack()
        navigation.goBack()
    }

    render() {

        const {correctAnswers, totalQuestions, navigation } = this.props

        return (
            <View style={styles.container}>
                <Text style={styles.card}>Deck completed!</Text>
                <Text style={styles.card}>Correct answers: {correctAnswers}/{totalQuestions}</Text>
                <View>
                    <TouchableOpacity
                        style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn, {backgroundColor: green}]}
                        onPress={this.handleBackToQuiz}>
                        <Text style={styles.buttonText}>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn, {backgroundColor: green}]}
                        onPress={this.handleBackToDeck}>
                        <Text style={styles.buttonText}>Back to Deck</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )

    }
}

function mapStateToProps(state, { navigation }) {
    const { correctAnswers, totalQuestions, deckId } = navigation.state.params
    return {
        correctAnswers,
        totalQuestions,
        deckId
    }
}

export default connect(mapStateToProps)(QuizResults)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',

    },
    remainingCardsText: {
        backgroundColor: 'white',
        alignSelf: 'flex-start',
        marginTop: 20,
        marginLeft: 20,
        fontSize: 36,
        fontWeight: 'bold',
        color: '#444',
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
        justifyContent: 'center'
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
    answerBtnText: {
        color: 'red',
        fontSize: 22,
        textAlign: 'center',
    },
    card: {
        margin: 50,
        fontSize: 22,
        textAlign: 'center'
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 22,
    },
})