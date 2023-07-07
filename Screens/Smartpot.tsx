import { View, Text, TouchableOpacity, FlatList} from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { ScrollView } from 'react-native-gesture-handler';
import CircleTemp from './CircleTemp';
import { red } from 'react-native-redash';
import { BlurView } from 'expo-blur';
const Smartpot = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const colorOptions = [
    'Leafi Wood Walnut',
    'Leafi Marble Liquid',
    'Leafi Marble White',
    'Leafi Marble Mozaic'
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
          <View style={{ width: 32, height: 5, borderRadius: 3, backgroundColor: '#9ac93a',shadowColor: '#619100',
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity:  0.4,
          shadowRadius: 1 }} />
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
      </View>
      <View style={{flex:2,alignContent:'center',alignItems:'center',justifyContent:'center',backgroundColor:'#C1FC49',borderBottomLeftRadius:90}}>  
      <CircleTemp /> 
      </View>

      <View style={{flex:2.4}}>
      <View style={{top:20,height:140,marginHorizontal:24,justifyContent:'center', alignItems:'center',flexDirection:'row',borderRadius:20,gap:18}}>
        <View style={{width:110, height:130, backgroundColor:'#C1FC49',paddingLeft:8,paddingTop:8,borderRadius:12}}> 
          <View style={{flexDirection:'row', gap:8}}>
          <View style={{width:30, aspectRatio:1, borderRadius:20, backgroundColor:'#619100',justifyContent:'center',alignItems:'center'}}>
          <FontAwesomeIcon icon={icon({ name: 'sun' })} size={18} color='#C1FC49'  /> 
            </View>
              <Text style={{fontSize:16,fontWeight:'600',color:'#86ba1c'}}>Light</Text>
            </View>
              <View style={{alignContent:'center', alignItems:'center',top:4}}>
                <Text style={{fontSize:38,fontWeight:'600',color:'#86ba1c'}}>50%</Text>
              </View>
              <View style={{alignContent:'center', alignItems:'center',top:1}}>
                  <Text style={{fontSize:12,color:'#86ba1c'}}>R 20-70%</Text>
              </View>
              <View style={{alignContent:'center', alignItems:'center',top:8}}>
               <FontAwesomeIcon icon={icon({ name: 'circle-check' })} size={18} color='#86ba1c'  /> 
              </View>
              
        </View>

        <View style={{width:110, height:130, backgroundColor:'#C1FC49',paddingLeft:8,paddingTop:8,borderRadius:12}}> 
          <View style={{flexDirection:'row', gap:4}}>
          <View style={{width:30, aspectRatio:1, borderRadius:20, backgroundColor:'#619100',justifyContent:'center',alignItems:'center'}}>
          <FontAwesomeIcon icon={icon({ name: 'droplet' })} size={18} color='#C1FC49'  /> 
            </View>
              <Text style={{width:56,fontSize:16,fontWeight:'600',color:'#86ba1c'}}>Soil Moisture</Text>
            </View>
              <View style={{alignContent:'center', alignItems:'center',top:4}}>
                <Text style={{fontSize:38,fontWeight:'600',color:'#86ba1c'}}>66%</Text>
              </View>
              <View style={{alignContent:'center', alignItems:'center',top:1}}>
                  <Text style={{fontSize:12,color:'#86ba1c'}}>R 20-70%</Text>
              </View>
              <View style={{alignContent:'center', alignItems:'center',top:8}}>
               <FontAwesomeIcon icon={icon({ name: 'circle-check' })} size={18} color='#86ba1c'  /> 
              </View>
              
        </View>

        <View style={{width:110, height:130, backgroundColor:'#C1FC49',paddingLeft:8,paddingTop:8,borderRadius:12}}> 
          <View style={{flexDirection:'row', gap:4}}>
          <View style={{width:30, aspectRatio:1, borderRadius:20, backgroundColor:'#619100',justifyContent:'center',alignItems:'center'}}>
          <FontAwesomeIcon icon={icon({ name: 'cloud' })} size={18} color='#C1FC49'  /> 
            </View>
              <Text style={{ width:58,fontSize:16,fontWeight:'600',color:'#86ba1c'}}>Humidity
              </Text>
            </View>
              <View style={{alignContent:'center', alignItems:'center',top:4}}>
                <Text style={{fontSize:38,fontWeight:'600',color:'#86ba1c'}}>4 RH</Text>
              </View>
              <View style={{alignContent:'center', alignItems:'center',top:1}}>
                  <Text style={{fontSize:12,color:'#86ba1c'}}>R 2-7 RH</Text>
              </View>
              <View style={{alignContent:'center', alignItems:'center',top:8}}>
               <FontAwesomeIcon icon={icon({ name: 'circle-check' })} size={18} color='#86ba1c'  /> 
              </View>
              
        </View>
          
        </View>

      </View>
    
      
    </View>
  )
}

export default Smartpot