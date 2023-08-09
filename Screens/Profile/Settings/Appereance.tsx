import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
type Props = {
    onScreenChange: (screenNumber: number) => void;
  };
const Appereance = ({ onScreenChange }: Props) => {
    const BackToUserSettings = () => {
        onScreenChange(4)
    }
  return (
    <View style={{flex:1,gap:10,paddingBottom:30}}>
    <View style={styles.headStyle}>
          <TouchableOpacity onPress={BackToUserSettings}>
              <Ionicons name="chevron-back-circle-outline" size={(Dimensions.get('window').width > 400 ? 38 : 30 )} color="#2a6f29" />
          </TouchableOpacity>
            
          <Text style={styles.textStyle}>Appereance</Text>
          
          <View style={{width:20}}>
          </View>
    </View>

    <View style={styles.content1style}>

        <View style={{flexDirection:'column',alignContent:'center',alignItems:'center',gap:8}}>
            <View style={{width:100,height:150, backgroundColor:'white', borderRadius:20}}></View>
            
            <View style={{height:24}}>
                <Text>Light</Text>
            </View>
            
            <View style={{width:26,aspectRatio:1, borderRadius:15,borderWidth:2, justifyContent:'center', alignItems:'center'}}>
                <View style={{width:16,aspectRatio:1, borderRadius:8,backgroundColor:'black'}}></View>
            </View>
        </View>

        <View style={{flexDirection:'column',alignContent:'center',alignItems:'center',gap:8}}>
            <View style={{width:100,height:150, backgroundColor:'black', borderRadius:20}}></View>
            
            <View style={{height:24}}>
                <Text>Dark</Text>
            </View>
            
            <View style={{width:26,aspectRatio:1, borderRadius:15,borderWidth:2, justifyContent:'center', alignItems:'center'}}>
                <View style={{width:16,aspectRatio:1, borderRadius:8,backgroundColor:'black'}}></View>
            </View>
        </View>

        <View style={{flexDirection:'column',alignContent:'center',alignItems:'center',gap:8}}>
            <View style={{width:100,height:150, backgroundColor:'black', borderRadius:20}}></View>
            
            <View style={{height:24}}>
                <Text>System</Text>
            </View>
            
            <View style={{width:26,aspectRatio:1, borderRadius:15,borderWidth:2, justifyContent:'center', alignItems:'center'}}>
                <View style={{width:16,aspectRatio:1, borderRadius:8,backgroundColor:'black'}}></View>
            </View>
        </View>

        </View>
        

    <View style={styles.content1style}>

    </View>
    
  </View>
  )
}

export default Appereance

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
 
    flexDirection:'row',
    justifyContent:'space-between',
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