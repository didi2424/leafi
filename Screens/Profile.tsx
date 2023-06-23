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
    const fromAnim = useRef(new Animated.Value(0)).current;

    const fadeInFrom = () => {
        Animated.timing(fromAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }).start();
      };

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

        };
   

    const [isMoved, setIsMoved] = useState(false);
    const moveAnim = useRef(new Animated.Value(0)).current;

    

    const startAnimation = () => {
        const targetValue = isMoved ? 0 : -220; // Target value based on current state
        Animated.timing(moveAnim, {
        toValue: targetValue,
        duration: 2000,
        useNativeDriver: true,
        }).start();
        setIsMoved(!isMoved); // Toggle the state
    };

    const animatedStyle = {
        transform: [{ translateY: moveAnim }],
    };

   

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

    const buttonShow = useRef(new Animated.Value(0)).current;
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

        const [data, setData] = useState([]);

        useEffect(() => {
          axios.get('http://192.168.107.138:3000/users')
            .then(response => {
              setData(response.data);
              
            })
            .catch(error => {
              console.error(error);
            });
        }, []);
        

        const [secureTextEntry, setSecureTextEntry] = useState(true);
        const togglePasswordVisibility = () => {
            setSecureTextEntry(!secureTextEntry);
          };

      const handleRegister = () => {
        // Create the request payload
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        
        if (!emailPattern.test(email)) {
        Alert.alert('Invalid Email', 'Please enter a valid email address.');
        }
        if (namefirst === '' || namelast === '' || username === '' || email === '' || password === '') {
            Alert.alert('Error', 'All fields are required.');
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
        axios.post('http://192.168.107.138:3000/users', payload)
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
                <Text style={{fontSize:18,fontWeight:'400'}}>
                    Unlock the Power of AI: Explore 100+ Plants for Free!</Text>
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
                    </Animated.View>
                    <Animated.View
                    style={{
                       
                        opacity: fadeAnim2,
                    }}>
                    <View style={{top:120,width:120,height:40,borderRadius:12,backgroundColor:'#fff',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                            <TouchableOpacity  onPress={() => handleButtonPress(1)}>
                                <Text style={{fontSize:22,color:'#2a6f29'}}> Login</Text>
                            </TouchableOpacity>
                    </View>
                    </Animated.View>
            </Animated.View>
                 
    )}
          </TouchableWithoutFeedback>
          </SafeAreaView >
   
    )
     
} 

export default Profile;

  {/* <View style={{
                flexDirection:"row",
                alignItems: "center",
                justifyContent:"space-between",
                marginBottom:12,
                backgroundColor:'#0000'}}>
                <TextInput
                    style={{width:180,height:42,backgroundColor:'#808080',borderRadius:16,color:'#fff' }}
                    onChangeText={onChangeNameFirst}
                    placeholder="First Name"
                    placeholderTextColor="#999999"
                    />
                <TextInput
                    style={{width:180,height:42,backgroundColor:'#808080',borderRadius:16,color:'#fff'}}
                    onChangeText={onChangeNameLast}
                    placeholder="Last Name"
                    placeholderTextColor="#999999"
                    />
                </View>

                <TextInput
                    style={{height:42,backgroundColor:'#808080',borderRadius:16,marginBottom:12,color:'#fff'}}
                    onChangeText={onChangeEmail}
                    placeholderTextColor="#999999"
                    placeholder="Email"
                    />

                <TextInput
                    style={{width:180,height:42,backgroundColor:'#808080',borderRadius:16,color:'#fff',padding:10}}
                    onChangeText={onChangePassword}
                    placeholderTextColor="#999999"
                    placeholder="Password"

                    />
                <Button title="Register" onPress={handleRegister} /> */}
            