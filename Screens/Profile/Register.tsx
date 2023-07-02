import { Alert, Animated, StyleSheet, Text, TextInput, TouchableOpacity, Keyboard,View,TouchableWithoutFeedback } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import api from '../../api';

type Props = {
    onScreenChange: (screenNumber: number) => void;
    onRegisterData: (data: any) => void;
  };

const Register = ({ onScreenChange, onRegisterData  }: Props) => {
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');

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
        } else if (passwordPattern.test(password)) {
            setFillPasswordEmpty(false);
            setFillPassword(false);
        } 
        if (emailPattern.test(email) && passwordPattern.test(password)) {
            setFillEmailEmpty(false);
            setFillEmail(false);
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
        const targetValue = isMoved ? 0 : -380;
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

    <View style={{flex: 1,marginHorizontal:2,justifyContent:"center",alignItems:'center',alignContent:'center'}}>
        
            <Animated.View style={[{justifyContent:'center',alignItems:'center',opacity: fadeAnim}, animatedStyle]}>
            <View style={{top:-40,height:250,width:160,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',alignContent:'center',borderRadius:20}}>
                    <Text>Register</Text>
            </View>
         
            <Animated.View
            style={{
                opacity: fadeAnim,
                top:68
            }}>
                <Text style={{fontSize:18,fontWeight:'400'}}>Unlock the Power of AI: Explore 100+ Plants for Free!</Text>
                <Text style={{top:12,fontSize:50,fontWeight:'600'}}>Create</Text>
                <Text style={{top:2,fontSize:50,fontWeight:'600'}}>Your Account</Text>
                <View style={{top:2,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
                    <Text style={{fontSize:20,fontWeight:'400'}}>
                        Already a member ?
                    </Text>
                    <TouchableOpacity  onPress={() => handlePressCombined()} >
                        <Text style={{fontSize:20,color:'#2a6f29'}}> Log in</Text>
                    </TouchableOpacity>
                </View>


                {isTextInputVisible && (

                <View style={{top:20,justifyContent:'center',alignItems:'center'}}>
                
                <View style={{height:68}}>
                <View style={{width:220,height:42,backgroundColor:'#fff',borderRadius:16,alignItems:'center',alignContent:"center",justifyContent:'center'}}>
                    <TextInput
                    style={{left:10,width:220,height:42}}
                    autoFocus={true}
                    onChangeText={onChangeEmail}
                    placeholder="Email"
                    placeholderTextColor="#999999"
                    autoCapitalize='none'
                    />
                </View>
                {fillEmailEmpty && (
                    <Text style={{ top: 5 }}>You must fill this</Text>
                        )}
                {fillEmail && (
                    <Text style={{ top: 5 }}>Email pattern failed</Text>
                )}
                {emailHasRegistered && (
                    <Text style={{ top: 5 }}>Email has register!</Text>
                )}
                </View>
              
                <View style={{justifyContent:'flex-start',width:220}}>
                <View style={{paddingHorizontal:12,flexDirection:'row',width:220,height:42,backgroundColor:'#fff',borderRadius:16,alignContent:"center",justifyContent:'space-between',alignItems:'center',gap:12}}>
                     <TextInput
                        style={{width:120,height:38}}
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
                        <Text style={{ top: 5 }}>You must fill this</Text>
                        )}
                        {fillPassword && (
                        <Text style={{ top: 5 }}>At least 6 characters, with 1 capital letter and 1 symbol</Text>
                        )}
                    </View>
                    </View>
                    <View style={{top:12,width:32,aspectRatio:1,backgroundColor:'#000',borderRadius:16,alignItems:'center',alignContent:"center",justifyContent:'center'}}>
                        <TouchableOpacity onPress={handleHideForm} > 
                        <FontAwesomeIcon icon={icon({ name: 'xmark' })} style={{ color: '#7db149ff',width:32,height:32 }}  /> 
                        </TouchableOpacity>
                        </View>
                
                </View>
                
                )}
               
                
                </Animated.View>
                <Animated.View style={{top:110,width:120,height:40,borderRadius:18,backgroundColor:'#fff',alignItems:'center',alignContent:'center',justifyContent:'center', opacity: fadeAnim,}}>
                {selectedRegisterButton === 1 ? (
                    <>
                    <TouchableOpacity onPress={() => handleButtonRegisterButton()} >
                            <Text style={{fontSize:22,color:'#2a6f29'}}>Coutinue</Text>
                    </TouchableOpacity>
                    </>
                    ) : (
                    <>
                    <TouchableOpacity onPress={handleRegisters}  >
                            <Text style={{fontSize:22,color:'#2a6f29'}}>Register</Text>
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

