import { Alert, Animated, StyleSheet, Text, TextInput, TouchableOpacity, Keyboard,View,TouchableWithoutFeedback, Dimensions, Platform } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import api from '../../api';
import { useTheme } from '../Profile/Settings/Account/ThemeContext';

type Props = {
    onScreenChange: (screenNumber: number) => void;
    onRegisterData: (data: any) => void;
  };

const Register = ({ onScreenChange, onRegisterData  }: Props) => {
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const { isDarkMode } = useTheme();

    const [fillEmail, setFillEmail] = useState(false);
    const [fillEmailEmpty, setFillEmailEmpty] = useState(false);
    const [emailHasRegistered, setEmailHasRegisterd] = useState(false)

    const [fillPassword, setFillPassword] = useState(false);
    const [fillPasswordEmpty, setFillPasswordEmpty] = useState(false);


    const handleViewPress = () => {
        Keyboard.dismiss();
    }
   
    const handleRegisters = () => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
        const payload = {
            email,
            password
        };
        if (email === '') {
            setFillEmailEmpty(true);
            setFillEmail(false);
        } else if (!emailPattern.test(email)) {
            setFillEmailEmpty(false);
            setFillEmail(true);
        } else if (emailPattern.test(email)) {
            setFillEmailEmpty(false);
            setFillEmail(false);
            } 
        if (password === '') {
            setFillPasswordEmpty(true);
            setFillPassword(false);
        } else if (!passwordPattern.test(password)) {
            setFillPasswordEmpty(false);
            setFillPassword(true);
            console.log('password pattern wrong')
        } else if (passwordPattern.test(password)) {
            setFillPasswordEmpty(false);
            setFillPassword(false);
        } 
        if (emailPattern.test(email) && passwordPattern.test(password)) {
            setFillEmailEmpty(false);
            setFillEmail(false);
            console.log('post!')
            api.post('/register', payload)
                .then(response => {
                console.log(response.data);
                if (response.status === 200)
                setEmailHasRegisterd(false)

                const payload2 = {
                    email
                }

                api.post('/otp/send', payload2)
                    .then(response => {
                        if (response.status === 200)
                        console.log('otp send')
                    })
                const registerData = {
                        email,
                        password,
                      };
                    onRegisterData(registerData);
                })
                
                .catch(error => {
                if (error.response && error.response.status === 409) {
                    console.log('email registered')
                    setEmailHasRegisterd(true)
                } 
               
                });
            return
        }
            
      };

    const [isMoved, setIsMoved] = useState(false);
    const moveAnim = useRef(new Animated.Value(0)).current;
    const [isTextInputVisible, setIsTextInputVisible] = useState(false);
    const [selectedRegisterButton, setRegisterButton] = useState(1);
    const [isVertivyVisible, setIsVertivyVisible] = useState(true);

    const startAnimation = () => {
        const targetValue = isMoved ? 0 : width> 400 ? -320:-200;
        Animated.timing(moveAnim, {
        toValue: targetValue,
        duration: 800,
        useNativeDriver: true,
        }).start();
        setIsMoved(!isMoved); 
    };

    const animatedStyle = {
        transform: [{ translateY: moveAnim }],
    };

    const handlePressCombined = () => {
        console.log('press login')
        fadeIn()
        setTimeout(() => {
            onScreenChange(2)
            }, 2000);
        
        };
    const handleButtonRegisterButton = () => {
        setRegisterButton(0);
        startAnimation();
        setIsTextInputVisible(true)
      };

    const fadeAnim = useRef(new Animated.Value(0)).current;
    
    const fadeOut = () => {
        Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
        }).start();
    };
    fadeOut()
    const fadeIn = () => {
        Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
        }).start();
    };
    
    const handleHideForm = () => {
        console.log('close')
        startAnimation();
        setIsTextInputVisible(false)
        setRegisterButton(1);
        handleViewPress();
        setFillEmail(false);
        setFillEmailEmpty(false);
        setFillPassword(false)
        setFillPasswordEmpty(false)
        
    }

    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const togglePasswordVisibility = () => {
        setSecureTextEntry(!secureTextEntry);
        };


  return (
    <>
    {isVertivyVisible && ( 
    <View style={{height:height,marginHorizontal:2,justifyContent:"center",alignItems:'center',alignContent:'center'}}>
            <Animated.View style={[{justifyContent:'center',alignItems:'center',opacity: fadeAnim}, animatedStyle]}>
            <View style={styles.cardContainer}>
                    <Text style={{color: isDarkMode ? 'black' : 'white'}}>Register</Text>
            </View>
         
            <Animated.View
            style={{
                opacity: fadeAnim,
                top:68
            }}>
                <Text style={[styles.textStyle1,{color: isDarkMode ? 'white' : 'black' }]}>Unlock the Power of AI: Explore 100+ Plants for Free!</Text>
                <Text style={[styles.textStyle2,{color: isDarkMode ? 'white' : 'black' }]}>Create</Text>
                <Text style={[styles.textStyle3,{color: isDarkMode ? 'white' : 'black' }]}>Your Account</Text>
                <View style={{top:2,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
                    <Text style={[styles.textStyle4,{color: isDarkMode ? 'white' : 'black' }]}>
                        Already a member ?
                    </Text>
                    <TouchableOpacity  onPress={() => handlePressCombined()}  >
                        <Text style={styles.textStyle5}> Log in</Text>
                    </TouchableOpacity>
                </View>
                {isTextInputVisible && (
                <View style={{top:20,justifyContent:'center',alignItems:'center'}}>
                
                <View style={{height: width> 400 ? 72: 56}}>
                <View style={styles.textInputEmailContainer}>
                    <TextInput
                        style={styles.textStyle6}
                        autoFocus={true}
                        onChangeText={onChangeEmail}
                        placeholder="Email"
                        placeholderTextColor="#999999"
                        autoCapitalize='none'
                    />
                </View>
                {fillEmailEmpty && (
                    <Text style={[styles.textStyle7,{color: isDarkMode ? 'white' : 'black' }]}>You must fill this</Text>
                        )}
                {fillEmail && (
                    <Text style={[styles.textStyle7,{color: isDarkMode ? 'white' : 'black' }]}>Email pattern failed</Text>
                )}
                {emailHasRegistered && (
                    <Text style={[styles.textStyle7,{color: isDarkMode ? 'white' : 'black' }]}>Email has register!</Text>
                )}
                </View>
              
                
                <View style={styles.textInputPasswordContainer}>
                     <TextInput
                        style={styles.textStyle6}
                        onChangeText={onChangePassword}
                        placeholder="Password"
                        placeholderTextColor="#999999"
                        secureTextEntry={secureTextEntry} 
                        />
                    <TouchableOpacity style={{width:28,height:48,alignItems:'center',alignContent:"center",justifyContent:'center' }} onPress={togglePasswordVisibility}> 
                    {secureTextEntry === true ? (
                        <FontAwesomeIcon icon={icon({ name: 'eye' })} style={{ color: '#7db149ff',width:28,height:28 }}  /> 
                        ) : (
                        <FontAwesomeIcon icon={icon({ name: 'eye-slash' })} style={{ color: '#7db149ff',width:28,height:28 }}  /> 
                        )}
                        </TouchableOpacity>
                     </View>

                    <View style={{marginHorizontal:2}}>
                     {fillPasswordEmpty && (
                        <Text style={[styles.textStyle7,{color: isDarkMode ? 'white' : 'black' }]}>You must fill this</Text>
                        )}
                        {fillPassword && (
                        <Text style={[styles.textStyle7,{color: isDarkMode ? 'white' : 'black' }]}>At least 6 characters, with 1 capital letter and 1 symbol</Text>
                        )}
                    </View>
                   
                    <View style={{top:12,width: width> 400 ? 32:22,aspectRatio:1,backgroundColor: isDarkMode ? '#FFF' :'#000',borderRadius:16,alignItems:'center',alignContent:"center",justifyContent:'center'}}>
                        <TouchableOpacity onPress={handleHideForm} > 
                            <FontAwesomeIcon icon={icon({ name: 'xmark' })} size={width> 400 ? 24: 14}  style={{ color: '#7db149ff'}}  /> 
                        </TouchableOpacity>
                        </View>
                </View>
                
                )}
               
                
                </Animated.View>
                <Animated.View style={[styles.buttonHandle, { opacity: fadeAnim }]}>
                {selectedRegisterButton === 1 ? (
                    <>
                    <TouchableOpacity onPress={() => handleButtonRegisterButton()} >
                            <Text style={styles.textStyle4}>Coutinue</Text>
                    </TouchableOpacity>
                    </>
                    ) : (
                    <>
                    <TouchableOpacity onPress={handleRegisters}  >
                            <Text style={styles.textStyle4}>Register</Text>
                    </TouchableOpacity>
                    </>
                )}
                </Animated.View>
                </Animated.View>

            </View>
            )}
            </>
    ) 
}

export default Register

const { width,height } = Dimensions.get("window");
const styles = StyleSheet.create({

  cardContainer: {
    top: -40,
    height: width > 400 ? 250 : 180,
    width: width > 400 ? 160 : 120,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 20,
  },
 
  buttonHandle: {
    top: width > 400 ? 110 : 110,
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
    height:40,
    width:120
  },
  textStyle7: {
    top: width > 400 ? 5 : 3,
    fontSize: width > 400 ? 14 : 10,
    fontWeight: "400",
  },
});