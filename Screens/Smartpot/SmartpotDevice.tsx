import { View, Text, TouchableOpacity,StyleSheet, FlatList, Dimensions} from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { ScrollView } from 'react-native-gesture-handler';
import CircleTemp from './CircleTemp';
import CircleLight from './CircleLight';
type DeviceData = {
  room: string;
  devices: string
  name: string
  
};

type Props = {
  onScreenChange: (screenNumber: number) => void;
  deviceData: DeviceData | null;
};
const SmartpotDevice = ({onScreenChange, deviceData }: Props) => {
  const [selectedOption, setSelectedOption] = useState('1');
  
  const devices = deviceData?.devices || [];
  const deviceCount = devices.length;
  const selectedDevice = devices.find(
    (device: { id: string }) => device.id === selectedOption
  );
  const selectedData = selectedDevice ? selectedDevice : "";
  const [selectedScreen, setSelectedScreen] = useState(0);

  const handleOptionSelect = (id:string) => {
    setSelectedOption(id);
  };
  const handlePress = () => {
    onScreenChange(0) 
  };
  const renderItem = ({
    item,
  }: {
    item: { id: string; name: string; light: string };
  }) => (
    <TouchableOpacity
      onPress={() => handleOptionSelect(item.id)}
      style={{ height: 40, width: 140 }}
    >
      <View
        style={{
          alignItems: "center",
          gap: 8,
          alignContent: "space-between",
          height: 30,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: selectedOption === item.id ? "#86ba1c" : "#4c4c4c",
            fontWeight: selectedOption === item.id ? "600" : "200",
          }}
        >
          {item.name}
        </Text>
        {selectedOption === item.id && (
          <View
            style={{
              width: 32,
              height: 5,
              borderRadius: 3,
              backgroundColor: "#9ac93a",
              shadowColor: "#619100",
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.4,
              shadowRadius: 1,
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
  

  return (
    <View style={{flex:1, borderBottomRightRadius:22, borderBottomLeftRadius:22,top:-50}} >
      <View style={{flex:0.6,backgroundColor:'#C1FC49'}}>
        <View style={{top:50,flexDirection:'row',justifyContent:'space-between',marginHorizontal:24,alignItems:'center'}}>
          <TouchableOpacity onPress={handlePress}>
            <Ionicons name="chevron-back-circle-outline" size={42} color="#2a6f29" />
          </TouchableOpacity>
          <View style={{flexDirection:'column',alignItems:'center'}}>
            <Text style={{fontSize:22,fontWeight:'600'}}>{deviceData?.room}</Text>
            <Text style={{fontSize:18,fontWeight:'300',color:'#4c4c4c'}}>Total {deviceCount} Device paired</Text>
          </View>
          <FontAwesomeIcon icon={icon({ name: 'ellipsis' })} style={{ opacity: 0.9, color: '#2a6f29',width:50,height:50 }}  /> 
        </View>
      </View>

      <View style={{flex:0.5, flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,backgroundColor:'#C1FC49'}}>

      <FlatList
        horizontal
        data={devices as { id: string; name: string;light: string }[]}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}
      />
      </View>

      <View style={{flex:2,alignContent:'center',alignItems:'center',justifyContent:'center',backgroundColor:'#C1FC49',borderBottomLeftRadius:90}}>  
        {selectedScreen === 0 ? (    
            <CircleTemp temperature={selectedData.temp} kind={selectedData.kind} timeAdd={selectedData.timeAdd}/> 
        ) : selectedScreen === 1 ? (
            <CircleLight/>
        ): null}
      </View>

      <View style={{flex:2.4}}>
        
      <View style={{top:20,height:150,marginHorizontal:24,justifyContent:'center', alignItems:'center',flexDirection:'row',borderRadius:20,gap:18}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{paddingLeft: 16, paddingRight: 16}}>

        <TouchableOpacity style={{width:110, height:130, backgroundColor:'#C1FC49',paddingLeft:8,paddingTop:8,borderRadius:12,marginLeft: 8, marginRight: 8,}} onPress={() => setSelectedScreen(0)}> 
          <View style={{flexDirection:'row', gap:8}}>
          <View style={{width:30, aspectRatio:1, borderRadius:20, backgroundColor:'#619100',justifyContent:'center',alignItems:'center'}}>
          <FontAwesomeIcon icon={icon({ name: 'temperature-half' })} size={18} color='#C1FC49'  /> 
            </View>
              <Text style={{fontSize:16,fontWeight:'600',color:'#86ba1c'}}>Temp</Text>
            </View>
              <View style={{alignContent:'center',top:4}}>
                <Text style={{fontSize:38,fontWeight:'600',color:'#86ba1c'}}>{selectedData.temp} C</Text>
              </View>
              <View style={{alignContent:'center', alignItems:'center',height:20,width:60,justifyContent:'center',top:1, borderRadius: 20, backgroundColor:'white',}}>
                  <Text style={{fontSize:12,color:'#86ba1c'}}>R 20-70%</Text>
              </View>
              <View style={{alignContent:'center', alignItems:'center',top:8}}>
               <FontAwesomeIcon icon={icon({ name: 'circle-check' })} size={18} color='#86ba1c'  /> 
              </View>
              
        </TouchableOpacity>
        
        
        <TouchableOpacity style={{width:110, height:130, backgroundColor:'#C1FC49',paddingLeft:8,paddingTop:8,borderRadius:12,marginLeft: 8, marginRight: 8}} onPress={() => setSelectedScreen(1)}> 
          <View style={{flexDirection:'row', gap:8}}>
          <View style={{width:30, aspectRatio:1, borderRadius:20, backgroundColor:'#619100',justifyContent:'center',alignItems:'center'}}>
          <FontAwesomeIcon icon={icon({ name: 'sun' })} size={18} color='#C1FC49'  /> 
            </View>
              <Text style={{fontSize:16,fontWeight:'600',color:'#86ba1c'}}>Light</Text>
            </View>
              <View style={{alignContent:'center',top:4}}>
                <Text style={{fontSize:38,fontWeight:'600',color:'#86ba1c'}}>{selectedData.light} %</Text>
              </View>
              <View style={{alignContent:'center', alignItems:'center',height:20,width:60,justifyContent:'center',top:1, borderRadius: 20, backgroundColor:'white',}}>
                  <Text style={{fontSize:12,color:'#86ba1c'}}>R 20-70%</Text>
              </View>
              <View style={{alignContent:'center', alignItems:'center',top:8}}>
               <FontAwesomeIcon icon={icon({ name: 'circle-check' })} size={18} color='#86ba1c'  /> 
              </View>
              
        </TouchableOpacity>
        
        <View style={styles.cardContainer}> 
          <View style={styles.cardHeadContainer}>
          <View style={{width:30, aspectRatio:1, borderRadius:20, backgroundColor:'#619100',justifyContent:'center',alignItems:'center'}}>
          <FontAwesomeIcon icon={icon({ name: 'droplet' })} size={18} color='#C1FC49'  /> 
            </View>
              <Text style={{width:56,fontSize:16,fontWeight:'600',color:'#86ba1c'}}>Soil Moisture</Text>
            </View>
              <View style={{alignContent:'center', alignItems:'center',top:4}}>
                <Text style={{fontSize:38,fontWeight:'600',color:'#86ba1c'}}>{selectedData.soil} %</Text>
              </View>
              <View style={{alignContent:'center', alignItems:'center',top:1}}>
                  <Text style={{fontSize:12,color:'#86ba1c'}}>R 20-70%</Text>
              </View>
              <View style={{alignContent:'center', alignItems:'center',top:8}}>
               <FontAwesomeIcon icon={icon({ name: 'circle-check' })} size={18} color='#86ba1c'  /> 
              </View>
              
        </View>

        <View style={styles.cardContainer}> 
          <View style={styles.cardHeadContainer}>
          <View style={{width:30, aspectRatio:1, borderRadius:20, backgroundColor:'#619100',justifyContent:'center',alignItems:'center'}}>
          <FontAwesomeIcon icon={icon({ name: 'cloud' })} size={18} color='#C1FC49'  /> 
            </View>
              <Text style={{ width:58,fontSize:16,fontWeight:'600',color:'#86ba1c'}}>Humidity
              </Text>
            </View>
              <View style={{alignContent:'center', alignItems:'center',top:4}}>
                <Text style={{fontSize:38,fontWeight:'600',color:'#86ba1c'}}>{selectedData.RH} RH</Text>
              </View>
              <View style={{alignContent:'center', alignItems:'center',top:1}}>
                  <Text style={{fontSize:12,color:'#86ba1c'}}>R 2-7 RH</Text>
              </View>
              <View style={{alignContent:'center', alignItems:'center',top:8}}>
               <FontAwesomeIcon icon={icon({ name: 'circle-check' })} size={18} color='#86ba1c'  /> 
              </View>
              
        </View>
        </ScrollView>

        </View>

      </View>
    
      
    </View>
  )
}

export default SmartpotDevice


const { width,height } = Dimensions.get("window");
const styles = StyleSheet.create({
  headStyle: {
    fontSize: 32,
    fontWeight: "600",
  },
  cardContainer: {
    width: width/3.3,
    height: 130,
    backgroundColor: "#C1FC49",
    paddingLeft: 8,
    paddingTop: 8,
    borderRadius: 12,
    marginLeft: 8,
    marginRight: 8,
  },
  cardHeadContainer: {
    flexDirection: "row",
    gap: 4,
  },
});