import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { useTheme } from '../Account/ThemeContext'
import { theme, darkTheme } from '../../../../Style/style'

type Props = {
  onScreenChange: (screenNumber: number) => void;
};

const AccountInformation = ({ onScreenChange }: Props) => {
  const BackToUserSettings = () => {
    onScreenChange(4)
  }
  const [selectedOption, setSelectedOption] = useState(0);
  const { isDarkMode } = useTheme();
  const selectedTheme = isDarkMode ? darkTheme : theme;
  const { colors, spacing, textVariants } = selectedTheme;
  return (
    <View style={{height:height, gap:20, paddingBottom:30}}>
      <View style={styles.headStyle}>
            <TouchableOpacity onPress={BackToUserSettings}>
                <Ionicons name="chevron-back-circle-outline" size={(Dimensions.get('window').width > 400 ? 38 : 30 )} color="#2a6f29" />
            </TouchableOpacity>
              
            <Text style={styles.textStyle}>Account Information</Text>
            
            <View style={{width:20}}>
            </View>
      </View>

      <View style={styles.content1style}>
          <View style={{width:300,height:300,flexDirection:'row',gap:18}}>
              <TouchableOpacity style={{width:120,alignItems:'center',gap:5}} onPress={() => setSelectedOption(0)}>
                <Text style={{fontSize:16,color:colors.textcolor}}>Account Data</Text>
                {selectedOption === 0 ? (
                  <View style={{width:120,height:2,backgroundColor: colors.textcolor}}></View>
                ) : (
                  <View></View>
                )}
                
              </TouchableOpacity>

              <TouchableOpacity style={{width:120,alignItems:'center',gap:5,}} onPress={() => setSelectedOption(1)}>
                <Text style={{fontSize:16,color:colors.textcolor}}>Personal Data</Text>
               {selectedOption === 0 ? (
                  <View></View>
                ) : (
                  <View style={{width:120,height:2,backgroundColor: colors.textcolor}}></View>
                )}
              </TouchableOpacity>
          </View>
      </View>

      {selectedOption === 0 ? (
      <View style={styles.content1style}>
      <View style={{height:300,flexDirection:'column',gap:12}}>
        <Text style={{fontSize:14,color:colors.textcolor}}>Email Address</Text>
        <TextInput style={{backgroundColor:BG_VIEW, height:40,borderRadius:20,paddingLeft:12}} >

        </TextInput>

        <Text style={{fontSize:14,color:colors.textcolor}}>Password</Text>
        <TextInput style={{backgroundColor:BG_VIEW, height:40,borderRadius:20,paddingLeft:12}}>

          </TextInput>
        <View style={{paddingTop:10}}>
        <Text style={{fontSize:14,color:colors.textcolor}}>Delete account</Text>
        <Text style={{fontSize:14,color:colors.textcolor}}>Your Account will be permanently removed from the application. All your data will be lost.
        </Text>
        </View>

        <TouchableOpacity style={{backgroundColor:BG_VIEW,height:40,alignContent:'center',justifyContent:'center',alignItems:'center',borderRadius:20}}>
          <Text style={{color:'#2a6f29',fontSize:16}}>Delete Account</Text>
        </TouchableOpacity>

      </View>
      </View>
     
      ) : (
        <View style={styles.content1style}>
        <View style={{height:300,flexDirection:'column',gap:12}}>
              <Text style={{fontSize:14,color:colors.textcolor}}>First Name</Text>
              <TextInput style={{backgroundColor:BG_VIEW, height:40,borderRadius:20,paddingLeft:12}} >

                </TextInput>
              <Text style={{fontSize:14,color:colors.textcolor}}>Last Name</Text>
              <TextInput style={{backgroundColor:BG_VIEW, height:40,borderRadius:20,paddingLeft:12}} >

                </TextInput>
              <Text style={{fontSize:14,color:colors.textcolor}}>Phone Number</Text>
              <TextInput style={{backgroundColor:BG_VIEW, height:40,borderRadius:20,paddingLeft:12}} >

                </TextInput>

                <View style={{height:40,borderRadius:20,justifyContent:'center',alignItems:'center'}}>
              <TouchableOpacity style={{height:40,width:120,backgroundColor: BG_VIEW,borderRadius:20,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:16,color:'#2a6f29'}}>Save</Text>
              </TouchableOpacity>
              </View>
              
        </View>
      </View>
      )}
      
      
    </View>
  )
}

export default AccountInformation

const {height } = Dimensions.get("window");
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
    height:20,
    marginHorizontal: 18,
    gap: 12,
  },
  content2style: {
    height:300,
    marginHorizontal: 18,
    gap: 12,
  },
  textStyle:{
    fontSize:20,
    fontWeight:'600'
  }
})