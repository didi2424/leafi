import { Alert, Animated, StyleSheet, Text, TextInput, TouchableOpacity, Keyboard,View,TouchableWithoutFeedback } from 'react-native'
import React, { useRef, useState } from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

type Props = {
    onScreenChange: (screenNumber: number) => void;
  };

const Register = ({ onScreenChange }: Props) => {
    const [namefirst, onChangeNameFirst] = useState('');
    const [namelast, onChangeNameLast] = useState('');
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [username, onChangeUsername] = useState('');
    const handleViewPress = () => {
        Keyboard.dismiss();
    }


    const handleRegisters = () => {

        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        
        if (!emailPattern.test(email) || namefirst === '' || namelast === '' || username === '' || email === '' || password === '') {
            if (!emailPattern.test(email)) {
                Alert.alert('Invalid Email', 'Please enter a valid email address.');
            }
            else {
                Alert.alert('Error', 'All fields are required.');
            }
            return;
            }
        const name = namefirst + ' ' + namelast
        const payload = {
            name,
            username,
            email,
            password,
        };
        
        axios.post('http://192.168.1.2:3000/users', payload)
            .then(response => {
            console.log(response.data);
            })
            .catch(error => {
            if (error.response && error.response.status === 409) {
                Alert.alert('Error', 'Username is already registered.');
            } else {
                console.error(error);
                
            }
            });
        };

    const [isMoved, setIsMoved] = useState(false);
    const moveAnim = useRef(new Animated.Value(0)).current;
    
    
    const [isTextInputVisible, setIsTextInputVisible] = useState(false);
    const [selectedRegisterButton, setRegisterButton] = useState(1);
    
    

    const startAnimation = () => {
        const targetValue = isMoved ? 0 : -220;
        Animated.timing(moveAnim, {
        toValue: targetValue,
        duration: 2000,
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
        
    }

    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const togglePasswordVisibility = () => {
        setSecureTextEntry(!secureTextEntry);
        };


  return (
    <TouchableWithoutFeedback onPress={handleViewPress}>
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
                <View style={{gap:12}}>
                <Animated.View style={{
                    flexDirection:"row",
                    justifyContent:"space-between",
                    marginTop:20,
                    gap:12,
                    backgroundColor:'#0000'}}>
                <View style={{width:180,height:42,backgroundColor:'#fff',borderRadius:16,alignItems:'center',alignContent:"center",justifyContent:'center'}}>
                <TextInput
                    style={{left:10,width:170,height:42}}
                    onChangeText={onChangeNameFirst}
                    placeholder="First Name"
                    placeholderTextColor="#909090"
                    />
                </View>
                <View style={{width:180,height:42,backgroundColor:'#fff',borderRadius:16,alignItems:'center',alignContent:"center",justifyContent:'center'}}>
                    <TextInput
                    style={{left:10,width:170,height:42}}
                    onChangeText={onChangeNameLast}
                    placeholder="Last Name"
                    placeholderTextColor="#999999"
                    />
                </View>

                </Animated.View >

                <View style={{width:180,height:42,backgroundColor:'#fff',borderRadius:16,alignItems:'center',alignContent:"center",justifyContent:'center'}}>
                    <TextInput
                    style={{left:10,width:170,height:42}}
                    onChangeText={onChangeUsername}
                    placeholder="Username"
                    placeholderTextColor="#999999"
                    />
                    </View>
                <View style={{width:180,height:42,backgroundColor:'#fff',borderRadius:16,alignItems:'center',alignContent:"center",justifyContent:'center'}}>
                    <TextInput
                    style={{left:10,width:170,height:42}}
                    onChangeText={onChangeEmail}
                    placeholder="Email"
                    placeholderTextColor="#999999"
                    />
                    </View>
                    
                <View style={{paddingHorizontal:12,flexDirection:'row',width:180,height:42,backgroundColor:'#fff',borderRadius:16,alignContent:"center",justifyContent:'space-between',alignItems:'center',gap:12}}>
                     <TextInput
                    style={{width:120,height:38}}
                    onChangeText={onChangePassword}
                    placeholder="Password"
                    placeholderTextColor="#999999"
                    secureTextEntry={secureTextEntry} 
                    />
                    <TouchableOpacity style={{width:28,height:28,alignItems:'center',alignContent:"center",justifyContent:'center' }} onPress={togglePasswordVisibility}> 
                    {secureTextEntry === true ? (
                        <FontAwesomeIcon icon={icon({ name: 'eye' })} style={{ color: '#7db149ff',width:28,height:28 }}  /> 
                        ) : (


                        <FontAwesomeIcon icon={icon({ name: 'eye-slash' })} style={{ color: '#7db149ff',width:28,height:28 }}  /> 
                        )}
                        </TouchableOpacity>

                      
                     </View>

                     <View style={{position:'absolute',bottom:-42,left:168,width:28,aspectRatio:1,backgroundColor:'#000',borderRadius:50,alignItems:'center',alignContent:"center",justifyContent:'center'}}>
                        <TouchableOpacity onPress={handleHideForm} > 
                        <FontAwesomeIcon icon={icon({ name: 'xmark' })} style={{ color: '#7db149ff',width:28,height:28 }}  /> 
                        </TouchableOpacity>
                        </View>
                
                </View>
                )}
               
                
                </Animated.View>
                
                </Animated.View>
          
                <Animated.View style={{position:'absolute',bottom:80,width:120,height:40,borderRadius:18,backgroundColor:'#fff',alignItems:'center',alignContent:'center',justifyContent:'center', opacity: fadeAnim,}}>
                {selectedRegisterButton === 1 ? (
                    <>
                    <TouchableOpacity onPress={() => handleButtonRegisterButton()} >
                            <Text style={{fontSize:22,color:'#2a6f29'}}> Coutinue</Text>
                    </TouchableOpacity>
                    </>
                    ) : (
                    <>
                    <TouchableOpacity onPress={handleRegisters}  >
                            <Text style={{fontSize:22,color:'#2a6f29'}}> Register</Text>
                    </TouchableOpacity>
                    </>
                )}
                </Animated.View>
            
                
            </View>
            </TouchableWithoutFeedback>
  )
}

export default Register

