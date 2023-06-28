import { View, Text,ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

const Camera = () => {


  return (
    <ScrollView>
        <SafeAreaView>
            <Text> Camera </Text>
            <TouchableOpacity style={{backgroundColor:'red'}}>
                <Text style={{backgroundColor:'red'}}>dimas</Text>
            </TouchableOpacity>
        </SafeAreaView>
    </ScrollView>
  )
}

export default Camera