import { Text, View, ScrollView,Alert, Button,TouchableOpacity,Animated,Keyboard,TouchableWithoutFeedback } from "react-native";
import { SafeAreaView,TextInput } from "react-native";
import React, { useState,useRef,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import axios, { AxiosResponse } from 'axios';

const Profile = () => {
    const [selectedScreen, setSelectedScreen] = useState(1);
    const [namefirst, onChangeNameFirst] = useState('');
    const [namelast, onChangeNameLast] = useState('');
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [username, onChangeUsername] = useState('');

    const handleViewPress = () => {
        Keyboard.dismiss();
    }
    const handleButtonPress = (screenNumber) => {
      setSelectedScreen(screenNumber);
    };
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const fadeAnim2 = useRef(new Animated.Value(0)).current;
    const fadeAnim3 = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }).start();
      };
     
    const fadeIn2 = () => {
    Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
    }).start();
    };
    const fadeIn3 = () => {
        Animated.timing(fadeAnim3, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
        };

    const fadeOut3 = () => {
        Animated.timing(fadeAnim3, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
        }).start();
        };

    const fadeOut = () => {
        Animated.timing(fadeAnim2, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut2 = () => {
        Animated.timing(fadeAnim2, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };  
    
    const handlePressCombined = (screenNumber) => {
        fadeIn();
        setTimeout(() => {
            handleButtonPress(screenNumber);
          }, 2000);
          setTimeout(() => {
            fadeOut()
          }, 2000);
          setTimeout(() => {
            fadeIn3();
          }, 2000);
          
      };
    const handlePressCombined2 = (screenNumber) => {
        fadeOut2();
        console.log('button preesss')
        setTimeout(() => {
            handleButtonPress(screenNumber);
            }, 2000);
        setTimeout(() => {
            fadeIn2()
            }, 2000);
        fadeOut3();

        };
   

    const [isMoved, setIsMoved] = useState(false);
    const moveAnim = useRef(new Animated.Value(0)).current;

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

    const [isMovedLogin, setIsMovedLogin] = useState(false);
    const moveAnimLogin = useRef(new Animated.Value(0)).current;
    const [isTextInputVisibleLogin, setIsTextInputVisibleLogin] = useState(false);
    const [selectedLoginButton, setLoginButton] = useState(1);

    const startAnimationLogin = () => {
        const targetValue = isMovedLogin ? 0 : -140
        setLoginButton(0)
        setIsTextInputVisibleLogin(true)
        Animated.timing(moveAnimLogin, {
        toValue: targetValue,
        duration: 2000,
        useNativeDriver: true,
        }).start();
        setIsMovedLogin(!isMovedLogin); 
    };

    const animatedStyleLogin = {
        transform: [{ translateY: moveAnimLogin }],
        
    };

    const handlePressCombinedHideLogin = () => {
        setIsTextInputVisibleLogin(false)
        setLoginButton(1)
        const targetValue = isMovedLogin ? 0 : -140
        Animated.timing(moveAnimLogin, {
            toValue: targetValue,
            duration: 2000,
            useNativeDriver: true,
            }).start();
            setIsMovedLogin(!isMovedLogin); 
    }
    const [isTextInputVisible, setIsTextInputVisible] = useState(false);
    
    const fadeInFromAnim = useRef(new Animated.Value(0)).current;

    const startAnimationFrom = () => {
    
    setIsTextInputVisible(true);
    
    const targetValue1 = isTextInputVisible ? 0 : 1;
    Animated.timing(fadeInFromAnim, {
        toValue: targetValue1,
        duration: 800,
        useNativeDriver: true,
    }).start();
        setIsTextInputVisible(!isTextInputVisible); // Toggle the state after a delay
    };

    const animatedFrom = {
        opacity: fadeInFromAnim,
    };

    
    const handleButtonLoginButton = (screenNumberButton) => {
        setLoginButton(screenNumberButton);
        
      };


    const [selectedRegisterButton, setRegisterButton] = useState(1);
    const handleButtonRegisterButton = (screenNumberButton) => {
        setRegisterButton(screenNumberButton);
        console.log('pressed')
        startAnimation();
        startAnimationFrom();
      };

    const handlePressCombined3 = () => {
        startAnimation();
        startAnimationFrom();
        setRegisterButton(1);      
        };

    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const togglePasswordVisibility = () => {
        setSecureTextEntry(!secureTextEntry);
        };

    const handleRegister = () => {

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
    
        // Make the Axios POST request
    axios.post('http://192.168.1.2:3000/users', payload)
        .then(response => {
        // Handle the successful response
        console.log(response.data);
        })
        .catch(error => {
        // Handle the error
        if (error.response && error.response.status === 409) {
            // Username already registered
            Alert.alert('Error', 'Username is already registered.');
        } else {
            console.error(error);
            
        }
        });
    };

    const handleLogin = () => {
        const payload = {
            username,
            password,
        };
        console.log(username,password)
        axios.post('http://192.168.1.2:3000/login', payload)
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
    return (
        <SafeAreaView   style={{flex:1}}>
        <TouchableWithoutFeedback onPress={handleViewPress}>
            
        {selectedScreen === 1 ? (
            
        <View style={{flex: 1,marginHorizontal:2,justifyContent:"center",alignItems:'center',alignContent:'center'}}>
            
            <Animated.View style={[{justifyContent:'center',alignItems:'center'},animatedStyle]}>
            <View style={{top:-40,height:250,width:160,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',alignContent:'center',borderRadius:20}}>
                    <Text>Register</Text>
            </View>
         
            <Animated.View
            style={{
                // Bind opacity to animated value
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
                    <TouchableOpacity  onPress={() => handlePressCombined(2)} >
                        <Text style={{fontSize:20,color:'#2a6f29'}}> Log in</Text>
                    </TouchableOpacity>
                </View>


                <Animated.View style={[{flexDirection:'column',gap:12},animatedFrom]}>

                {isTextInputVisible && (
                <>
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
                        <TouchableOpacity onPress={handlePressCombined3}> 
                        <FontAwesomeIcon icon={icon({ name: 'xmark' })} style={{ color: '#7db149ff',width:28,height:28 }}  /> 
                        </TouchableOpacity>
                        </View>
                
                </>
                )}
               
                </Animated.View>
                
                </Animated.View>
                
                </Animated.View>
          
                <Animated.View style={{position:'absolute',bottom:80,width:120,height:40,borderRadius:18,backgroundColor:'#fff',alignItems:'center',alignContent:'center',justifyContent:'center', opacity: fadeAnim,}}>
                {selectedRegisterButton === 1 ? (
                    <>
                    <TouchableOpacity onPress={() => handleButtonRegisterButton(0)} >
                            <Text style={{fontSize:22,color:'#2a6f29'}}> Coutinue</Text>
                    </TouchableOpacity>
                    </>
                    ) : (
                    <>
                    <TouchableOpacity onPress={handleRegister}  >
                            <Text style={{fontSize:22,color:'#2a6f29'}}> Register</Text>
                    </TouchableOpacity>
                    </>
                )}
                </Animated.View>
            
           
            </View>
             
              
            ) : (

                <Animated.View style={{flex: 1,marginHorizontal:24,alignContent:"center",justifyContent:"center",alignItems:'center'}}>
                        
                    <Animated.View style={[{bottom: 60 ,justifyContent:'center',alignItems:'center',gap:80},animatedStyleLogin]} >

                    
                    <View style={{top:-40,height:250,width:160,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',alignContent:'center',borderRadius:20}}>
                            <Text>Login</Text>
                    </View>
                
                    <Animated.View
                    style={{
                        opacity: fadeAnim2,
                        top:68
                    }}>
                        <Text style={{fontSize:18,fontWeight:'400'}}>Unlock the Power of AI: Explore 100+ Plants for Free!</Text>
                        <Text style={{top:12,fontSize:50,fontWeight:'600'}}>Didn't</Text>
                        <Text style={{top:2,fontSize:50,fontWeight:'600'}}>Have Account ?</Text>
                            <View style={{top:2,flexDirection:'row',alignItems:'center',alignContent:'center',gap:10}}>
                                <Text style={{fontSize:20,fontWeight:'400'}}>
                                    Register Now! It's Free!
                                </Text>
                                <TouchableOpacity  onPress={() => handlePressCombined2(1)} >
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
                        style={{left:10,width:170,height:42}}
                        onChangeText={onChangeUsername}
                        placeholder="Username"
                        placeholderTextColor="#999999"
                    />
                    </View>
                    <View style={{width:220,height:42,backgroundColor:'#fff',borderRadius:16,alignItems:'center',alignContent:"center",justifyContent:'center'}}>
                    <TextInput
                        style={{left:10,width:170,height:42}}
                        onChangeText={onChangePassword}
                        placeholder="Password"
                        placeholderTextColor="#999999"
                    />
                    </View>
                    <View style={{bottom:-42,width:28,aspectRatio:1,backgroundColor:'#000',borderRadius:50,alignItems:'center',alignContent:"center",justifyContent:'center'}}>
                        <TouchableOpacity onPress={handlePressCombinedHideLogin}> 
                        <FontAwesomeIcon icon={icon({ name: 'xmark' })} style={{ color: '#7db149ff',width:28,height:28 }}  /> 
                        </TouchableOpacity>
                        </View>
                    </Animated.View>
                    </>
                    )}
                    </Animated.View>

                   
                    </Animated.View>

                    
                    <Animated.View
                    style={{
                       
                        opacity: fadeAnim2,
                    }}>
                    
                    </Animated.View>

                    <Animated.View style={[{flexDirection:'column',gap:12}, animatedFrom]}>

                    </Animated.View>
                    <Animated.View style={{position:'absolute',bottom:80,width:120,height:40,borderRadius:18,backgroundColor:'#fff',alignItems:'center',alignContent:'center',justifyContent:'center',opacity: fadeAnim3}}>
                        {selectedLoginButton === 1 ? (
                            <>
                            <TouchableOpacity onPress={startAnimationLogin} >
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
                 
    )}
          </TouchableWithoutFeedback>
          </SafeAreaView >
   
    )
     
} 

export default Profile;