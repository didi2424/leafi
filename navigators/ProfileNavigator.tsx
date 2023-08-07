import { Keyboard,TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native";
import React, { useState} from 'react';

import Register from "../Screens/Profile/Register";
import Login from "../Screens/Profile/Login";
import Vertify from "../Screens/Profile/Vertify";

import UserProfile from "../Screens/Profile/UserProfile";
import UserSettings from "../Screens/Profile/UserSettings";

import AccountInformation from "../Screens/Profile/Settings/AccountInformation";
import AddressInfromation from "../Screens/Profile/Settings/AddressInfromation";
import Appereance from "../Screens/Profile/Settings/Appereance";
type RegistrationData = {
    name: string;
    email: string;
  };
  type Props = {
    onScreenChanges: (screenNumber: number) => void;
  };
  
const ProfileNavigator = ({ onScreenChanges  }: Props) => {
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
        <View>
        <TouchableWithoutFeedback onPress={handleViewPress}>
            
        {selectedScreen === 0 ? (
            <UserProfile onScreenChange={handleScreenChange}/> 
        ) : selectedScreen === 1 ? (
            <Register onScreenChange={handleScreenChange} onRegisterData={handleRegisterData} />
        ) : selectedScreen === 2 ? (
            <Login onScreenChange={handleScreenChange} onRegisterData={handleRegisterData} />
        ) : selectedScreen === 3 ? (
            <Vertify registerData={registerData} onScreenChange={handleScreenChange} />
        ) : selectedScreen === 4 ? (
            <UserSettings  onScreenChange={handleScreenChange}/>
        ) : selectedScreen === 5 ? (
            <AccountInformation  onScreenChange={handleScreenChange}/>
        ) : selectedScreen === 6 ? (
            <AddressInfromation  onScreenChange={handleScreenChange}/>
        ) : selectedScreen === 7 ? (
            <Appereance  onScreenChange={handleScreenChange}/>
        ) : null}

        </TouchableWithoutFeedback>
        </View >
  
    )
     
} 

export default ProfileNavigator;