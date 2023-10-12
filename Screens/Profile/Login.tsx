import { Alert, Animated, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useTheme } from '../Profile/Settings/Account/ThemeContext';
import * as SecureStore from 'expo-secure-store';

import api, { SendOTP } from '../../ClientSideAPI/api'; 
type Props = {
    onScreenChange: (screenNumber: number) => void;
    onRegisterData: (data: any) => void;
  };
const Login = ({ onScreenChange, onRegisterData }: Props) => {
    const { isDarkMode } = useTheme();
    const [password, onChangePassword] = useState('');
    const [email, onChangeEmail] = useState('');
    const [isTextInputVisibleLogin, setIsTextInputVisibleLogin] = useState(false);
    const [selectedLoginButton, setLoginButton] = useState(1);
    const [isMovedLogin, setIsMovedLogin] = useState(false);
    const moveAnimLogin = useRef(new Animated.Value(0)).current;
   
    const handleViewPress = () => {
        Keyboard.dismiss();
    }
    
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const togglePasswordVisibility = () => {
        setSecureTextEntry(!secureTextEntry);
        };
    const animatedStyleLogin = {
        transform: [{ translateY: moveAnimLogin }],
    };

    const startAnimationLogin = () => {
        const targetValue = isMovedLogin ? 0 : width> 400 ? -300:-200;
        Animated.timing(moveAnimLogin, {
        toValue: targetValue,
        duration: 1000,
        useNativeDriver: true,
        }).start();
        setIsMovedLogin(!isMovedLogin); 
    };
   
    const handleLogin = () => {
      const payload = {
        email,
        password,
      };
      const registerData = {
        email,
      };
    
      api.post('/Auth/login', payload)
        .then(async (response) => {
          console.log(response.data);
          const { token } = response.data;
    
          if (token) {
            // Store the token securely
            await SecureStore.setItemAsync('authenticationToken', token);
            onScreenChange(0)
          } else {
            console.error('No token found in the response.');
            // Handle the case where no token is returned, e.g., show an error message
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            Alert.alert('Error', 'email or Password cannot be found');
          } else if (error.response && error.response.status === 402) {
            Alert.alert(
              'Error',
              'Account Found but not Activated',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Send OTP',
                  onPress: () => {
                    SendOTP(email)
                      .then((response) => {
                        console.log(response);
                        onRegisterData(registerData);
                      })
                      .catch((error) => {
                        if (error.message === 'OTP request limit exceeded. Please wait for the reset time') {
                          // Handle this case if needed
                        } else {
                          console.error('API call failed:', error);
                        }
                      });
                  },
                },
              ],
              { cancelable: true }
            );
          } else {
            console.error(error);
          }
        });
    };
        const fadeAnim = useRef(new Animated.Value(0)).current;
        const fadeIn = () => {
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 2000,
              useNativeDriver: true,
            }).start();
          };
        const fadeOut = () => {
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 2000,
              useNativeDriver: true,
            }).start();
          };
        fadeOut()
        const handlePressCombined = () => {
            console.log('press register')
            
            fadeIn()
            setTimeout(() => {
                onScreenChange(1)
                }, 2000);
        };

        const handleButtonRegisterButton = () => {
            
            startAnimationLogin();
            setLoginButton(0)
            setIsTextInputVisibleLogin(true)
        
            };
         
        const handleHideForm = () => {
            console.log('close')
            setIsTextInputVisibleLogin(false)
            setLoginButton(1)
            startAnimationLogin()
            handleViewPress()
            
        }
        
        const ForgotPass = () => {
          console.log('forgot password')
        }
  return (
    
    <Animated.View style={{height:height,marginHorizontal:2,alignContent:"center",justifyContent:"center",alignItems:'center'}}>
                        
            <Animated.View style={[{justifyContent:'center',alignItems:'center',opacity: fadeAnim,},animatedStyleLogin]} >

            <View style={styles.cardContainer}>
                    <Text style={{color: isDarkMode ? 'black' : 'white'}}>Login</Text>
            </View>
        
            <Animated.View
            style={{
                opacity: fadeAnim,
                top:68
            }}>
                <Text style={[styles.textStyle1,{color: isDarkMode ? 'white' : 'black' }]}>Unlock the Power of AI: Explore 100+ Plants for Free!</Text>
                <Text style={[styles.textStyle2,{color: isDarkMode ? 'white' : 'black' }]}>Didn't</Text>
                <Text style={[styles.textStyle3, { top: 2,color: isDarkMode ? 'white' : 'black'  }]}>Have Account ?</Text>
                    <View style={{top:2,flexDirection:'row',alignItems:'center',alignContent:'center',gap:10}}>
                        <Text style={[styles.textStyle4,{color: isDarkMode ? 'white' : 'black' }]}>
                            Register Now! It's Free!
                        </Text>
                        <TouchableOpacity onPress={handlePressCombined}  >
                            <Text style={styles.textStyle5}>Register</Text>
                        </TouchableOpacity>
                    </View>   

            {isTextInputVisibleLogin && (
            <>
            <Animated.View style={{
                flexDirection:"column",
                justifyContent:"space-between",
                alignContent:'center',
                alignItems:'center',
                marginTop:20,
                gap:12,
                backgroundColor:'#0000'}}>

            <View style={styles.textInputEmailContainer}>
            <TextInput
            style={styles.textStyle6}
                onChangeText={onChangeEmail}
                placeholder="email"
                autoFocus={true}
                placeholderTextColor="#999999"
                autoCapitalize='none'
            />
            </View>
            <View style={styles.textInputPasswordContainer}>
                     <TextInput
                        style={styles.textStyle6}
                        onChangeText={onChangePassword}
                        placeholder="Password"
                        placeholderTextColor="#999999"
                        secureTextEntry={secureTextEntry}
                        autoCapitalize='none'
                        />
                    <TouchableOpacity style={{width:28,height:48,alignItems:'center',alignContent:"center",justifyContent:'center' }} onPress={togglePasswordVisibility}> 
                    {secureTextEntry === true ? (
                        <FontAwesomeIcon icon={icon({ name: 'eye' })} style={{ color: '#7db149ff',width:28,height:28 }}  /> 
                        ) : (
                        <FontAwesomeIcon icon={icon({ name: 'eye-slash' })} style={{ color: '#7db149ff',width:28,height:28 }}  /> 
                        )}
                        </TouchableOpacity>
                     </View>
            <TouchableOpacity style={{width:180,height:18,left:0,alignItems:'flex-start',alignContent:'flex-start',justifyContent:'center'}} onPress={ForgotPass}>
                <Text style={{color: isDarkMode ? 'white' : 'black' }}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{bottom:0,width: width> 400 ? 32:28,aspectRatio:1,backgroundColor: isDarkMode ? '#FFF' : '#000',borderRadius:50,alignItems:'center',alignContent:"center",justifyContent:'center'}} onPress={handleHideForm}>
                <FontAwesomeIcon icon={icon({ name: 'xmark' })} size={width> 400 ? 24: 14}  style={{ color: '#7db149ff'}}  /> 
            </TouchableOpacity>

            </Animated.View>
            </>
            )}
            </Animated.View>
            <Animated.View style={[styles.buttonHandle, { opacity: fadeAnim }]}>
                {selectedLoginButton === 1 ? (
                    <>
                    <TouchableOpacity onPress={handleButtonRegisterButton} >
                            <Text style={styles.textStyle4}>Coutinue</Text>
                    </TouchableOpacity>
                    </>
                    ) : (
                    <>
                    <TouchableOpacity onPress={handleLogin}  >
                            <Text style={styles.textStyle4}>Login</Text>
                    </TouchableOpacity>
                    </>
                )}
            </Animated.View>
            </Animated.View>
    </Animated.View>
  )
}

export default Login
const { width,height } = Dimensions.get("window");
const styles = StyleSheet.create({
  
  cardContainer: {
    top:-40,
    height: width > 400 ? 250 : 180,
    width: width > 400 ? 160 : 120,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 20,
  },
 
  buttonHandle: {
    top: width > 400 ? 90 : 80,
    width: width > 400 ? 120 : 90,
    height: width > 400 ? 40 : 28,
    borderRadius: 18,
    backgroundColor: "#fff",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  textInputEmailContainer: {
    width: width > 400 ? 220 : 180,
    height: width > 400 ? 42 : 34,
    backgroundColor: "#fff",
    borderRadius: width > 400 ? 16 : 12,
    alignItems: "flex-start",
    paddingLeft: width > 400 ? 16 : 12,
    justifyContent: "center",
  },
  textInputPasswordContainer: {
    paddingHorizontal: 12,
    paddingLeft: width > 400 ? 16 : 12,
    flexDirection: "row",
    width: width > 400 ? 220 : 180,
    height: width > 400 ? 42 : 34,
    backgroundColor: "#fff",
    borderRadius: width > 400 ? 16 : 12,
    alignContent: "center",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },

  textStyle1: {
    fontSize: width > 400 ? 18 : 14,
    fontWeight: "400",
  },
  textStyle2: {
    top: 12,
    fontSize: width > 400 ? 50 : 32,
    fontWeight: "600",
  },
  textStyle3: {
    top: 2,
    fontSize: width > 400 ? 50 : 32,
    fontWeight: "600",
  },
  textStyle4: {
    fontSize: width > 400 ? 20 : 16,
    fontWeight: "400",
  },
  textStyle5: {
    fontSize: width > 400 ? 20 : 16,
    color: "#2a6f29",
  },
  textStyle6: {
    fontSize: width > 400 ? 14 : 10,
    fontWeight: "400",
    width:120,
    height:40
  },
  textStyle7: {
    top: width > 400 ? 5 : 3,
    fontSize: width > 400 ? 14 : 10,
    fontWeight: "400",
  },
});