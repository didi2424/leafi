import { Button, Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

type Props = {
    onScreenChange: (screenNumber: number) => void;
   
  };

const UserSettings = ({ onScreenChange  }: Props) => {
    const BackTouserProfile = () => {
        onScreenChange(0)
    }
    const pressLogOut = () => {
        //onScreenChange(1)
        console.log('press logout')
    }
  return (
    <View style={{flex:1,gap:10,paddingBottom:30}}>
        <View style={styles.headStyle}>
            
        <TouchableOpacity onPress={BackTouserProfile}>
            <Ionicons name="chevron-back-circle-outline" size={(Dimensions.get('window').width > 400 ? 38 : 30 )} color="#2a6f29" />
        </TouchableOpacity>
            
        <Text style={styles.textStyle}>Settings</Text>

        <View style={{width:20}}>

        </View>
        </View>
        
       
        <View style={styles.content1style}>
            <Text style={{fontSize:20}}>Account</Text>

            <View style={styles.contentButtonMenu}>
                <View style={{flexDirection:'row',alignItems:'center',gap:12}}>
                    <FontAwesomeIcon icon={icon({ name: 'user' })} style={{ color: '#7db149ff' }}  /> 
                    <Text style={styles.textStyle1}>Account information</Text>
                </View>
                    
                <FontAwesomeIcon icon={icon({ name: 'chevron-right' })} style={{ color: '#7db149ff' }}  /> 
            </View>

            <View style={styles.contentButtonMenu}>
                <View style={{flexDirection:'row',alignItems:'center',gap:12}}>
                    <FontAwesomeIcon icon={icon({ name: 'location-crosshairs' })} style={{ color: '#7db149ff' }}  /> 
                    <Text style={styles.textStyle1}>Address information</Text>
                </View>
                    
                <FontAwesomeIcon icon={icon({ name: 'chevron-right' })} style={{ color: '#7db149ff' }}  /> 
            </View>

            <View style={styles.contentButtonMenu}>
                <View style={{flexDirection:'row',alignItems:'center',gap:12}}>
                    <FontAwesomeIcon icon={icon({ name: 'gear' })} style={{ color: '#7db149ff' }}  /> 
                    <Text style={styles.textStyle1}>Appereance</Text>
                </View>
                    
                <FontAwesomeIcon icon={icon({ name: 'chevron-right' })} style={{ color: '#7db149ff' }}  /> 
            </View>

            <View style={styles.contentButtonMenu}>
                <View style={{flexDirection:'row',alignItems:'center',gap:12}}>
                    <FontAwesomeIcon icon={icon({ name: 'bell' })} style={{ color: '#7db149ff'}}  /> 
                    <Text style={styles.textStyle1}>Notification</Text>
                </View>
                    
                <FontAwesomeIcon icon={icon({ name: 'chevron-right' })} style={{ color: '#7db149ff'}}  /> 
            </View>

        </View>

        <View style={styles.content1style}>
            <Text style={{fontSize:20}}>General</Text>

            <View style={styles.contentButtonMenu}>
                <View style={{flexDirection:'row',alignItems:'center',gap:12}}>
                    <FontAwesomeIcon icon={icon({ name: 'bell' })} style={{ color: '#7db149ff'}}  /> 
                    <Text style={styles.textStyle1}>Support</Text>
                </View>
                    
                <FontAwesomeIcon icon={icon({ name: 'chevron-right' })} style={{ color: '#7db149ff' }}  /> 
            </View>

            <View style={styles.contentButtonMenu}>
                <View style={{flexDirection:'row',alignItems:'center',gap:12}}>
                    <FontAwesomeIcon icon={icon({ name: 'question-circle' })} style={{ color: '#7db149ff' }}  /> 
                    <Text style={styles.textStyle1}>FAQ</Text>
                </View>
                    
                <FontAwesomeIcon icon={icon({ name: 'chevron-right' })} style={{ color: '#7db149ff' }}  /> 
            </View>

            <View style={styles.contentButtonMenu}>
                <View style={{flexDirection:'row',alignItems:'center',gap:12}}>
                    <FontAwesomeIcon icon={icon({ name:'file-invoice' })} style={{ color: '#7db149ff' }}  /> 
                    <Text style={styles.textStyle1}>Terms of Services</Text>
                </View>
                    
                <FontAwesomeIcon icon={icon({ name: 'chevron-right' })} style={{ color: '#7db149ff'}}  /> 
            </View>
        </View>

        <View style={styles.content3style}>
            <Text> Copyright The Day 21</Text>
        </View>


        
    </View>
  )
}

export default UserSettings
const { width,height } = Dimensions.get("window");
const BG_VIEW = "#C1FC49"
const TEXT_COLOR = '#2a6f29'
const CIRCLE_BG= '#86ba1c'

const styles = StyleSheet.create({
  headStyle: {
    flex: 0.2,
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
    gap:12
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
    justifyContent:'space-between',
    backgroundColor: BG_VIEW,
    paddingHorizontal: 8,
    borderRadius:8,
    height:48,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "600",
  },
  textStyle1: {
    fontSize: 16,
    fontWeight: '400'
  },
});