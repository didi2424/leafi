import { Text, View, ScrollView,Alert, Button,TouchableOpacity,Animated,Keyboard,TouchableWithoutFeedback } from "react-native";
import { SafeAreaView,TextInput } from "react-native";
import React, { useState,useRef,useEffect } from 'react';

import Register from "./Register";
import Login from "./Login";
import Vertify from "./Vertify";
import UserProfile from "./UserProfile";

type RegistrationData = {
    // Specify the properties and their types for registration data
    name: string;
    email: string;
    // Add other necessary properties
  };

  
const Profile = () => {
    const [selectedScreen, setSelectedScreen] = useState(0);
    const [registerData, setRegisterData] = useState<RegistrationData | null>(null);
    const handleViewPress = () => {
        Keyboard.dismiss();
    }
        const handleScreenChange = (screenNumber: number) => {
            setSelectedScreen(screenNumber);
          };


          const handleRegisterData = (data: RegistrationData) => {
            setRegisterData(data);
            setSelectedScreen(3); // Switch to the Verify screen after receiving the data
          };

    return (
        <SafeAreaView   style={{flex:1}}>
        <TouchableWithoutFeedback onPress={handleViewPress}>
            
        {selectedScreen === 0 ? (
            <UserProfile /> 
        ) : selectedScreen === 1 ? (
            <Register onScreenChange={handleScreenChange} onRegisterData={handleRegisterData} />
            ) : selectedScreen === 2 ? (
            <Login onScreenChange={handleScreenChange} onRegisterData={handleRegisterData} />
            ) : selectedScreen === 3 ? (
            <Vertify registerData={registerData} onScreenChange={handleScreenChange} />
            ) : null}
          </TouchableWithoutFeedback>
          </SafeAreaView >
   
    )
     
} 

export default Profile;