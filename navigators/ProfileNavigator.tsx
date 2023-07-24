import { Keyboard,TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native";
import React, { useState} from 'react';

import Register from "../Screens/Profile/Register";
import Login from "../Screens/Profile/Login";
import Vertify from "../Screens/Profile/Vertify";
import UserProfile from "../Screens/Profile/UserProfile";

type RegistrationData = {
    name: string;
    email: string;
  };

  
const ProfileNavigator = () => {
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
            setSelectedScreen(3);
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

export default ProfileNavigator;