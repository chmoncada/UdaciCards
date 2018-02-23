import React from 'react'
import { View, StatusBar } from 'react-native'
import { Constants } from 'expo'

export function UdaciCardsStatusBar({ backgroundColor, ...props }) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar traslucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}