import { Text, View, ScrollView,Alert, Button,TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";
import React, { useState } from 'react';

const Profile = () => {
    const [selectedScreen, setSelectedScreen] = useState(1);

    const handleButtonPress = (screenNumber) => {
      setSelectedScreen(screenNumber);
    };

    return (
    <ScrollView>
        <SafeAreaView>
            <View style={{
                paddingHorizontal: 24,
                paddingVertical: 24,
                flexDirection: "row",
                alignItems: "center",
               
                flex: 1,
                justifyContent: 'center'
            }}>
                <View style={{ marginTop: 20 }}>
                <TouchableOpacity  onPress={() => handleButtonPress(1)} style={{backgroundColor:'green',width:80, alignContent:'center', alignItems:'center',borderTopLeftRadius:10,borderBottomLeftRadius:10}}>
                    <Text style={{marginVertical:10}}>Login</Text>
                </TouchableOpacity>
                </View>

                <View style={{ marginTop: 20 }}>
                <TouchableOpacity  onPress={() => handleButtonPress(2)} style={{backgroundColor:'#ffff',width:80, alignContent:'center', alignItems:'center',borderTopRightRadius:10,borderBottomRightRadius:10}}>
                        <Text style={{marginVertical:10}}> Sign Up</Text>
                    </TouchableOpacity>
                </View>
                </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {selectedScreen === 1 ? (
                <View>
                <Text>Screen Login</Text>
                </View>
            ) : (
                <View>
                <Text>Screen Sign Up</Text>
                </View>
            )}
            </View>
        </SafeAreaView>
    </ScrollView>
    )
     
} 

export default Profile;