import React from 'react'
import { AsyncStorage } from 'react-native'

const DECKS_KEY = 'UdaciCards:decks'

const initialContent = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
}

function initStorage() {
    AsyncStorage.setItem(DECKS_KEY, JSON.stringify(initialContent))
    return initialContent
}

export function getDecks() {
    return AsyncStorage.getItem(DECKS_KEY)
        .then((result) => result === null ? initStorage() : JSON.parse(result))
}

export function getDeck(deckId) {
    return getDecks().then((decks) => decks[deckId])
}

export function addDeck(title) {
    const deck = {
        title,
        questions: []
    }

    return AsyncStorage.mergeItem(DECKS_KEY,
        JSON.stringify({[deck.title]: deck}))
}

export function addCardToDeck( deckId, card) {
    getDeck(deckId)
        .then((deck) => {
            return AsyncStorage.mergeItem(DECKS_KEY,
                JSON.stringify({
                    [deck.title]: { questions: deck.questions.concat(card) }
                }))
        })
}

