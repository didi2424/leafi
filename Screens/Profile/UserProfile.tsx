import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
const UserProfile = () => {
  return (
    <View style={{top:12, marginHorizontal:24}}>
      <View style={{flexDirection:"row",
            alignItems: "center",
            justifyContent:"space-between"}}>
        <Text style={{fontSize:28,fontWeight:'600'}}>Profile</Text>
        <Ionicons name="settings-sharp" size={28} color="gray" />
        </View>
      <View style={{alignContent: 'space-between',alignItems:'center'}}> 

      
        <View style={{top:12,gap:12,alignContent: 'space-between',alignItems:'center'}}>
          <View style={{width:80, aspectRatio:1, borderRadius:50, backgroundColor:'white'}}>
          </View>
          <Text style={{fontSize:22,fontWeight:'600'}}>username</Text>
          <Text style={{fontSize:18,fontWeight:'400'}}>Member</Text>
        </View>
      </View>

   
    <View style={{gap:12}}>
    <View style={{top:22}}>
      <Text style={{fontSize:22}}>
        Complete Profile
      </Text>


    </View>

    <View style={{top:22,gap:12}}>
      <Text style={{fontSize:22}}>
        My SmartPot
      </Text>
      {/* <View style={{paddingHorizontal: 2}}>
          
          <View style={{height:180,paddingHorizontal: 2, borderRadius:12 ,backgroundColor:'white'}}>
          <View style={{ flex: 1, flexDirection:"row", alignItems: "center", justifyContent:"space-between",paddingHorizontal: 10 }}>
            <View>
              <Text>Device name</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 100, height: 25, backgroundColor: 'gray', borderRadius: 12, paddingHorizontal: 6 }}>
              <MaterialCommunityIcons name="bluetooth-connect" size={18} color="white" />
              <Text style={{ color: 'white' }}>Connected</Text>
            </View>
          </View>
            <View style={{flex:3,alignItems:'center',alignContent:'center',justifyContent:'center',backgroundColor:'green',flexDirection:'row',gap:12}}>
            <View>
              <Text>Temperature</Text>
            </View>
            <View>
              <Text>Device name</Text>
            </View>
            <View>
              <Text>Device name</Text>
            </View>


            </View>

            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
              <Text style={{fontSize:18}}>Device Name</Text>
              
            </View>
          </View>


          
        </View> */}

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={{paddingHorizontal: 2}}>

        <View style={{gap:12, flexDirection:'row'}}> 

          <View style={{height:52,width:220,borderRadius:28,backgroundColor:'gray',flexDirection:'row', alignItems:'center',paddingHorizontal:7}}>
            <View style={{width:38, aspectRatio:1, borderRadius:20, backgroundColor:'white'}}>

            </View>
            <View style={{flexDirection:'column',gap:4}}>
            <Text style={{fontSize:16,color:'white',fontWeight:'600'}}> Spider Plants</Text>
            <Text style={{fontSize:14,color:'white',fontWeight:'400'}}> SmartPot At Bedroom</Text>
            </View>
            
          </View>

          <View style={{height:52,width:220,borderRadius:28,backgroundColor:'gray',flexDirection:'row', alignItems:'center',paddingHorizontal:7}}>
            <View style={{width:38, aspectRatio:1, borderRadius:20, backgroundColor:'white'}}>

            </View>
            <View style={{flexDirection:'column',gap:4}}>
            <Text style={{fontSize:16,color:'white',fontWeight:'600'}}> Ric Rac Cactus</Text>
            <Text style={{fontSize:14,color:'white',fontWeight:'400'}}> SmartPot At Living Room</Text>
            </View>
            
          </View>

        </View>
      </View>
      </ScrollView>
    </View>


   

    <View style={{top:22}}>
      <Text style={{fontSize:22}}>
        Previous Scan
      </Text>
    </View>
    </View>
    </View>
  )
}

export default UserProfile