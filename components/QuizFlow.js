import React, { Component } from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Platform} from 'react-native'
import { connect } from 'react-redux'
import {white, green} from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/notifications'

class QuizFlow extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentWillMount() {
        this.startQuiz()
        clearLocalNotification()
            .then(setLocalNotification())
    }

    handleCorrectAnswer = () => {
        this.setState((state) => ({
            correctAnswers: state.correctAnswers + 1
        }))
        this.next()
    }

    handleIncorrectAnswer = () => { this.next() }

    startQuiz = () => {
        const { deck } = this.props

        const totalCards = deck.questions.length

        this.setState({
            remainingCards: deck.questions.map((card, index) => index),
            correctAnswers: 0,
            totalCards: totalCards
        })
        this.next()
    }

    next() {
        this.setState((state) => {
           const { remainingCards } = state
            if (remainingCards.length > 0) {
                const nextQuestionIndex = Math.floor(Math.random()*remainingCards.length)
                return {
                    currentQuestion: remainingCards[nextQuestionIndex],
                    remainingCards: remainingCards.filter((item, index) => index != nextQuestionIndex),
                    questionShown: true
                }
            } else {
                return {
                    currentQuestion: -1,
                    questionShown: true
                }
            }
        })
    }

    showAnswer = () => {
        this.setState((state) => ({
            questionShown: !state.questionShown
        }))
    }

    handleBackToDeck = () => {
        const { navigation } = this.props
        navigation.goBack()
    }

    render() {

        const { totalCards, remainingCards, questionShown, currentQuestion, correctAnswers } = this.state
        const { deck, navigation } = this.props

        if (currentQuestion < 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.card}>Deck completed!</Text>
                    <Text style={styles.card}>Correct answers: {correctAnswers}/{deck.questions.length}</Text>
                    <View>
                        <TouchableOpacity
                            style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn, { backgroundColor: green}] }
                            onPress={this.startQuiz} >
                            <Text style={styles.buttonText}>Restart Quiz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn, { backgroundColor: green}] }
                            onPress={this.handleBackToDeck} >
                            <Text style={styles.buttonText}>Back to Deck</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }

        const card = deck.questions[currentQuestion]
        return (
            <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
                <Text style={styles.remainingCardsText}>{totalCards - remainingCards.length}/{totalCards}</Text>
                <View style={styles.container}>
                    <Text style={styles.card}>{questionShown ? card.question : card.answer}</Text>
                    <TouchableOpacity
                        onPress={this.showAnswer} >
                        <Text style={styles.answerBtnText}>{questionShown ? 'Answer' : 'Question' }</Text>
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity
                            style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn, { backgroundColor: 'green'}] }
                            onPress={this.handleCorrectAnswer} >
                            <Text style={styles.buttonText}>Correct</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn, { backgroundColor:'red'}] }
                            onPress={this.handleIncorrectAnswer} >
                            <Text style={styles.buttonText}>Incorrect</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

function mapStateToProps(state, { navigation }) {
    const { deckId } = navigation.state.params
    return {
        deck: state[deckId]
    }
}

export default connect(mapStateToProps)(QuizFlow)

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