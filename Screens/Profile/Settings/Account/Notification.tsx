import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

type Props = {
    onScreenChange: (screenNumber: number) => void;
  };
  
const Notification = ({ onScreenChange }: Props) => {
    const BackToUserSettings = () => {
        onScreenChange(4)
    }
  return (
    <View style={{flex:1,gap:10,paddingBottom:30}}>
    <View style={styles.headStyle}>
          <TouchableOpacity onPress={BackToUserSettings}>
              <Ionicons name="chevron-back-circle-outline" size={(Dimensions.get('window').width > 400 ? 38 : 30 )} color="#2a6f29" />
          </TouchableOpacity>
            
          <Text style={styles.textStyle}>Notification</Text>
          
          <View style={{width:20}}>
          </View>
    </View>

    <View style={styles.content1style}>
      <View style={styles.contentNotification}>
          <View>
            <Text style={{fontSize:16, fontWeight:'600'}}>System Notification</Text>
            <Text>Receive notifications about leatest news & system update from us.</Text>
          </View>

          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text>Push</Text>
            <TouchableOpacity style={{width:60,height:28, borderRadius:20,backgroundColor:'pink'}}>
              <View style={{width:26,height:26,borderRadius:13,backgroundColor:'white'}}></View>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text>Email</Text>
            <TouchableOpacity style={{width:60,height:28, borderRadius:20,backgroundColor:'pink'}}>
              <View style={{width:26,height:26,borderRadius:13,backgroundColor:'white'}}></View>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text>SMS</Text>
            <TouchableOpacity style={{width:60,height:28, borderRadius:20,backgroundColor:'pink'}}>
              <View style={{width:26,height:26,borderRadius:13,backgroundColor:'white'}}></View>
            </TouchableOpacity>
          </View>

      </View>

      <View style={styles.contentNotification}>
          <View>
            <Text style={{fontSize:16, fontWeight:'600'}}>Marketing Notification</Text>
            <Text>Receive notifications with personalized offers and information about promotions.</Text>
          </View>

          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text>Push</Text>
            <TouchableOpacity style={{width:60,height:28, borderRadius:20,backgroundColor:'pink'}}>
              <View style={{width:26,height:26,borderRadius:13,backgroundColor:'white'}}></View>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text>Email</Text>
            <TouchableOpacity style={{width:60,height:28, borderRadius:20,backgroundColor:'pink'}}>
              <View style={{width:26,height:26,borderRadius:13,backgroundColor:'white'}}></View>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text>SMS</Text>
            <TouchableOpacity style={{width:60,height:28, borderRadius:20,backgroundColor:'pink'}}>
              <View style={{width:26,height:26,borderRadius:13,backgroundColor:'white'}}></View>
            </TouchableOpacity>
          </View>

      </View>
      <Text> Reminders Notifications</Text>
    </View>

    <View style={styles.content1style}>

    </View>
    
  </View>
  )
}

export default Notification

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
    height: 300,
    marginHorizontal: 18,
    gap: 12,
  },
  contentNotification: {
    alignContent:'space-between',
    width: width > 400 ? 200 : 320,
    gap:12
  },
  content2style: {
    flex: 1,
  },
  textStyle:{
    fontSize:20,
    fontWeight:'600'
  }
})