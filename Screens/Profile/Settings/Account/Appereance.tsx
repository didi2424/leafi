import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import {useTheme} from '../Account/ThemeContext'
import { theme, darkTheme } from '../../../../Style/style'

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
    const { isDarkMode, setToLightTheme, setToDarkTheme } = useTheme();
    const selectedTheme = isDarkMode ? darkTheme : theme;
    const { colors, spacing, textVariants } = selectedTheme;
    
    const [isSelectedOption, setSelectedOption] = useState(1)
    const BackToUserSettings = () => {
        onScreenChange(4)
    }

  return (
    <View style={{height:height,gap:10,paddingBottom:30}}>
      <View style={styles.headStyle}>
            <TouchableOpacity onPress={BackToUserSettings}>
                <Ionicons name="chevron-back-circle-outline" size={(Dimensions.get('window').width > 400 ? 38 : 30 )} color="#2a6f29" />
            </TouchableOpacity>
              
            <Text style={styles.textStyle}>Appereance</Text>
            
            <View style={{width:20}}>
            </View>
      </View>

      <View style={styles.content2style}>
        <View style={{height:200}}>
          <Text style={[styles.textStyle1,{color:colors.textcolor}]}>Appereance</Text>
          <Text style={[styles.textStyle2,{color:colors.textcolor}]}>Selecting a particular option will change the appearance (coloring) of the application according to your preferences.</Text>
        </View>
      </View>

    <View style={[styles.content1style,{backgroundColor: colors.background}]}>

        <TouchableOpacity style={{flexDirection:'column',alignContent:'center',alignItems:'center',gap:8}} onPress={setToLightTheme}>
            <View style={{width:100,height:150, backgroundColor:'white', borderRadius:20}}></View>
            
            <View style={{height:24}}>
                <Text style={{ color:colors.textcolor}}>Light</Text>
            </View>
            
            <TouchableOpacity style={{width:26,aspectRatio:1, borderRadius:15,borderWidth:2, justifyContent:'center', alignItems:'center', borderColor: isDarkMode ? TEXT_VIEW : DARKBG_VIEW}} >
              {isSelectedOption === 0 ? (
                <View style={{width:16,aspectRatio:1, borderRadius:8, backgroundColor: isDarkMode ? 'transparent' : 'transparent'}}></View>
              ) : (
                <View style={{width:16,aspectRatio:1, borderRadius:8, backgroundColor: isDarkMode ? 'transparent' : DARKBG_VIEW}}></View>
              
              ) 
            }
            </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection:'column',alignContent:'center',alignItems:'center',gap:8}} onPress={setToDarkTheme}>
            <View style={{width:100,height:150, backgroundColor:'#191919', borderRadius:20}}></View>
            
            <View style={{height:24}}>
                <Text style={{color:colors.textcolor}}>Dark</Text>
            </View>
            
            <View style={{width:26,aspectRatio:1, borderRadius:15,borderWidth:2, justifyContent:'center', alignItems:'center', borderColor: isDarkMode ? TEXT_VIEW : DARKBG_VIEW}}>
            {isSelectedOption === 0 ? (
                <View style={{width:16,aspectRatio:1, borderRadius:8, backgroundColor: isDarkMode ? 'transparent' : 'transparent'}}></View>
              ) : (
                <View style={{width:16,aspectRatio:1, borderRadius:8, backgroundColor: isDarkMode ? TEXT_VIEW : 'transparent'}}></View>
              
              )
            }
            </View>
        </TouchableOpacity>

       

        </View>
        
  </View>
  )
}

export default Appereance

const { width,height } = Dimensions.get("window");
const BG_VIEW = "#C1FC49"
const DARKBG_VIEW = "#3d3c3fff"
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
    justifyContent:'center',
    marginHorizontal: 24,
    gap: 22,
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
    fontSize:16,
    fontWeight:'600'
  },
  textStyle2:{
    fontSize:14,
    fontWeight:'400'
  }
})