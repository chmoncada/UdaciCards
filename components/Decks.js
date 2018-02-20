import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'

import { getDecks } from '../utils/api'
import { connect } from 'react-redux'
import { setDecks } from '../actions'

function renderItem(rowItem, navigation) {
    const { title, questions } = rowItem.item
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('DeckDetails', { deckId: title })}>
            <View style={styles.item}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{questions.length} card{questions.length !== 1 ? 's' : ''} </Text>
            </View>
        </TouchableOpacity>
    )
}

class Decks extends Component {

    componentDidMount() {
        getDecks().then((decks) => this.props.dispatch(setDecks(decks)))
    }

    render() {

        const { navigation, decks } = this.props

        return (
            <View>
                <FlatList
                data={decks}
                renderItem={(item) => renderItem(item, navigation)}
                keyExtractor={(item) => item.title}
                />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        decks: Object.keys(state).map((deckId) => state[deckId])
    }
}

export default connect(mapStateToProps)(Decks)

const styles=StyleSheet.create({
    item: {
        paddingTop: 30,
        paddingBottom: 30,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#444',
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center'
    }
})