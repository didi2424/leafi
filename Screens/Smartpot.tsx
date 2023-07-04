import { View, Text, TouchableOpacity, FlatList} from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { ScrollView } from 'react-native-gesture-handler';


const Smartpot = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const colorOptions = [
    'Leafi Wood Walnut',
    'Leafi Marble Liquid',
    'Leafi Marble White',

  ];

  
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    console.log(option)
  };
  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity onPress={() => handleOptionSelect(item)}>
      <View style={{ flexDirection: 'column', alignItems: 'center', gap: 5,alignContent:'space-between' }}>
        <Text style={{ fontSize:14,color: selectedOption === item ? '#9ac93a' : 'black' }}>{item}</Text>
        {selectedOption === item && (
          <View style={{ width: 32, height: 5, borderRadius: 3, backgroundColor: '#9ac93a' }} />
        )}
      </View>
    </TouchableOpacity>
  
  );
  return (
    <View style={{flex:1, borderBottomRightRadius:22, borderBottomLeftRadius:22}} >
      <View style={{flex:0.6,backgroundColor:'#C1FC49'}}>
        <View style={{top:50,flexDirection:'row',justifyContent:'space-between',marginHorizontal:24,alignItems:'center'}}>
        <Ionicons name="chevron-back-circle-outline" size={32} color="black" />
          <View style={{flexDirection:'column',alignItems:'center'}}>
            <Text style={{fontSize:22,fontWeight:'600'}}>Kitchen Room</Text>
            <Text style={{fontSize:18,fontWeight:'300'}}>Total 3 Device paired</Text>
          </View>
          <FontAwesomeIcon icon={icon({ name: 'ellipsis' })} style={{ opacity: 0.9, color: '#2a6f29',width:40,height:40 }}  /> 
        </View>
      </View>

      <View style={{flex:0.2, flexDirection:'row',justifyContent:'space-between',marginHorizontal:20}}>

      <FlatList
      horizontal
      data={colorOptions}
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

      <View style={{flex:2,backgroundColor:'pink'}}>
        <View style={{flex:1,backgroundColor:'pink',flexDirection:'row'}}>
          <View style={{flex:1,backgroundColor:'pink'}}>
          </View>
          <View style={{flex:1,backgroundColor:'gray'}}>
          </View>
      
        </View>

      </View>

      <View style={{flex:2,backgroundColor:'yellow'}}>

      </View>
      
    </View>
  )
}

export default Smartpot