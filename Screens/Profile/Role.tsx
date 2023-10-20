import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {theme, darkTheme} from '../../Style/style'
import { useTheme } from './Settings/Account/ThemeContext'

const Role = () => {
  
  const [chooseRoleMember, SetChooseRoleMember] = useState(false)
  const [chooseRoleBotanis, SetCooseRoleBotanis] = useState(false)

  const { isDarkMode } = useTheme();
  const selectedTheme = isDarkMode ? darkTheme : theme;
  const { colors} = selectedTheme;

  const HandleRoleBotanis = () => {
    console.log('choose Botanis')
    SetCooseRoleBotanis(true)
    SetChooseRoleMember(false)
  }

  const HandleRoleMember = () => {
    console.log('choose member')
    SetCooseRoleBotanis(false)
    SetChooseRoleMember(true)
  }

  const HandlePostUser = () => {
    console.log('post register')
  }

  return (
    <View style={{}}>
        <View style={{gap:10,top:10}}>

        <View style={{flexDirection:'row', gap:12, justifyContent:'center', alignItems:'center'}}>

        <View style={{justifyContent:'center', alignContent:'center', alignItems:'center', gap:12}}>
        <TouchableOpacity style={{width:120, height:180, backgroundColor: colors.cardcolor, alignContent:'center', alignItems:'center',justifyContent:'center', borderRadius:20}} onPress={() => HandleRoleMember()}>
        <Text style={{fontSize:18, fontWeight:'400', color: colors.textcolor}}>Member</Text>
        </TouchableOpacity>

 
        <View style={{width:32, height:32, borderRadius:16, borderWidth:2, borderColor: colors.cardcolor, justifyContent:'center', alignItems:'center'}}>
          <View style={{width:20,height:20, borderRadius:20, backgroundColor: chooseRoleMember ? colors.buttoncolor : 'transparent'}}></View>
        </View>
        </View>

        <View style={{justifyContent:'center', alignContent:'center', alignItems:'center', gap:12}}>
        <TouchableOpacity style={{width:120, height:180, backgroundColor: colors.cardcolor, alignContent:'center', alignItems:'center',justifyContent:'center', borderRadius:20}} onPress={() => HandleRoleBotanis()}>
        <Text style={{fontSize:18, fontWeight:'400', color: colors.textcolor}}>Botanis</Text>
        </TouchableOpacity>

        
        <View style={{width:32, height:32, borderRadius:16, borderWidth:2, borderColor:colors.cardcolor, justifyContent:'center', alignItems:'center'}}>
          <View style={{width:20,height:20, borderRadius:20, backgroundColor: chooseRoleBotanis ? colors.buttoncolor: 'transparent'}}></View>
        </View>

        </View>

        </View>

        </View>
    </View>
  )
}

export default Role