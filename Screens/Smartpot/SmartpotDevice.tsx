import { View, Text, TouchableOpacity,StyleSheet, FlatList, Dimensions, Platform, TextInput} from 'react-native'
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
      style={{ height: 20 , width: (Dimensions.get('window').width > 400 ? 170 : 140 ),justifyContent:'center'}}
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
            fontSize: (Dimensions.get('window').width > 400 ? 18 : 12 ),
            color: selectedOption === item.id ? "#86ba1c" : "#4c4c4c",
            fontWeight: selectedOption === item.id ? "600" : "200",
          }}
        >
          {item.name}
        </Text>
        {selectedOption === item.id && (
          <View
            style={{
              width: (Dimensions.get('window').width > 400 ? 32 : 22 ),
              height: (Dimensions.get('window').width > 400 ? 5 : 3 ),
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
  
  
  const { width,height } = Dimensions.get("window");
  return (
    <View style={{height:height,width:width}}>
    <View style={{flex:1}} >
      <View style={{flex:0.6,backgroundColor:BG_VIEW}}>
        <View style={styles.headContainerStyle}>
          <TouchableOpacity onPress={handlePress}>
            <Ionicons name="chevron-back-circle-outline" size={(Dimensions.get('window').width > 400 ? 38 : 28 )} color="#2a6f29" />
          </TouchableOpacity>
          <View style={{flexDirection:'column',alignItems:'center'}}>
            <Text style={styles.textHeadStyle600}>{deviceData?.room}</Text>
            <Text style={styles.textHeadStyle200}>Total {deviceCount} Device paired</Text>
          </View>
          <FontAwesomeIcon icon={icon({ name: 'ellipsis' })} style={{ opacity: 0.9, color: '#2a6f29' }}  /> 
        </View>
      </View>

      <View style={{flex:0.4, flexDirection:'row',justifyContent:'space-between',paddingHorizontal:18,backgroundColor:BG_VIEW}}>
        <FlatList
          horizontal
          data={devices as { id: string; name: string; light: string }[]}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ flexDirection: 'row', alignItems: 'center',alignContent:'center' }}
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
        
      <View style={{top:20,marginHorizontal:24,justifyContent:'center', alignItems:'center',flexDirection:'row',borderRadius:20,gap:18}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} >

      <TouchableOpacity style={styles.cardContainer} onPress={() => setSelectedScreen(0)}> 
          <View style={styles.cardHeadContainer}>
            <View style={styles.circleIconContainer}>
              <FontAwesomeIcon icon={icon({ name: 'temperature-half' })} size={(Dimensions.get('window').width > 400 ? 18 : 16)} color='#C1FC49'  /> 
            </View>
            <Text style={styles.textStyle300}>Temp</Text>
            </View>
              <View style={{alignContent:'center',top:4}}>
                <Text style={styles.textStyle600}>{selectedData.temp} C</Text>
              </View>
              <View style={styles.cardRangeContainer}>
                <Text style={styles.textStyle400}>R {selectedData.Rtemp}</Text>
              </View>
              <View style={styles.circleCheckContainer}>
                <FontAwesomeIcon icon={icon({ name: 'circle-check' })} size={(Dimensions.get('window').width > 400 ? 18 : 12 )} color='#86ba1c'  /> 
              </View>
        </TouchableOpacity>
        
        
        <TouchableOpacity style={styles.cardContainer} onPress={() => setSelectedScreen(1)}> 
          <View style={styles.cardHeadContainer}>
            <View style={styles.circleIconContainer}>
              <FontAwesomeIcon icon={icon({ name: 'sun' })} size={(Dimensions.get('window').width > 400 ? 18 : 16)} color='#C1FC49'  /> 
            </View>
           
            <Text style={styles.textStyle300}>Light</Text>
            </View>
              <View style={{alignContent:'center',top:4}}>
                <Text style={styles.textStyle600}>{selectedData.light} %</Text>
              </View>
              <View style={styles.cardRangeContainer}>
                <Text style={styles.textStyle400}>R 20-70%</Text>
              </View>
              <View style={styles.circleCheckContainer}>
                <FontAwesomeIcon icon={icon({ name: 'circle-check' })} size={(Dimensions.get('window').width > 400 ? 18 : 12 )} color='#86ba1c'  /> 
              </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.cardContainer} onPress={() => setSelectedScreen(1)}> 
          <View style={styles.cardHeadContainer}>
            <View style={styles.circleIconContainer}>
              <FontAwesomeIcon icon={icon({ name: 'droplet' })} size={(Dimensions.get('window').width > 400 ? 18 : 16)} color='#C1FC49'  /> 
            </View>
            
            <Text numberOfLines={2} style={styles.textStyle300}>Soil</Text>

            </View>
              <View style={{alignContent:'center',top:4}}>
                <Text style={styles.textStyle600}>{selectedData.soil} %</Text>
              </View>
              <View style={styles.cardRangeContainer}>
                <Text style={styles.textStyle400}>R 20-70%</Text>
              </View>
              <View style={styles.circleCheckContainer}>
                <FontAwesomeIcon icon={icon({ name: 'circle-check' })} size={(Dimensions.get('window').width > 400 ? 18 : 12 )} color='#86ba1c'  /> 
              </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cardContainer} onPress={() => setSelectedScreen(1)}> 
          <View style={styles.cardHeadContainer}>
            <View style={styles.circleIconContainer}>
              <FontAwesomeIcon icon={icon({ name: 'cloud' })} size={(Dimensions.get('window').width > 400 ? 18 : 16)} color='#C1FC49'  /> 
            </View>
            <Text numberOfLines={2} style={styles.textStyle300}>Humidity</Text>
            </View>
              <View style={{alignContent:'center',top:4}}>
                <Text style={styles.textStyle600}>{selectedData.RH} RH</Text>
              </View>
              <View style={styles.cardRangeContainer}>
                <Text style={styles.textStyle400}>R 20-70%</Text>
              </View>
              <View style={styles.circleCheckContainer}>
                <FontAwesomeIcon icon={icon({ name: 'circle-check' })} size={(Dimensions.get('window').width > 400 ? 18 : 12 )} color='#86ba1c'  /> 
              </View>
        </TouchableOpacity>
        </ScrollView>

        </View>

      </View>
    
      
    </View>
    </View>
  )
}

export default SmartpotDevice


const { width,height } = Dimensions.get("window");
const BG_VIEW = "#C1FC49"

const styles = StyleSheet.create({
  headContainerStyle: {
    flex: 0.6,
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24,
    alignItems: "center",
    backgroundColor:BG_VIEW,
    ...Platform.select({
      ios: {
        paddingTop: 40,
      },
      android: {
        paddingTop: 30,
      },
    }),
  },
  headStyle: {
    fontSize: 32,
    fontWeight: "600",
  },
  cardContainer: {
    width: width > 400 ? 120 : 90,
    height: width > 400 ? 140 : 110,
    backgroundColor: BG_VIEW,
    paddingLeft: 8,
    paddingTop: 8,
    borderRadius: 18,
    marginLeft: 8,
    marginRight: 8,
  },
  cardHeadContainer: {
    flexDirection: "row",
    gap: 4,
  },
  cardRangeContainer: {
    alignContent: "center",
    alignItems: "center",
    height: width > 400 ? 20 : 16,
    width: width > 400 ? 60 : 52,
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "white",
    top: 4,
  },
  circleCheckContainer: {
    alignContent: "center",
    alignItems: "center",
    top: 10,
  },
  circleIconContainer: {
    width: width > 400 ? 30 : 26,
    aspectRatio: 1,
    borderRadius: 20,
    backgroundColor: "#619100",
    justifyContent: "center",
    alignItems: "center",
  },
  textHeadStyle600: {
    fontSize: width > 400 ? 28 : 16,
    fontWeight: "600",
  },
  textHeadStyle200: {
    fontSize: width > 400 ? 22 : 12,
    fontWeight: "200",
  },
  textStyle600: {
    fontSize: width > 400 ? 32 : 22,
    fontWeight: "600",
    color: "#86ba1c",
  },
  textStyle400: {
    fontSize: width > 400 ? 12 : 10,
    fontWeight: "400",
    color: "#86ba1c",
  },
  textStyle300: {
    fontSize: width > 400 ? 16 : 12,
    fontWeight: "600",
    color: "#86ba1c",
  },
});