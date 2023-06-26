import { Text, View, ScrollView,Alert, Button,TouchableOpacity,Animated,Keyboard,TouchableWithoutFeedback } from "react-native";
import { SafeAreaView,TextInput } from "react-native";
import React, { useState,useRef,useEffect } from 'react';

import Register from "./Register";
import Login from "./Login";
const Profile = () => {
    const [selectedScreen, setSelectedScreen] = useState(1);


    const handleViewPress = () => {
        Keyboard.dismiss();
    }
        const handleScreenChange = (screenNumber: number) => {
            setSelectedScreen(screenNumber);
          };

    return (
        <SafeAreaView   style={{flex:1}}>
        <TouchableWithoutFeedback onPress={handleViewPress}>
            
        {selectedScreen === 1 ? (
            
            <Register onScreenChange={handleScreenChange}/>

            ) : (

            <Login onScreenChange={handleScreenChange}/>
                 
    )}
          </TouchableWithoutFeedback>
          </SafeAreaView >
   
    )
     
} 

export default Profile;