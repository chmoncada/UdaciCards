import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { StyleSheet, View, Platform, StatusBar } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'

import reducer from './reducers'

import styles from './styles/common'
import { green, white } from './styles/colors'

import Decks from './components/Decks'
import NewDeck from './components/NewDeck'
import DeckDetails from './components/DeckDetails'
import AddCard from './components/AddCard'
import QuizFlow from './components/QuizFlow'
import QuizResults from './components/QuizResults'

import { UdaciCardsStatusBar } from './utils/utils'
import { setLocalNotification } from './utils/notifications'


const Tabs = TabNavigator({
    Decks: {
        screen: Decks,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
        }
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'New Deck',
            tabBarIcon: ({ tintColor }) => <Entypo name='add-to-list' size={30} color={tintColor} />
        }
    },
}, {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? green : white,
        style: {
            height: 56,
            backgroundColor: Platform.OS === 'ios' ? white : green,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 8,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
})

const MainNavigator = StackNavigator({
    Home: {
        screen: Tabs,
    },
    DeckDetails: {
        screen: DeckDetails,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: green
            }
        }
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: green
            }
        }
    },
    QuizFlow: {
        screen: QuizFlow,
        key: 'QUIZ_FLOW',
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: green
            }
        }
    },
    QuizResults: {
        screen: QuizResults,
        navigationOptions: {
            header: null
        }
    },
})



export default class App extends Component {

    componentDidMount() {
        setLocalNotification()
    }

    render() {
    return (
        <Provider store={createStore(reducer)}>
            <View style={styles.basicContainer}>
                <UdaciCardsStatusBar backgroundColor={green} barStyle='light-content' />
                <MainNavigator/>
            </View>
        </Provider>
    );
  }
}

