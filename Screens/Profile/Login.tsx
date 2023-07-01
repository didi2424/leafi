import { Alert, Animated, Keyboard, TouchableWithoutFeedback, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

import api from '../../api';
type Props = {
    onScreenChange: (screenNumber: number) => void;
  };

const Login = ({ onScreenChange }: Props) => {
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
        const targetValue = isMovedLogin ? 0 : -340
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
        console.log(email,password)
        api.post('/login', payload)
            .then(response => {
            console.log(response.data);
            })
            .catch(error => {
            if (error.response && error.response.status === 401) {
                Alert.alert('Error', 'Username or Password cannot be found');
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
        
  return (
    
    <Animated.View style={{flex: 1,marginHorizontal:2,alignContent:"center",justifyContent:"center",alignItems:'center'}}>
                        
            <Animated.View style={[{justifyContent:'center',alignItems:'center',opacity: fadeAnim,},animatedStyleLogin]} >

            
            <View style={{top:-40,height:250,width:160,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',alignContent:'center',borderRadius:20}}>
                    <Text>Login</Text>
            </View>
        
            <Animated.View
            style={{
                opacity: fadeAnim,
                top:68
            }}>
                <Text style={{fontSize:18,fontWeight:'400'}}>Unlock the Power of AI: Explore 100+ Plants for Free!</Text>
                <Text style={{top:12,fontSize:50,fontWeight:'600'}}>Didn't</Text>
                <Text style={{top:2,fontSize:50,fontWeight:'600'}}>Have Account ?</Text>
                    <View style={{top:2,flexDirection:'row',alignItems:'center',alignContent:'center',gap:10}}>
                        <Text style={{fontSize:20,fontWeight:'400'}}>
                            Register Now! It's Free!
                        </Text>
                        <TouchableOpacity onPress={handlePressCombined}  >
                            <Text style={{fontSize:20,color:'#2a6f29'}}>Register</Text>
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

            <View style={{width:220,height:42,backgroundColor:'#fff',borderRadius:16,alignItems:'center',alignContent:"center",justifyContent:'center'}}>
            <TextInput
                style={{left:10,width:220,height:42}}
                onChangeText={onChangeEmail}
                placeholder="email"
                autoFocus={true}
                placeholderTextColor="#999999"
            />
            </View>
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
            <TouchableOpacity style={{width:180,height:22,left:0,alignItems:'flex-start',alignContent:'flex-start',justifyContent:'center'}}>
                <Text>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={{bottom:-18,width:32,aspectRatio:1,backgroundColor:'#000',borderRadius:50,alignItems:'center',alignContent:"center",justifyContent:'center'}}>
                <TouchableOpacity onPress={handleHideForm}> 
                <FontAwesomeIcon icon={icon({ name: 'xmark' })} style={{ color: '#7db149ff',width:32,height:32 }}  /> 
                </TouchableOpacity>
               
                </View>
            </Animated.View>
            
            </>
            )}
            </Animated.View>
            <Animated.View style={{top:110, width:120,height:40,borderRadius:18,backgroundColor:'#fff',alignItems:'center',alignContent:'center',justifyContent:'center', opacity: fadeAnim}}>
                {selectedLoginButton === 1 ? (
                    <>
                    <TouchableOpacity onPress={handleButtonRegisterButton} >
                            <Text style={{fontSize:22,color:'#2a6f29'}}>Coutinue 2</Text>
                    </TouchableOpacity>
                    </>
                    ) : (
                    <>
                    <TouchableOpacity onPress={handleLogin}  >
                            <Text style={{fontSize:22,color:'#2a6f29'}}>Login</Text>
                    </TouchableOpacity>
                    </>
                )}
            </Animated.View>
            </Animated.View>
            

            
           
    </Animated.View>
    
  )
}

export default Login
