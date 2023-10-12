import { Keyboard,TouchableWithoutFeedback, View } from "react-native";
import React, { useEffect, useState} from 'react';

import Register from "../Screens/Profile/Register";
import Login from "../Screens/Profile/Login";
import Vertify from "../Screens/Profile/Vertify";

import UserProfile from "../Screens/Profile/UserProfile";
import UserSettings from "../Screens/Profile/UserSettings";

import AccountInformation from "../Screens/Profile/Settings/Account/AccountInformation";
import AddressInfromation from "../Screens/Profile/Settings/Account/AddressInfromation";
import Appereance from "../Screens/Profile/Settings/Account/Appereance";
import Notification from "../Screens/Profile/Settings/Account/Notification";
import { useTheme } from "../Screens/Profile/Settings/Account/ThemeContext";
import * as SecureStore from 'expo-secure-store';

type RegistrationData = {
    name: string;
    email: string;
  };
  type Props = {
    onScreenChanges: (screenNumber: number) => void;
  };
  
const ProfileNavigator = ({ onScreenChanges  }: Props) => {
    const { isDarkMode } = useTheme();
    const [selectedScreen, setSelectedScreen] = useState(2);
    const getStoredToken = async () => {
        try {
          const storedToken = await SecureStore.getItemAsync('authenticationToken');
    
          if (storedToken) {
            // Token is available, you can use it
            setSelectedScreen(0); // Set selectedScreen to 0 when token is found
          } else {
            // Handle the case where no token is found
            setSelectedScreen(2);
            // You may want to redirect to a login screen or handle the absence of a token.
          }
        } catch (error) {
          // Handle errors that may occur when accessing SecureStore
          console.error('Error retrieving token from SecureStore:', error);
          // Handle the error, e.g., navigate to a login screen
        }
      };
    
    useEffect(() => {
    // Call getStoredToken when the component mounts
    getStoredToken();
    }, []);

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
        <View style={{ backgroundColor: isDarkMode ? '#3d3c3fff' : '#eeeeee'}}>
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
        ) : selectedScreen === 8 ? (
            <Notification  onScreenChange={handleScreenChange}/>
        ) : null}

        </TouchableWithoutFeedback>
        </View >
  
    )
     
} 

export default ProfileNavigator;