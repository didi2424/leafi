import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { useTheme } from '../Account/ThemeContext'
import { theme, darkTheme } from '../../../../Style/style'
import * as SecureStore from 'expo-secure-store';
import { GetUser, UpdateUser } from '../../../../ClientSideAPI/UserAPI';
type Props = {
  onScreenChange: (screenNumber: number) => void;
};

const AccountInformation = ({ onScreenChange }: Props) => {
  const BackToUserSettings = () => {
    onScreenChange(4)
  }
  const [selectedOption, setSelectedOption] = useState(0);
  const { isDarkMode } = useTheme();
  const selectedTheme = isDarkMode ? darkTheme : theme;
  const { colors} = selectedTheme;

  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<any[]>([]);

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const getStoredToken = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync('authenticationToken');
    
      if (storedToken) {
        // Token is available, set it in the state
        console.log(storedToken)
        setToken(storedToken);
      } else {
        // Handle the case where no token is found
        console.error('No token found in SecureStore.');
      }
    } catch (error) {
      // Handle errors that may occur when accessing SecureStore
      console.error('Error retrieving token from SecureStore:', error);
    }
  };
  
  const getUser = async () => {
    if (token) {
      try {
        const response = await GetUser(token);
        setUserData(response);
        console.log('Received data:', response);
      } catch (error) {
        // Handle different error cases here
        console.error('API call failed');
      }
    } else {
      console.error('Token is null. Cannot fetch user data.');
      // Handle the case where there is no valid token, e.g., display an error message
    }
  };
  
  useEffect(() => {
    // Call getStoredToken when the component mounts
    getStoredToken();
  }, []);
  
  // Trigger getUser whenever the token changes
  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  useEffect(() => {
    // Check if both input fields have values to enable the button
    if (firstname.length > 0 && lastname.length > 0) {
      setIsButtonDisabled(false); // Enable the button
    } else {
      setIsButtonDisabled(true); // Disable the button
    }
  }, [firstname, lastname]);

  const handleFirstnameChange = (text: string) => { // Explicitly specify the type as string
    setFirstname(text);
  };

  const handleLastnameChange = (text: string) => { // Explicitly specify the type as string
    setLastname(text);
  };

  const handleSaveUser = () => {
    console.log('save user')
    UpdateUser(firstname, lastname, token)
    .then((response) => {
      console.log(response);
      setIsButtonDisabled(false)
    })
    .catch((error) => {
      // Handle different error messages
      if (error.response && error.response.status === 401) {
        console.log('unautorized')
      } else if (error.response && error.response.status === 403) {
        console.log('required firstname and lastname')
      } else if (error.message === 'User not found') {
      } else {
        console.error('API call failed:', error);
      }
    });
  }

  const handleDeleteUser = () => {
    console.log('button delete user')
  }

  
  return (
    <View style={{height:height, gap:20, paddingBottom:30}}>
      <View style={styles.headStyle}>
            <TouchableOpacity onPress={BackToUserSettings}>
                <Ionicons name="chevron-back-circle-outline" size={(Dimensions.get('window').width > 400 ? 38 : 30 )} color="#2a6f29" />
            </TouchableOpacity>
              
            <Text style={styles.textStyle}>Account Information</Text>
            
            <View style={{width:20}}>
            </View>
      </View>

      <View style={styles.content1style}>
          <View style={{width:300,height:300,flexDirection:'row',gap:18}}>
              <TouchableOpacity style={{width:120,alignItems:'center',gap:5}} onPress={() => setSelectedOption(0)}>
                <Text style={{fontSize:16,color:colors.textcolor}}>Account Data</Text>
                {selectedOption === 0 ? (
                  <View style={{width:120,height:2,backgroundColor: colors.textcolor}}></View>
                ) : (
                  <View></View>
                )}
                
              </TouchableOpacity>

              <TouchableOpacity style={{width:120,alignItems:'center',gap:5,}} onPress={() => setSelectedOption(1)}>
                <Text style={{fontSize:16,color:colors.textcolor}}>Personal Data</Text>
               {selectedOption === 0 ? (
                  <View></View>
                ) : (
                  <View style={{width:120,height:2,backgroundColor: colors.textcolor}}></View>
                )}
              </TouchableOpacity>
          </View>
      </View>

      {selectedOption === 0 ? (
      <View style={styles.content1style}>
      <View style={{height:300,flexDirection:'column',gap:12}}>
        <Text style={{fontSize:14,color:colors.textcolor}}>Email Address</Text>

        {userData.map((user, index) => (
          <>
            <TextInput defaultValue={user.email} style={{backgroundColor:BG_VIEW, height:40,borderRadius:20,paddingLeft:12}} >
            </TextInput>
          </>
        ))}

        <Text style={{fontSize:14,color:colors.textcolor}}>Password</Text>
        <TextInput style={{backgroundColor:BG_VIEW, height:40,borderRadius:20,paddingLeft:12}}>
        </TextInput>
        <View style={{paddingTop:10}}>
        <Text style={{fontSize:14,color:colors.textcolor}}>Delete account</Text>
        <Text style={{fontSize:14,color:colors.textcolor}}>Your Account will be permanently removed from the application. All your data will be lost.
        </Text>
        </View>

        <TouchableOpacity style={{backgroundColor:BG_VIEW,height:40,alignContent:'center',justifyContent:'center',alignItems:'center',borderRadius:20}} onPress={() => handleDeleteUser()}>
          <Text style={{color:'#2a6f29',fontSize:16}}>Delete Account</Text>
        </TouchableOpacity>

      </View>
      </View>
     
      ) : (
        <View style={styles.content1style}>
        <View style={{height:300,flexDirection:'column',gap:12}}>
              
          {userData.map((user, index) => (
              <View key={index} style={{gap:10}}>
                <Text style={{ fontSize: 14, color: colors.textcolor }}>First Name</Text>
                <TextInput
                  defaultValue={user.firstname}
                  onChangeText={(text) => handleFirstnameChange(text)}
                  style={{ backgroundColor: BG_VIEW, height: 40, borderRadius: 20, paddingLeft: 12 }}
                />

                <Text style={{ fontSize: 14, color: colors.textcolor }}>Last Name</Text>
                <TextInput 
                  defaultValue={user.lastname}
                  onChangeText={(text) => handleLastnameChange(text)}
                  style={{ backgroundColor: BG_VIEW, height: 40, borderRadius: 20, paddingLeft: 12 }}
                />
              </View>
            ))}
                <View style={{height:40,borderRadius:20,justifyContent:'center',alignItems:'center'}}>
              <TouchableOpacity style={{height:40,width:120,backgroundColor: BG_VIEW,borderRadius:20,justifyContent:'center',alignItems:'center'}} onPress={ ()=> handleSaveUser()} disabled={isButtonDisabled}>
                <Text style={{fontSize:16,color:'#2a6f29'}}>Save</Text>
              </TouchableOpacity>
              </View>
              
        </View>
      </View>
      )}
      
      
    </View>
  )
}

export default AccountInformation

const {height } = Dimensions.get("window");
const BG_VIEW = "#C1FC49"
const styles = StyleSheet.create({
  headStyle: {
    height:height/6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: BG_VIEW,
    paddingTop: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 24,
  },
  content1style: {
    height:20,
    marginHorizontal: 18,
    gap: 12,
  },
  content2style: {
    height:300,
    marginHorizontal: 18,
    gap: 12,
  },
  textStyle:{
    fontSize:20,
    fontWeight:'600'
  }
})