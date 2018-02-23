import React, { Component } from 'react'
import {StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView, TextInput, Alert, Platform} from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import {green} from "../styles/colors";
import {addCardToDeck} from "../utils/api";


class AddCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            question: '',
            answer: ''
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: `Add card to deck ${navigation.state.params.deckId} `
        }
    }

    handleQuestionChange = (question) => {
        this.setState({ question: question})
    }

    handleAnswerChange = (answer) => {
        this.setState({ answer: answer})
    }

    handleSubmit = () => {
        const { question, answer } = this.state
        const card = { question, answer }
        const { deckId } = this.props

        if (!question || !answer) {
            return Alert.alert('Empty Fields', 'Enter values to both fields')
        }

        this.props.dispatch(addCard(deckId, card))
        addCardToDeck(deckId, card)

        this.setState({
            question:'',
            answer: ''
        })

        this.textInput.focus()
    }

    render() {

        const { question, answer } = this.state
        const { deck } = this.props

        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <TextInput
                    value={question}
                    placeholder='Enter Question'
                    style={styles.textInput}
                    onChangeText={ this.handleQuestionChange }
                    ref={(e) => {this.textInput = e}}
                />
                <TextInput
                    value={answer}
                    placeholder='Enter Answer'
                    style={styles.textInput}
                    onChangeText={ this.handleAnswerChange }
                />
                <TouchableOpacity
                    style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn }
                    onPress={this.handleSubmit} >
                    <Text style={styles.submitBtnText}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

function mapStateToProps(state, { navigation }) {
    const { deckId } = navigation.state.params
    return {
        deckId,
        deck: state[deckId]
    }
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        borderWidth: 1,
        margin: 20,
        height: 50,
        width: 250,
        borderRadius: 5,
        paddingLeft: 5,
        alignSelf: 'center'
    },
    iosSubmitBtn: {
        backgroundColor: green,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginRight:40,
        marginLeft:40,
    },
    androidSubmitBtn: {
        backgroundColor: green,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2,
        height: 45,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnText: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center',
    },
})

export default connect(mapStateToProps)(AddCard)
