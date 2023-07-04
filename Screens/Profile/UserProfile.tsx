import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';

const UserProfile = () => {

  
  const data = [
    { id: '1', name: 'Item 1',date: '2024-05-03T15:50:58.342Z',icon:'add-circle-sharp',action:'Add Smartpot',results:'Leafi Marble Mozaic' },
    { id: '2', name: 'Item 2',date: '2024-06-04T06:59:58.342Z',icon:'add-circle-sharp',action:'Add Smartpot',results:'Leafi Marble Liquid' },
    { id: '3', name: 'Item 3',date: '2024-06-04T05:20:58.342Z',icon:'add-circle-sharp',action:'Add Smartpot',results:'Leafi Wood Walnut' },
    { id: '4', name: 'Item 4',date: '2024-06-04T04:45:58.342Z',icon:'scan-circle',action:'Scan Plants',results:'Maranta : Fusarium Wilt',percen:'92%'},
    { id: '5', name: 'Item 5',date: '2024-06-018T04:50:58.342Z',icon:'scan-circle',action:'Scan Plants',results:'Maranta : Powdery Mildew',percen:'82%'},
    { id: '6', name: 'Item 6',date: '2024-07-022T16:50:58.342Z',icon:'scan-circle',action:'Scan Plants',results:'Monstera : Spider Mites',percen:'87%'},
    // Add more items as needed
  ];
  const reversedData = [...data].reverse();
  
  const date = new Date();
  console.log(date)

  const renderItem = ({ item, index, data }) => {
    const dateOnly = new Date(item.date).toLocaleDateString('en-US', { day: 'numeric' });
    const monthsOnly = new Date(item.date).toLocaleDateString('en-US', { month: 'short' });
    const fullDate = new Date(item.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour:'numeric',minute:'numeric',});
  
    const isSameDay = index > 0 && new Date(item.date).getDate() === new Date(data[index - 1].date).getDate();
    const isNextDayDifferent = index < data.length - 1 && new Date(item.date).getDate() !== new Date(data[index + 1].date).getDate();
  
    return (
      <View style={{ padding: 2 }}>
        {!isSameDay && (
          <View style={{ flexDirection: 'row', height: 80,gap:8 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 24,fontWeight:'600' }}>{dateOnly}</Text>
              <Text style={{ fontSize: 18 }}>{monthsOnly}</Text>
            </View>
            <View style={{ flex: 0.22, alignContent: 'center', alignItems: 'center' }}>
                <View style={{width:18,aspectRatio:1,borderRadius:13,backgroundColor:'#94dc04',alignItems: 'center',justifyContent: 'center'}}>
                  <View style={{width:10,aspectRatio:1, borderRadius:20, backgroundColor:'white'}}></View>
                </View>
                <View style={{width:2, height:'100%', backgroundColor:'white'}}>
                </View>
            </View>
            <View style={{ flex: 3}}>
              <View style={{ backgroundColor: 'white', height: 60, marginHorizontal: 8, marginVertical: 2, borderRadius: 12, justifyContent:'center',
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
              padding:10 }}>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                  <View style={{gap:4}}>
                    <Text>{item.action}</Text>
                    <Text style={{fontSize:16,fontWeight:'600'}}>{item.results}</Text>
                    <Text style={{fontSize:12}}>{fullDate}</Text>
                  </View>
                    <Ionicons name={item.icon} size={26} color="#83C303" />
                </View>
              </View>
            </View>
          </View>
        )}
  
        {isSameDay && !isNextDayDifferent && (
          <View style={{ flexDirection: 'row', height: 80,gap:8 }}>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 0.2, alignContent: 'center', alignItems: 'center' }}>
               
                <View style={{width:2, height:'100%', backgroundColor:'white'}}>
                </View>
            </View>
            <View style={{ flex: 3}}>
              <View style={{ backgroundColor: 'white', height: 60, marginHorizontal: 8, marginVertical: 2, borderRadius: 12, justifyContent:'center',
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
              padding:10 }}>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                  <View style={{gap:4}}>
                    <Text>{item.action}</Text>
                    <Text style={{fontSize:16,fontWeight:'600'}}>{item.results}</Text>
                    <Text style={{fontSize:12}}>{fullDate}</Text>
                  </View>
                    <Ionicons name={item.icon} size={26} color="#83C303" />
                </View>
              </View>
            </View>
          </View>
        )}
  
        {isSameDay && isNextDayDifferent && (
          <View style={{ flexDirection: 'row', height: 80,gap:8 }}>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 0.2, alignContent: 'center', alignItems: 'center' }}>
                
                <View style={{width:2, height:'100%', backgroundColor:'white'}}>
                </View>
            </View>
            <View style={{ flex: 3}}>
              <View style={{ backgroundColor: 'white', height: 60, marginHorizontal: 8, marginVertical: 2, borderRadius: 12, justifyContent:'center',
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
              padding:10 }}>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                  <View style={{gap:4}}>
                    <Text>{item.action}</Text>
                    <Text style={{fontSize:16,fontWeight:'600'}}>{item.results}</Text>
                    <Text style={{fontSize:12}}>{fullDate}</Text>
                  </View>
                    <Ionicons name={item.icon} size={26} color="#83C303" />
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (

    <View style={{flex:1, borderBottomRightRadius:22, borderBottomLeftRadius:22}} >
    
    <View style={{flex:1,top:-50,backgroundColor:'#C1FC49',borderBottomRightRadius:30,borderBottomLeftRadius:30,paddingTop:50}} >

    <View style={{flexDirection:"row",
            alignItems: "center",
            justifyContent:"space-between",paddingHorizontal:24}}>
        <Text style={{fontSize:28,fontWeight:'600'}}>Profile</Text>
        <View style={{width:42,aspectRatio:1,borderRadius:20,borderWidth:1,alignContent:'center',justifyContent:'center',alignItems:'center',borderColor:'#75af02'}}>
          <Ionicons name="settings-sharp" size={28} color="#75af02" />
        </View>
      </View>

    <View style={{alignContent: 'space-between',alignItems:'center'}}> 
        <View style={{top:12,gap:12,alignContent: 'space-between',alignItems:'center'}}>
            <View style={{width:80, aspectRatio:1, borderRadius:50, backgroundColor:'white'}}>
              </View>
            <Text style={{fontSize:24,fontWeight:'600'}}>username</Text>
          <Text style={{fontSize:18,fontWeight:'400'}}>Member</Text>
        </View>
    </View>
    </View>

    <View style={{flex:2.7,paddingHorizontal:24,gap:12}} >


          <View style={{top:-20,height:280,gap:12}}>
            <Text style={{fontSize:22,fontWeight:'600'}}>Activity</Text>
            <FlatList
                data={reversedData}
                renderItem={({ item, index }) => renderItem({ item, index, data: reversedData })}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
              />
            

          </View>


          <View style={{gap:12}}>
              <View style={{flexDirection:"row",
                alignItems: "center",
                justifyContent:"space-between"}}>
                <Text style={{fontSize:22,fontWeight:'600'}}>My Smartpot</Text>
                <TouchableOpacity>
                  <Text style={{fontSize:18}}>See all</Text>
                </TouchableOpacity>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{gap:12,flexDirection:'row'}}>
                <View style={{height:52,width:220,borderRadius:28,backgroundColor:'#a9de3d',flexDirection:'row', alignItems:'center',paddingHorizontal:7}}>
                    <View style={{width:38, aspectRatio:1, borderRadius:20, backgroundColor:'white'}}>
                    </View>
                      <View style={{flexDirection:'column',gap:4}}>
                        <Text style={{fontSize:16,color:'white',fontWeight:'600'}}> Spider Plants</Text>
                        <Text style={{fontSize:14,color:'white',fontWeight:'400'}}> SmartPot At Bedroom</Text>
                      </View>
                </View>

                <View style={{height:52,width:220,borderRadius:28,backgroundColor:'#a9de3d',flexDirection:'row', alignItems:'center',paddingHorizontal:7}}>
                    <View style={{width:38, aspectRatio:1, borderRadius:20, backgroundColor:'white'}}>
                    </View>
                      <View style={{flexDirection:'column',gap:4}}>
                        <Text style={{fontSize:16,color:'white',fontWeight:'600'}}> Spider Plants</Text>
                        <Text style={{fontSize:14,color:'white',fontWeight:'400'}}> SmartPot At Bedroom</Text>
                      </View>
                </View>
                </View>
              </ScrollView>
          </View>

    </View>

    </View>
    




   
  )
}

export default UserProfile