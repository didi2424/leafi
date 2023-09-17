import { Button, Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useTheme } from './Settings/Account/ThemeContext';
import { theme, darkTheme } from '../../Style/style'
import { color } from 'react-native-reanimated';
type Props = {
    onScreenChange: (screenNumber: number) => void;
  };

const UserSettings = ({ onScreenChange }: Props) => {
    const { isDarkMode } = useTheme();
    const selectedTheme = isDarkMode ? darkTheme : theme;
    const { colors, spacing, textVariants } = selectedTheme;
    const BackTouserProfile = () => {
        onScreenChange(0)
    }
    const toAccountInformation = () => {
        onScreenChange(5)
    }
    const toAddressInformation = () => {
        onScreenChange(6)
    }
    const toAppereance = () => {
        onScreenChange(7)
    }
    const toNotification = () => {
        onScreenChange(8)
    }
    const toSupport = () => {
        
    }
    const toFaq = () => {
        
    }
    const toToS = () => {
        
    }


    const pressLogOut = () => {
        //onScreenChange(1)
        console.log('press logout')
    }
  return (
    <View style={{height:height,gap:10,paddingBottom:30, backgroundColor:colors.background}}>
        <View style={styles.headStyle}>
            
        <TouchableOpacity onPress={BackTouserProfile}>
            <Ionicons name="chevron-back-circle-outline" size={(Dimensions.get('window').width > 400 ? 38 : 30 )} color="#2a6f29" />
        </TouchableOpacity>
            
        <Text style={styles.textStyle}>Settings</Text>
        

        <View style={{width:20}}>

        </View>
        </View>
        
       
        <View style={styles.content1style}>
            <Text style={{fontSize:20,color:colors.textcolor}}>Account</Text>

            <View style={styles.contentButtonMenu}>
                <View style={{flexDirection:'row',alignItems:'center',gap:12}}>
                    <FontAwesomeIcon icon={icon({ name: 'user' })} style={{ color: ICON_COLOR }}  /> 
                    <Text style={styles.textStyle1}>Account information</Text>
                </View>
                <TouchableOpacity style={styles.IconMenustyles} onPress={toAccountInformation}>
                    <FontAwesomeIcon icon={icon({ name: 'chevron-right' })} style={{ color: ICON_COLOR }}  /> 
                </TouchableOpacity>
                
            </View>

            <View style={styles.contentButtonMenu}>
                <View style={{flexDirection:'row',alignItems:'center',gap:12}}>
                    <FontAwesomeIcon icon={icon({ name: 'location-crosshairs' })} style={{ color: ICON_COLOR }}  /> 
                    <Text style={styles.textStyle1}>Address information</Text>
                </View>
                
                <TouchableOpacity style={styles.IconMenustyles} onPress={toAddressInformation}>
                    <FontAwesomeIcon icon={icon({ name: 'chevron-right' })} style={{ color: ICON_COLOR }}/>
                </TouchableOpacity>
                 
            </View>

            <View style={styles.contentButtonMenu}>
                <View style={{flexDirection:'row',alignItems:'center',gap:12}}>
                    <FontAwesomeIcon icon={icon({ name: 'gear' })} style={{ color: ICON_COLOR }}  /> 
                    <Text style={styles.textStyle1}>Appereance</Text>
                </View>

                <TouchableOpacity style={styles.IconMenustyles} onPress={toAppereance}>
                    <FontAwesomeIcon icon={icon({ name: 'chevron-right' })} style={{ color: ICON_COLOR }}/> 
                    </TouchableOpacity>
                    
                
            </View>

            <View style={styles.contentButtonMenu}>
                <View style={{flexDirection:'row',alignItems:'center',gap:12}}>
                    <FontAwesomeIcon icon={icon({ name: 'bell' })} style={{ color: ICON_COLOR}}  /> 
                    <Text style={styles.textStyle1}>Notification</Text>
                </View>
                    
                <TouchableOpacity style={styles.IconMenustyles} onPress={toNotification}>
                    <FontAwesomeIcon icon={icon({ name: 'chevron-right' })} style={{ color: ICON_COLOR }}/> 
                </TouchableOpacity>
               
            </View>

        </View>

        <View style={styles.content1style}>
            <Text style={{fontSize:20,color:colors.textcolor}}>General</Text>

            <View style={styles.contentButtonMenu}>
                <View style={{flexDirection:'row',alignItems:'center',gap:12}}>
                    <FontAwesomeIcon icon={icon({ name: 'info' })} style={{ color: ICON_COLOR}}  /> 
                    <Text style={styles.textStyle1}>Support</Text>
                </View>
                    
                <View style={styles.IconMenustyles}>
                    <FontAwesomeIcon icon={icon({ name: 'chevron-right' })} style={{ color: ICON_COLOR }}  /> 
                </View>
                
            </View>

            <View style={styles.contentButtonMenu}>
                <View style={{flexDirection:'row',alignItems:'center',gap:12}}>
                    <FontAwesomeIcon icon={icon({ name: 'question-circle' })} style={{ color: ICON_COLOR }}  /> 
                    <Text style={styles.textStyle1}>FAQ</Text>
                </View>
                    
                <View style={styles.IconMenustyles}>
                    <FontAwesomeIcon icon={icon({ name: 'chevron-right' })} style={{ color: ICON_COLOR }}/> 
                </View>
               
            </View>

            <View style={styles.contentButtonMenu}>
                <View style={{flexDirection:'row',alignItems:'center',gap:12}}>
                    <FontAwesomeIcon icon={icon({ name:'file-invoice' })} style={{ color: ICON_COLOR }}  /> 
                    <Text style={styles.textStyle1}>Terms of Services</Text>
                </View>
                
                <View style={styles.IconMenustyles}>
                    <FontAwesomeIcon icon={icon({ name: 'chevron-right' })} style={{ color: ICON_COLOR}}/> 
                </View>
                
            </View>
        </View>

        <View style={styles.content3style}>
            <Text> Copyright Dimas Kurniawan</Text>
        </View>

        <View style={styles.content3style}>
            <TouchableOpacity onPress={pressLogOut}>
                <Text style={{color:colors.textcolor}}>
                    Logout
                </Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default UserSettings
const { width,height } = Dimensions.get("window");
const BG_VIEW = "#C1FC49"
const CIRCLE_BG= '#86ba1c'
const ICON_COLOR = "#2a6f29"

const styles = StyleSheet.create({
  headStyle: {
    height:height/6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 30,
    backgroundColor: BG_VIEW,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 24,
  },
  content1style: {
    marginHorizontal: 18,
    gap: 12,
  },
  content2style: {
    flex: 1,
  },
  content3style: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  contentButtonMenu: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    justifyContent: "space-between",
    backgroundColor: BG_VIEW,
    paddingHorizontal: 8,
    borderRadius: 8,
    height: 48,
  },
  IconMenustyles: {
    width: 32,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: CIRCLE_BG,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "600",
  },
  textStyle1: {
    fontSize: 16,
    fontWeight: "400",
  },
});