import { View, Text, Dimensions, FlatList,StyleSheet, TouchableOpacity, SafeAreaView, ScrollView  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const BG = '#C1FC49'
const CARD_BG = '#91D600'
const VIEW_BG = 'white'

const SmartpotNavigator = () => {
  const { width,height } = Dimensions.get("window");
  const [currentTime, setCurrentTime] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedTime = now.toLocaleString([], { dateStyle: 'full'}); // Format the time as HH:MM
      setCurrentTime(formattedTime);

      const currentHour = now.getHours();
      if (currentHour >= 0 && currentHour < 12) {
        setGreeting('Morning');
      } else if (currentHour >= 12 && currentHour < 18) {
        setGreeting('Good Afternoon');
      } else {
        setGreeting('Good Evening');
      }
    }, 1000); // Update every second

    return () => {
      clearInterval(interval);
    };
  }, []);
 

  
  const data3 = [
    {
      room: 'Kitchen',
      devices: [
        { id: '1', name: 'Device 1' },
        { id: '2', name: 'Device 2' },
        { id: '3', name: 'Device 3' },
        { id: '4', name: 'Device 4' },
      ],
    },
    {
      room: 'Bedroom',
      devices: [
        { id: '1', name: 'Device 1' },
        { id: '2', name: 'Device 2' },
        { id: '3', name: 'Device 3' },
      ],
    },
    {
      room: 'Living Room',
      devices: [
        { id: '1', name: 'Device 1' },
        { id: '2', name: 'Device 2' },
        { id: '3', name: 'Device 3' },
        { id: '4', name: 'Device 4' },
      ],
    }
  ];


  const getDeviceCountByRoom = (room: string) => {
    const foundRoom = data3.find((item) => item.room === room);
    return foundRoom ? foundRoom.devices.length : 0;
  };


  const renderItem =  ({ item }: { item: any }) => {
    const deviceCount = getDeviceCountByRoom(item.room);
    return (
      <View style={{width:width/2.5,height:height/5,backgroundColor:CARD_BG,padding:10,borderRadius:20,margin:10}}>
          <View style={{justifyContent:'flex-end',alignItems:'flex-end'}}>
            <TouchableOpacity style={{width:40,aspectRatio:1,borderRadius:20,backgroundColor:'red',justifyContent:'center',alignItems:'center',transform:{rotate}}}>
              <FontAwesomeIcon icon={icon({ name: 'chevron-right' })} size={30} color='blue'   /> 
            </TouchableOpacity>
          </View>
          <View style={{justifyContent:'center',alignItems:'center',top:20}}>
            <Text style={styles.textStyle600}>{item.room}</Text>
            <Text>{deviceCount} Device</Text>
          </View>
      </View>
    );              
  };
  
  return (

    <SafeAreaView style={{paddingVertical:24,gap:24,backgroundColor:BG}}>
    <View style={{height:height,width:width}}>
      
      <View style={styles.headerContainer}>
        <View style={styles.headerContainer2}>
          <Text style={styles.headTextStyle}>Smartpot</Text>
        </View>
        <View style={styles.headercontainer3}>
         <Text style={styles.textStyle600}>{greeting}</Text>
          <Text style={styles.textStyle400}>username</Text>
        </View>
        <View style={styles.headercontainer4}>
           <Text>{currentTime}</Text>
        </View>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          horizontal={false}
          numColumns={2}
          data={data3}
          renderItem={renderItem}
          keyExtractor={(item) => item.room}
          contentContainerStyle={{
            alignSelf: 'flex-start',
          }}
        />
    </View>
    </View>
    </SafeAreaView>

  )
}

export default SmartpotNavigator
const { width,height } = Dimensions.get("window");

const styles = StyleSheet.create({
  
  headerContainer: {
    height:height/8,
    backgroundColor: BG,
    alignContent:'center',
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    
  },
  headerContainer2 : {
    justifyContent:'space-between',
    alignContent:'center',
    alignItems:'center',
  },
  headercontainer3 : {
    justifyContent:'space-between',
    alignContent:'center',
    alignItems:'flex-start',
    marginHorizontal:24
  },
  headercontainer4 : {
    justifyContent:'space-between',
    alignContent:'center',
    alignItems:'flex-end',
    marginHorizontal:24
  },
  headTextStyle: {
    fontSize:32,
    fontWeight:'600',
  },
  textStyle600: {
    fontSize:28,
    fontWeight:'500'
  },
  textStyle400: {
    fontSize:20,
    fontWeight:'200'
  },
  textStyle300: {
    fontSize:18,
    fontWeight:'400'
  },
  listContainer: {
    height:height/1,
    padding:20,
    backgroundColor: VIEW_BG
  },
  itemContainer: {
    padding: 10,
    backgroundColor: CARD_BG,
    borderRadius:height/45,
    height:height/4.5,
    width:width/2.5,
    margin: 10,
    justifyContent:'center',
    alignItems:'center'
  },

  itemTouch: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius:20,
    height:30,
    aspectRatio:1,
    justifyContent:'center',
    alignItems:'center'
  },
});