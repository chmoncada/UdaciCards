export const SET_DECKS = 'SET_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

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