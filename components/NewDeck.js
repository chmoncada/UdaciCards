import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert, Platform } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import * as api from '../utils/api'

import { green } from '../styles/colors'

class NewDeck extends Component {

    constructor(props) {
        super(props)
        this.state = { title: '' }
    }

    handleSubmit = () => {
        const { title } = this.state
        const { dispatch, navigation } = this.props

        if (!title) {
            return Alert.alert('You should enter a valid title')
        }

        dispatch(addDeck(title))
        api.addDeck(title)
        this.setState({ title: ''})
        navigation.navigate('DeckDetails', { deckId: title})
    }

    handleTitleChange = (value) => {
        this.setState({ title: value})
    }

    render() {

        const { title } = this.state

        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.text}>What is the title of your new deck?</Text>
                <TextInput
                    value={title}
                    placeholder='Deck Title'
                    style={styles.textInput}
                    onChangeText={ this.handleTitleChange }
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

export default connect()(NewDeck)

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'black',
        fontSize: 36,
        textAlign: 'center',
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