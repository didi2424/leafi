import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Home from '../Screens/Home'
import Profile from '../Screens/Profile/Profile'

import { NavigatorScreenParams } from '@react-navigation/native'
import TabNavigators, { TabsStackParamList } from './TabNavigators'

export type RootStackParamList = {
    TabStack: NavigatorScreenParams<TabsStackParamList>
    Profile: undefined

};

const RootStack = createNativeStackNavigator<RootStackParamList>()

const RootNavigators = () => {
  return (
    <RootStack.Navigator>
        <RootStack.Screen 
        name="TabStack"
        component={TabNavigators}
        options={{headerShown: false}} />
        <RootStack.Screen name="Profile" component={Profile} />
    </RootStack.Navigator>
  )
}

export default RootNavigators