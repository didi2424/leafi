import { Text, View, ScrollView,Alert, Button,TouchableOpacity,Animated } from "react-native";
import { SafeAreaView,TextInput } from "react-native";
import React, { useState,useRef } from 'react';

const Profile = () => {
    const [selectedScreen, setSelectedScreen] = useState(1);
    const [namefirst, onChangeNameFirst] = useState('');
    const [namelast, onChangeNameLast] = useState('');
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');

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
        const targetValue = isMoved ? 0 : -480; // Target value based on current state
        Animated.timing(moveAnim, {
        toValue: targetValue,
        duration: 800,
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
    const targetValue = isTextInputVisible ? 1 : 0;
    Animated.timing(fadeInFromAnim, {
        toValue: targetValue,
        duration: 2000,
        useNativeDriver: true,
    }).start(() => {
        if (!isTextInputVisible) {
        setIsTextInputVisible(true);
        }
    });
    };

    const animatedFrom = {
    opacity: fadeInFromAnim,
    };

    const handlePressCombined3 = () => {
        startAnimation();
        startAnimationFrom();
        
        };
    const handleRegister = () => {
        // Handle registration logic here
        console.log('NameF:', namefirst);
        console.log('NameL:', namelast);
        console.log('Email:', email);
        console.log('Password:', password);
      };
     
    return (
        <SafeAreaView  style={{flex:1}}>
                
            
        {selectedScreen === 1 ? (
        <View style={{flex: 1,marginHorizontal:2,justifyContent:"center",alignItems:'center',alignContent:'center'}}>
            
            <Animated.View style={[{justifyContent:'center',alignItems:'center'},animatedStyle]}>
            <View style={{top:-40,height:250,width:160,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',alignContent:'center',borderRadius:20}}>
                    <Text>assasa</Text>
            </View>
         
            <Animated.View
            style={{
                // Bind opacity to animated value
                opacity: fadeAnim,
                top:78
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
                <Animated.View style={[{
                flexDirection:"row",
                alignItems: "center",
                justifyContent:"space-between",
                marginTop:20,
                gap:12,
                
                backgroundColor:'#0000'}, animatedFrom]}>
                {isTextInputVisible && (
                     <>
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
                    </>
                    )}
                </Animated.View>
                
                
                </Animated.View>
               
                
                </Animated.View>
          
                <View style={{top:90,width:120,height:40,borderRadius:18,backgroundColor:'#fff',alignItems:'center',alignContent:'center',justifyContent:'center'}}>
                    <TouchableOpacity  onPress={handlePressCombined3}>
                            <Text style={{fontSize:22,color:'#2a6f29'}}> Register</Text>
                        </TouchableOpacity>
                </View>
            
           
            </View>
             
              
            ) : (
                <Animated.View style={{flex: 1,marginHorizontal:24,alignContent:"center",justifyContent:"center",alignItems:'center'}}>
            
                    <View style={{height:250,width:160,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',alignContent:'center',borderRadius:20}}>
                            <Text>assasa</Text>
                    </View>
                
                    <Animated.View
                    style={{
                       
                        opacity: fadeAnim2,
                        top:60
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
            