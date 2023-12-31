import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import {theme, darkTheme} from '../../../../Style/style'
import { useTheme } from './ThemeContext'

type Props = {
    onScreenChange: (screenNumber: number) => void;
  };
  
const AddressInfromation = ({ onScreenChange }: Props) => {
    const BackToUserSettings = () => {
        onScreenChange(4)
    }
    const { isDarkMode } = useTheme();
    const selectedTheme = isDarkMode ? darkTheme : theme;
    const { colors} = selectedTheme;
  return (
    <View style={{gap:10,paddingBottom:30,backgroundColor:colors.background,height:height}}>
    <View style={styles.headStyle}>
          <TouchableOpacity onPress={BackToUserSettings}>
              <Ionicons name="chevron-back-circle-outline" size={(Dimensions.get('window').width > 400 ? 38 : 30 )} color="#2a6f29" />
          </TouchableOpacity>
            
          <Text style={styles.textStyle}>Address Information</Text>
          
          <View style={{width:20}}>
          </View>
    </View>

    <View style={styles.content1style}>

    </View>

    <View style={styles.content1style}>

    </View>
    
  </View>
  )
}

export default AddressInfromation

const { width,height } = Dimensions.get("window");
const BG_VIEW = "#C1FC49"
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
    flex: 1,
    marginHorizontal: 18,
    gap: 12,
  },
  content2style: {
    flex: 1,
  },
  textStyle:{
    fontSize:20,
    fontWeight:'600'
  }
})