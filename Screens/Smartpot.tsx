import { View, Text, TouchableOpacity, FlatList} from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { ScrollView } from 'react-native-gesture-handler';
import Circlecustom from './Circlecustom';

const Smartpot = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const colorOptions = [
    'Leafi Wood Walnut',
    'Leafi Marble Liquid',
    'Leafi Marble White',
    'Leafi Marble Mozaic',

  ];

  
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    console.log(option)
  };
  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity onPress={() => handleOptionSelect(item)} style={{height:40,width:140}}>
      <View style={{  alignItems: 'center', gap: 8,alignContent:'space-between',height:30}}>
        <Text style={{ fontSize:18, color: selectedOption === item ? '#86ba1c' : '#4c4c4c', fontWeight: selectedOption === item ? '600' : '200'}}>{item}</Text>
        {selectedOption === item && (
          <View style={{ width: 32, height: 5, borderRadius: 3, backgroundColor: '#9ac93a',shadowColor: "#e0fda4",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65 }} />
        )}
      </View>
    </TouchableOpacity>
  
  );
  return (
    <View style={{flex:1, borderBottomRightRadius:22, borderBottomLeftRadius:22}} >
      <View style={{flex:0.6,backgroundColor:'#C1FC49'}}>
        <View style={{top:50,flexDirection:'row',justifyContent:'space-between',marginHorizontal:24,alignItems:'center'}}>
        <Ionicons name="chevron-back-circle-outline" size={42} color="#2a6f29" />
          <View style={{flexDirection:'column',alignItems:'center'}}>
            <Text style={{fontSize:22,fontWeight:'600'}}>Kitchen Room</Text>
            <Text style={{fontSize:18,fontWeight:'300',color:'#4c4c4c'}}>Total 4 Device paired</Text>
          </View>
          <FontAwesomeIcon icon={icon({ name: 'ellipsis' })} style={{ opacity: 0.9, color: '#2a6f29',width:50,height:50 }}  /> 
        </View>
      </View>

      <View style={{flex:0.3, flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,backgroundColor:'#C1FC49'}}>

      <FlatList
      horizontal
      data={colorOptions}
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={(item) => item}
      contentContainerStyle={{ flexDirection: 'row', alignItems: 'center',justifyContent:'space-between',gap:12}}
      />

      {/* <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20,justifyContent:'space-between' }}>
      {['Leafi Wood Walnut', 'Leafi Marble Liquid', 'Leafi Marble White'].map((option) => (
        <TouchableOpacity key={option} onPress={() => handleOptionSelect(option)} style={{flexDirection:'row'}}>
          <View style={{ flexDirection: 'column', alignItems: 'center', gap: 5 }}>
            <Text style={{ color: selectedOption === option ? '#9ac93a' : 'black' }}>{option}</Text>
            {selectedOption === option && (
              <View style={{ width: 32, height: 5, borderRadius: 3, backgroundColor: '#9ac93a' }} />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View> */}

      </View>

      <View style={{flex:2,backgroundColor:'pink',alignContent:'center',alignItems:'center',justifyContent:'center'}}>
      <Circlecustom /> 
      </View>

      <View style={{flex:2,backgroundColor:'yellow'}}>

      </View>
      
    </View>
  )
}

export default Smartpot