import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

import Home from '../Screens/Home'
import Profile from '../Screens/Profile'
import Camera from '../Screens/Camera'
import Smartpot from '../Screens/Smartpot';



export type TabsStackParamList = {
    Home: undefined
    Smartpot: undefined
    Image: undefined
    History: undefined
    Profile: undefined
   
}



const TabStack = createBottomTabNavigator<TabsStackParamList>()

const TabNavigators = () => {
  return (
    <TabStack.Navigator
        screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                position: 'absolute',
                backgroundColor: '#ACE1AF',
                borderTopRightRadius:22,
                borderTopLeftRadius:22,
                height: 78,
                
              },
            
        }
        
        }>
          <TabStack.Screen
              name='Home' 
              component={Home}
              options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <View style={{
                        position: 'absolute',
                        height: 40,
                        width: 60,
                        top: '40%',
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: focused ? '#B2D3C2' : 'transparent', 
                        shadowColor: focused ? '#48A860' : 'transparent',
                        shadowOffset: { width: 3, height: 3 },
                        shadowOpacity: 1,
                        shadowRadius: 3,
                      }}>
                        <View style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          height: '100%',
                          width: '100%',
                          borderRadius: 20,
                          shadowColor: focused ? 'white' : 'transparent',
                          shadowOffset: { width: -3, height: -3 },
                          shadowOpacity: focused ? 0.5 : 0, // Adjusted opacity value
                          shadowRadius: 3,
                          backgroundColor: focused ? '#B2D3C2' : 'transparent', 
                        }} />
                        <FontAwesomeIcon icon={icon({ name: 'home' })} style={{ color: focused ? '#7db149ff': '#2a6f29',width:40,height:40 }}  /> 
                      </View>
                ),
              }}
            />
            <TabStack.Screen
            name='Smartpot'
            component={Smartpot}
            options={{
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <View style={{
                        position: 'absolute',
                        height: 40,
                        width: 60,
                        top: '40%',
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: focused ? '#B2D3C2' : 'transparent', 
                        shadowColor: focused ? '#48A860' : 'transparent',
                        shadowOffset: { width: 3, height: 3 },
                        shadowOpacity: 1,
                        shadowRadius: 3,
                      }}>
                        <View style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          height: '100%',
                          width: '100%',
                          borderRadius: 20,
                          shadowColor: focused ? 'white' : 'transparent',
                          shadowOffset: { width: -3, height: -3 },
                          shadowOpacity: focused ? 0.5 : 0, // Adjusted opacity value
                          shadowRadius: 3,
                          backgroundColor: focused ? '#B2D3C2' : 'transparent', 
                        }} />
                        <FontAwesomeIcon icon={icon({ name: 'leaf' })} style={{ color: focused ? '#7db149ff': '#2a6f29',width:40,height:40 }}  /> 
                      </View>
                    
                ),
            }}
            />
            <TabStack.Screen
            name='Image'
            component={Camera}
            options={{
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <View style={{
                        position: 'absolute',
                        width:60,
                        height:60,
                        aspectRatio:1,
                        
                        

                        borderBottomLeftRadius:30,
                        borderBottomRightRadius:30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#000',

                        
                      }}>
                        <View style={{
                          position: 'absolute', 
                          width: 50,
                          aspectRatio:1,
                          marginTop:-32, 
                          borderRadius: 80,
                          backgroundColor: focused ? '#B2D3C2' : '#ACE1AF',
                          shadowColor: focused ? '#48A860' : 'transparent',
                          shadowOffset: { width: 1, height: 1 },
                          shadowOpacity: 1,
                          shadowRadius: 3,
                      
                        }} />
                        <FontAwesomeIcon icon={icon({ name: 'expand' })} style={{ color: focused ? '#7db149ff': '#2a6f29',width:40,height:40 }}  /> 
                      </View>
                    
                ),
            }}
            />
            <TabStack.Screen
            name='History'
            component={Example}
            options={{
                headerShown: false,
                tabBarIcon: ({focused}) => (
                  <View style={{
                    position: 'absolute',
                    height: 40,
                    width: 60,
                    top: '40%',
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: focused ? '#B2D3C2' : 'transparent', 
                    shadowColor: focused ? '#48A860' : 'transparent',
                    shadowOffset: { width: 3, height: 3 },
                    shadowOpacity: 1,
                    shadowRadius: 3,
                  }}>
                    <View style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      width: '100%',
                      borderRadius: 20,
                      shadowColor: focused ? 'white' : 'transparent',
                      shadowOffset: { width: -3, height: -3 },
                      shadowOpacity: focused ? 0.5 : 0, // Adjusted opacity value
                      shadowRadius: 3,
                      backgroundColor: focused ? '#B2D3C2' : 'transparent', 
                    }} />
                    <FontAwesomeIcon icon={icon({ name: 'user-group' })} style={{ color: focused ? '#7db149ff': '#2a6f29',width:40,height:40 }}  /> 
                  </View>
                    
                ),
            }}
            />
            <TabStack.Screen
            name='Profile' 
            component={Profile}
            options={{
                headerShown: false,
                tabBarIcon: ({focused}) => (
                  <View style={{
                    position: 'absolute',
                    height: 40,
                    width: 60,
                    top: '40%',
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: focused ? '#B2D3C2' : 'transparent', 
                    shadowColor: focused ? '#48A860' : 'transparent',
                    shadowOffset: { width: 3, height: 3 },
                    shadowOpacity: 1,
                    shadowRadius: 3,
                  }}>
                    <View style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      width: '100%',
                      borderRadius: 20,
                      shadowColor: focused ? 'white' : 'transparent',
                      shadowOffset: { width: -3, height: -3 },
                      shadowOpacity: focused ? 0.5 : 0, // Adjusted opacity value
                      shadowRadius: 3,
                      backgroundColor: focused ? '#B2D3C2' : 'transparent', 
                    }} />
                    <FontAwesomeIcon icon={icon({ name: 'user' })} style={{ color: focused ? '#7db149ff': '#2a6f29',width:40,height:40 }}  /> 
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