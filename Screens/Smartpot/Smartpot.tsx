import { View, Text, Dimensions, FlatList,StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Platform  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useTheme } from '../Profile/Settings/Account/ThemeContext';
import {theme,darkTheme} from '../../Style/style'

const BG = '#C1FC49'
const CARD_BG = '#91D600'
const CIRCLE_BG= '#86ba1c'
const ICO_BG = '#C1FC49'
type Props = {
    onScreenChange: (screenNumber: number) => void;
    onDeviceData: (data: any) => void;
  };
const Smartpot = ({onScreenChange,onDeviceData}: Props) => {
  const { isDarkMode } = useTheme();
  const selectedTheme = isDarkMode ? darkTheme : theme;
  const { colors, spacing, textVariants } = selectedTheme;

  const { width,height } = Dimensions.get("window");
  const [currentTime, setCurrentTime] = useState('');
  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedTime = now.toLocaleString([], { dateStyle: 'full'}); // Format the time as HH:MM
      setCurrentTime(formattedTime);

      const currentHour = now.getHours();
        if (currentHour >= 5 && currentHour < 12) {
        setGreeting('Good Morning');
        } else if (currentHour >= 12 && currentHour < 18) {
        setGreeting('Good Afternoon');
        } else if (currentHour >= 18 && currentHour < 24) {
        setGreeting('Good Evening');
        } else {
        setGreeting('Good Night');
        }
    }, 1); // Update every second

    return () => {
      clearInterval(interval);
    };
  }, []);
  
  const data3 = [
    {
      room: 'Kitchen',
      devices: [
        { id: '1', name: 'Leafi Wood Walnut',kind:'Monstera',light: '70',temp: '27',soil: '56',RH: '3',Rlight:'20-70',Rtemp:'20-30',timeAdd:'2023-04-03T15:50:58.342Z'},
        { id: '2', name: 'Leafi Wood Walnut',kind:'Spider',light: '72',temp: '26',soil: '76',RH: '2',Rlight:'20-70',Rtemp:'20-35',timeAdd:'2023-04-15T15:50:58.342Z' },
        { id: '3', name: 'Leafi Marble Liquid',kind:'Ric Rac',light: '80',temp: '28',soil: '67',RH: '4',Rlight:'20-70',Rtemp:'32-46',timeAdd:'2023-05-03T15:50:58.342Z' },
        { id: '4', name: 'Leafi Marble Mozaic',kind:'Monstera',light: '90',temp: '28',soil: '78',RH: '8',Rlight:'20-70',Rtemp:'20-32',timeAdd:'2023-05-04T15:50:58.342Z' },
      ],
    },
    {
      room: 'Bedroom',
      devices: [
        { id: '1', name: 'Leafi Marble Liquid',kind:'Ric Rac',light: '80',temp: '28',soil: '67',RH: '4',Rlight:'20-70' },
        { id: '2', name: 'Leafi Marble Mozaic',kind:'Monstera',light: '90',temp: '28',soil: '78',RH: '8',Rlight:'20-70' },
      ],
    },
    {
      room: 'Living Room',
      devices: [
        { id: '1', name: 'Leafi Wood Walnut',kind:'Monstera',light: '70',temp: '27',soil: '56',RH: '3',Rlight:'20-70' },
        { id: '2', name: 'Leafi Wood Mozaic',kind:'Monstera',light: '72',temp: '26',soil: '76',RH: '2.6',Rlight:'20-70' },
        { id: '3', name: 'Leafi Marble Liquid',kind:'Ric Rac',light: '80',temp: '28',soil: '67',RH: '4',Rlight:'20-70' },

      ],
    }
  ];


  const getDeviceCountByRoom = (room: string) => {
    const foundRoom = data3.find((item) => item.room === room);
    return foundRoom ? foundRoom.devices.length : 0;
  };


  const renderItem =  ({ item }: { item: any }) => {
    const deviceCount = getDeviceCountByRoom(item.room);
    const handlePress = () => {
      onScreenChange(1)
      onDeviceData(item)
    };
    return (
      
      <View style={styles.cardContainer}>
          <View style={{alignItems:'flex-end'}}>
            <TouchableOpacity style={styles.buttonUpRight} onPress={handlePress}>
              <FontAwesomeIcon icon={icon({ name: 'arrow-right' })} size={(Dimensions.get('window').width > 400 ? 22 : 16 )} color={ICO_BG}/> 
            </TouchableOpacity>
          </View>
          <View style={{justifyContent:'center',alignItems:'center'}}>
            <Text style={styles.textStyle600}>{item.room}</Text> 
            <Text style={styles.textStyle400}>{deviceCount} Device</Text>
          </View>
          <View style={{alignItems:'flex-start'}}>
            <TouchableOpacity style={styles.buttonAddPlus}>
              <FontAwesomeIcon icon={icon({ name: 'plus' })} size={(Dimensions.get('window').width > 400 ? 22 : 16 )} color={ICO_BG}/> 
            </TouchableOpacity>
          </View>
      </View>
    );              
  };
  
  return (
    
    <View >
        <View style={{width:width,height:height,backgroundColor: colors.background}}>
        
        <View style={styles.headContainerStyle}>
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={[styles.headTextStyle,{fontSize:spacing.llll}]}>Smartpot</Text>
            </View>
            <View style={{marginHorizontal:24}}>
                <Text style={styles.textStyle600}>{greeting}</Text>
                <Text style={styles.textStyle400}>username</Text>
            </View>
            <View style={{justifyContent:'space-between',alignItems:'flex-end',marginHorizontal:24}}>
                <Text style={styles.textStyle300}>{currentTime}</Text>
            </View>
        </View>

       

        <View style={{flex:3,marginHorizontal:24,gap:10,top:20}}>
          <View style={{justifyContent:'center'}}>
                    <Text style={[styles.headTextStyle,{color: colors.textcolor, fontSize: spacing.llll}]}>Devices</Text>
          </View>

          <View style={{justifyContent:'center',alignItems:'center',top:8}}>
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

          <View style={{justifyContent:'center'}}>
          <Text style={[styles.headTextStyle, {color: colors.textcolor, fontSize: spacing.llll}]}>Alert</Text>
          </View>
        </View>
    </View>
    </View>
  )
}

export default Smartpot
const { width,height } = Dimensions.get("window");
const styles = StyleSheet.create({
  headContainerStyle: {
    flex: 0.6,
    alignContent: "center",
    backgroundColor: BG,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
    ...Platform.select({
      ios: {
        paddingTop: 40,
      },
      android: {
        paddingTop: 38,
      }
    })
  },
  headTextStyle: {
    fontWeight: "600",
  },
  textStyle600: {
    fontSize: width > 400 ? 24 : 16,
    fontWeight: "600",
  },
  textStyle400: {
    fontSize: width > 400 ? 16 : 12,
    fontWeight: "200",
  },
  textStyle300: {
    fontSize: width > 400 ? 16 : 12,
    fontWeight: "200",
  },
  listContainer: {
    height: height / 1,
    padding: 20,
  },
  itemContainer: {
    padding: 10,
    backgroundColor: CARD_BG,
    borderRadius: height / 45,
    flex: 3,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    width: width > 400 ? width / 2.9 : width / 3.2,
    fontWeight: "400",
    height: width > 400 ? width / 2.6 : width / 2.8,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: BG,
    padding: 10,
    borderRadius: 20,
    gap: width > 400 ? 20 : 8,
    margin: width > 400 ? 10 : 8,
  },
  buttonUpRight: {
    width: width > 400 ? 32 : 22,
    aspectRatio: 1,
    borderRadius: 20,
    backgroundColor: CIRCLE_BG,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "-45deg" }],
  },
  buttonAddPlus: {
    width: width > 400 ? 32 : 22,
    aspectRatio: 1,
    borderRadius: 20,
    backgroundColor: CIRCLE_BG,
    justifyContent: "center",
    alignItems: "center",
  },
});