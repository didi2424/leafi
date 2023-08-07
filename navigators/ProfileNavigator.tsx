import { Keyboard,TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native";
import React, { useState} from 'react';

import Register from "../Screens/Profile/Register";
import Login from "../Screens/Profile/Login";
import Vertify from "../Screens/Profile/Vertify";
import UserProfile from "../Screens/Profile/UserProfile";
import UserSettings from "../Screens/Profile/UserSettings";
type RegistrationData = {
    name: string;
    email: string;
  };

  
const ProfileNavigator = () => {
    const [selectedScreen, setSelectedScreen] = useState(4);
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
            <UserProfile onScreenChange={handleScreenChange}/> 
        ) : selectedScreen === 1 ? (
            <Register onScreenChange={handleScreenChange} onRegisterData={handleRegisterData} />
            ) : selectedScreen === 2 ? (
            <Login onScreenChange={handleScreenChange} onRegisterData={handleRegisterData} />
            ) : selectedScreen === 3 ? (
            <Vertify registerData={registerData} onScreenChange={handleScreenChange} />
            ) :  selectedScreen === 4 ? (
            <UserSettings  onScreenChange={handleScreenChange} />
              ) : null}
          </TouchableWithoutFeedback>
          </SafeAreaView >
   
    )
     
} 

export default ProfileNavigator;