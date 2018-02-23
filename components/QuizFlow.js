import React, { Component } from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Platform} from 'react-native'
import { connect } from 'react-redux'
import {white, green} from '../styles/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/notifications'

class QuizFlow extends Component {

    constructor(props) {
        super(props)
        this.state = {
            remainingCards: Number.MAX_SAFE_INTEGER
        }
    }

    componentWillMount() {
        this.startQuiz()
        clearLocalNotification()
            .then(setLocalNotification())
    }

    handleCorrectAnswer = () => {
        this.setState((state) => ({
            correctAnswers: state.correctAnswers + 1
        }), function() {
            console.log(this.state.correctAnswers)
            this.next()
        })
    }

    handleIncorrectAnswer = () => { this.next() }

    startQuiz = () => {
        const { deck } = this.props

        const totalCards = deck.questions.length
        const initialCards = deck.questions.map((card, index) => index)
        const questionIndex = Math.floor(Math.random() * initialCards.length)

        this.setState({
            remainingCards: initialCards.filter((item, index) => index != questionIndex),
            correctAnswers: 0,
            totalCards: totalCards,
            currentQuestion: initialCards[questionIndex]
        })
    }

    next() {

        const {remainingCards, correctAnswers, totalCards} = this.state
        const {navigation} = this.props
        const deckId = navigation.state.params.deckId

        if (remainingCards.length <= 0) {
            navigation.navigate({
                routeName: 'QuizResults',
                params: { correctAnswers: correctAnswers,
                    totalQuestions: totalCards,
                    deckId: deckId,
                    onNavigateBack: this.handleOnNavigateBack},
                key: 'QUIZ_FLOW'})
            return
        }

        this.setState((state) => {
            const {remainingCards} = state
            if (remainingCards.length > 0) {
                const questionIndex = Math.floor(Math.random() * remainingCards.length)
                return {
                    currentQuestion: remainingCards[questionIndex],
                    remainingCards: remainingCards.filter((item, index) => index != questionIndex),
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

    handleOnNavigateBack = () => {
        this.startQuiz()
    }

    render() {

        const { totalCards, remainingCards, questionShown, currentQuestion, correctAnswers } = this.state
        const { deck, navigation } = this.props

        if (currentQuestion < 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.card}>Deck completed!</Text>
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