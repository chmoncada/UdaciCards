import { SET_DECKS, ADD_DECK, ADD_CARD } from './types'

export function setDecks(decks) {
    return {
        type: SET_DECKS,
        decks
    }
}

export function addDeck(title) {
    return {
        type: ADD_DECK,
        title
    }
}

export function addCard(deckId, card) {
    return {
        type: ADD_CARD,
        deckId,
        card
    }
}