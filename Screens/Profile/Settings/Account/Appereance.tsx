import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import {useTheme} from '../Account/ThemeContext'

type Props = {
    onScreenChange: (screenNumber: number) => void;
  };

interface ThemeContextType {
  theme: {
    backgroundColor: string;
    textColor: string;
  };
  toggleTheme: () => void;
}


const Appereance = ({ onScreenChange }: Props) => {
    const { isDarkMode, setToLightTheme, setToDarkTheme, setToSystemTheme } = useTheme();
    const BackToUserSettings = () => {
        onScreenChange(4)
    }

  return (
    <View style={{height:height,gap:10,paddingBottom:30,backgroundColor: isDarkMode ? DARKBG_VIEW:LIGHT_BG}}>
      <View style={styles.headStyle}>
            <TouchableOpacity onPress={BackToUserSettings}>
                <Ionicons name="chevron-back-circle-outline" size={(Dimensions.get('window').width > 400 ? 38 : 30 )} color="#2a6f29" />
            </TouchableOpacity>
              
            <Text style={styles.textStyle}>Appereance</Text>
            
            <View style={{width:20}}>
            </View>
      </View>

      <View style={styles.content2style}>
        <View style={{width:300,height:200}}>
          <Text style={[styles.textStyle1,{color: isDarkMode ? LIGHT_BG:DARKBG_VIEW}]}>Appereance</Text>
          <Text style={[styles.textStyle1,{color: isDarkMode ? LIGHT_BG:DARKBG_VIEW}]}>Selecting a particular option will change the appearance (coloring) of the application according to your preferences.</Text>
        </View>
      </View>

    <View style={[styles.content1style,{backgroundColor: isDarkMode ? DARKBG_VIEW:LIGHT_BG}]}>

        <TouchableOpacity style={{flexDirection:'column',alignContent:'center',alignItems:'center',gap:8}} onPress={setToLightTheme}>
            <View style={{width:100,height:150, backgroundColor:'white', borderRadius:20}}></View>
            
            <View style={{height:24}}>
                <Text style={{color: isDarkMode ? TEXT_VIEW : DARKBG_VIEW}}>Light</Text>
            </View>
            
            <TouchableOpacity style={{width:26,aspectRatio:1, borderRadius:15,borderWidth:2, justifyContent:'center', alignItems:'center', borderColor: isDarkMode ? TEXT_VIEW : DARKBG_VIEW}} >
                <View style={{width:16,aspectRatio:1, borderRadius:8, backgroundColor: isDarkMode ? TEXT_VIEW : DARKBG_VIEW}}></View>
            </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection:'column',alignContent:'center',alignItems:'center',gap:8}} onPress={setToDarkTheme}>
            <View style={{width:100,height:150, backgroundColor:'#191919', borderRadius:20}}></View>
            
            <View style={{height:24}}>
                <Text style={{color: isDarkMode ? TEXT_VIEW : DARKBG_VIEW}}>Dark</Text>
            </View>
            
            <View style={{width:26,aspectRatio:1, borderRadius:15,borderWidth:2, justifyContent:'center', alignItems:'center', borderColor: isDarkMode ? TEXT_VIEW : DARKBG_VIEW}}>
                <View style={{width:16,aspectRatio:1, borderRadius:8, backgroundColor: isDarkMode ? TEXT_VIEW : DARKBG_VIEW}}></View>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection:'column',alignContent:'center',alignItems:'center',gap:8}} onPress={setToSystemTheme}>
            <View style={{width:100,height:150, backgroundColor:'black', borderRadius:20}}></View>
            
            <View style={{height:24}}>
                <Text style={{color: isDarkMode ? TEXT_VIEW : DARKBG_VIEW}}>System</Text>
            </View>
            
            <View style={{width:26,aspectRatio:1, borderRadius:15,borderWidth:2, justifyContent:'center', alignItems:'center', borderColor: isDarkMode ?TEXT_VIEW : DARKBG_VIEW}}>
                <View style={{width:16,aspectRatio:1, borderRadius:8, backgroundColor: isDarkMode ? TEXT_VIEW : DARKBG_VIEW}}></View>
            </View>
        </TouchableOpacity>

        </View>
        
  </View>
  )
}

export default Appereance

const { width,height } = Dimensions.get("window");
const BG_VIEW = "#C1FC49"
const LIGHT_BG = '#eeeeee'
const DARKBG_VIEW = "#000"
const TEXT_VIEW = "#FFF"
const styles = StyleSheet.create({
  headStyle: {
    height:height/6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: BG_VIEW,
    paddingTop: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 24,
  },
  content1style: {
    height:300,
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal: 24,
    gap: 12,
  },
  content2style: {
    height:80,
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal: 18,
    gap: 12,
  },
  textStyle:{
    fontSize:20,
    fontWeight:'600'
  },
  textStyle1:{
    fontSize:14,
    fontWeight:'400'
  }
})