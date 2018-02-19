import React from 'react'
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import { TabNavigator } from 'react-navigation'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'
import { green, white } from './utils/colors'
import { Constants } from 'expo'
import Decks from './components/Decks'
import NewDeck from './components/NewDeck'

function UdaciCardsStatusBar({ backgroundColor, ...props }) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar traslucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

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


export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
          <UdaciCardsStatusBar backgroundColor={green} barStyle='light-content' />
          <Tabs/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
