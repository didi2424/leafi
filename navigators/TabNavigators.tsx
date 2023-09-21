import { View, Text, Dimensions,StyleSheet, Platform } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

import Home from '../Screens/Home'
import CommunityHome from '../Screens/Community/CommunityHome';
import ProfileNavigator from './ProfileNavigator'
import SmartpotNavigator from './SmartpotNavigator';
import CameraNavigator from './CameraNavigator';

export type TabsStackParamList = {
    Home: undefined
    Smartpot: undefined
    Image: undefined
    CommunityHome: undefined
    Profile: undefined
}

const TabStack = createBottomTabNavigator<TabsStackParamList>()

const TabNavigators = () => {
  return (
    <TabStack.Navigator
        screenOptions={{
            tabBarShowLabel: false,
            // tabBarLabelPosition: 'beside-icon',
            // tabBarLabelStyle: {
            //   color:'white'
            // },
            tabBarHideOnKeyboard: true,
            tabBarStyle: {
                position: 'absolute',
                backgroundColor: BG_VIEW,
                borderTopRightRadius:22,
                borderTopLeftRadius:22,
                justifyContent:'center',
                alignContent:'center',
                ...Platform.select({
                  ios: {
                    height: width > 400 ? 80 : 80,
                  },
                  android: {
                    height: width > 400 ? 70 : 60,
                  },
                }),
              },     
        }
        
        }>
          <TabStack.Screen
              name='Home'
              component={Home}
              options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <View style={[ styles.icoContainer1, {
                    backgroundColor: focused ? '#2a6f29' : 'transparent', 
                    shadowColor: focused ? '#48A860' : 'transparent',
                  }]}>
                        <View style={[styles.icoContainer, {shadowColor: {focused} ? '#2a6f29' : 'transparent',shadowOpacity: focused ? 0.5 : 0,backgroundColor: focused ? '#2a6f29' : 'transparent' }]} />
                        <FontAwesomeIcon icon={icon({ name: 'home' })} style={{ color: focused ? BG_VIEW: '#2a6f29' }}  /> 
                      </View>
                ),
              }}
            />
            <TabStack.Screen
            name='Smartpot'
            component={SmartpotNavigator}
            options={{
                headerShown: false,
                tabBarIcon: ({focused}) => (
                  <View style={[ styles.icoContainer1, {
                    backgroundColor: focused ? '#B2D3C2' : 'transparent', 
                    shadowColor: focused ? '#48A860' : 'transparent',
                  }]}>
                         <View style={[styles.icoContainer, {shadowColor: {focused} ? '#2a6f29' : 'transparent',shadowOpacity: focused ? 0.5 : 0,backgroundColor: focused ? '#2a6f29' : 'transparent' }]} />
                        <FontAwesomeIcon icon={icon({ name: 'leaf' })} style={{ color: focused ? BG_VIEW: '#2a6f29' }}  /> 
                      </View>
                    
                ),
            }}
            />
            <TabStack.Screen
            name='Image'
            component={CameraNavigator}
            options={{
                headerShown: false,
                tabBarIcon: ({focused}) => (
                  <View style={[ styles.icoContainer1, {
                    backgroundColor: focused ? '#B2D3C2' : 'transparent', 
                    shadowColor: focused ? '#48A860' : 'transparent',
                  }]}>
                       <View style={[styles.icoContainer, {shadowColor: {focused} ? '#2a6f29' : 'transparent',shadowOpacity: focused ? 0.5 : 0,backgroundColor: focused ? '#2a6f29' : 'transparent' }]} />
                        <FontAwesomeIcon icon={icon({ name: 'expand' })} style={{ color: focused ? BG_VIEW: '#2a6f29' }}  /> 
                      </View>
                    
                ),
            }}
            />
            <TabStack.Screen
            name='CommunityHome'
            component={CommunityHome}
            options={{
                headerShown: false,
                tabBarIcon: ({focused}) => (
                  <View style={[ styles.icoContainer1, {
                    backgroundColor: focused ? '#B2D3C2' : 'transparent', 
                    shadowColor: focused ? '#48A860' : 'transparent',
                  }]}>
                   <View style={[styles.icoContainer, {shadowColor: {focused} ? '#2a6f29' : 'transparent',shadowOpacity: focused ? 0.5 : 0,backgroundColor: focused ? '#2a6f29' : 'transparent' }]} />
                    <FontAwesomeIcon icon={icon({ name: 'user-group' })} style={{ color: focused ? BG_VIEW: '#2a6f29' }}  /> 
                  </View>
                    
                ),
            }}
            />
            <TabStack.Screen
            name='Profile' 
            component={ProfileNavigator}
            options={{
                headerShown: false,
                tabBarIcon: ({focused}) => (
                  <View style={[ styles.icoContainer1, {
                    backgroundColor: focused ? '#B2D3C2' : 'transparent', 
                    shadowColor: focused ? '#48A860' : 'transparent',
                  }]}>
                     <View style={[styles.icoContainer, {shadowColor: {focused} ? '#2a6f29' : 'transparent',shadowOpacity: focused ? 0.5 : 0,backgroundColor: focused ? '#2a6f29' : 'transparent' }]} />
                    <FontAwesomeIcon icon={icon({ name: 'user' })} style={{ color: focused ? BG_VIEW: '#2a6f29' }}  /> 
                  </View>
                ),
            }}/>
    </TabStack.Navigator>
  )
}

export default TabNavigators

const Example = () => {
    return <View/>
}

const { width } = Dimensions.get("window");
const BG_VIEW = "#C1FC49"
const styles = StyleSheet.create({
  icoContainer1: {
    top:20,
    position: 'absolute',
    height: width > 400 ? 38 : 28,
    width: width > 400 ? 60 : 42,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  
  icoContainer: {
   
    position: 'absolute',
    height: '100%',
    width: '100%',
    borderRadius: 20,
    shadowOffset: { width: -3, height: -3 },
    shadowRadius: 3,
    
  },
});