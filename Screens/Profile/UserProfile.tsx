import { View, Text, TouchableOpacity, FlatList, Platform, Dimensions,StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';



const UserProfile = () => {
  
  const data = [
    { id: '1', name: 'Item 1',date: '2024-05-03T15:50:58.342Z',icon:'add-circle-sharp',action:'Add Smartpot',results:'Leafi Marble Mozaic' },
    { id: '2', name: 'Item 2',date: '2024-06-04T06:59:58.342Z',icon:'add-circle-sharp',action:'Add Smartpot',results:'Leafi Marble Liquid' },
    { id: '3', name: 'Item 3',date: '2024-06-04T05:20:58.342Z',icon:'add-circle-sharp',action:'Add Smartpot',results:'Leafi Wood Walnut' },
    { id: '4', name: 'Item 4',date: '2024-06-04T04:45:58.342Z',icon:'scan-circle',action:'Scan Plants',results:'Maranta : Fusarium Wilt',percen:'92%'},
    { id: '5', name: 'Item 5',date: '2024-06-18T04:50:58.342Z',icon:'scan-circle',action:'Scan Plants',results:'Maranta : Powdery Mildew',percen:'82%'},
    { id: '6', name: 'Item 6',date: '2024-07-22T16:50:58.342Z',icon:'scan-circle',action:'Scan Plants',results:'Monstera : Spider Mites',percen:'87%'},
    // Add more items as needed
  ];
  const reversedData = [...data].reverse();

  const renderItem = ({ item, index, data }: { item: typeof data[number]; index: number; data: typeof reversedData;icon: string }) => {
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
              <Text style={styles.textStyle2}>{dateOnly}</Text>
              <Text style={styles.textStyle4}>{monthsOnly}</Text>
            </View>
            <View style={{ flex: 0.22, alignContent: 'center', alignItems: 'center' }}>
                <View style={styles.circleRadio1}>
                  <View style={styles.circleRadio2}></View>
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
                  <View style={{gap:2}}>
                    <Text style={styles.textStyle4}>{item.action}</Text>
                    <Text style={styles.textStyle5}>{item.results}</Text>
                    <Text style={styles.textStyle6}>{fullDate}</Text>
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
                    <Text style={styles.textStyle4}>{item.action}</Text>
                    <Text style={styles.textStyle5}>{item.results}</Text>
                    <Text style={styles.textStyle6}>{fullDate}</Text>
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
                  <View style={{gap:3}}>
                    <Text style={styles.textStyle4}>{item.action}</Text>
                    <Text style={styles.textStyle5}>{item.results}</Text>
                    <Text style={styles.textStyle6}>{fullDate}</Text>
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
    
    <View style={styles.headContainerStyle} >

    <View style={{flexDirection:"row",
            alignItems: "center",
            justifyContent:"space-between",paddingHorizontal:24}}>
        <Text style={styles.textStyle1}>Profile</Text>
        <View style={{width:(Dimensions.get('window').width > 400 ? 40 : 30),aspectRatio:1,borderRadius:20,borderWidth:1,alignContent:'center',justifyContent:'center',alignItems:'center',borderColor:'#75af02'}}>
          <Ionicons name="settings-sharp" size={(Dimensions.get('window').width > 400 ? 28 : 20)} color="#75af02" />
        </View>
      </View>

    <View style={{alignContent: 'space-between',alignItems:'center'}}> 
        <View style={{top:12,gap:12,alignContent: 'space-between',alignItems:'center'}}>
            <View style={styles.PictureStyle}>
              </View>
            <Text style={styles.textStyle2}>username</Text>
          <Text style={styles.textStyle3}>Member</Text>
        </View>
    </View>
    </View>

    <View style={{flex:2.7,paddingHorizontal:24,gap:12}} >

          <View style={{top:-20,height:280,gap:12}}>
            <Text style={styles.textStyle2}>Activity</Text>
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
                <Text style={styles.textStyle2}>My Smartpot</Text>
                <TouchableOpacity>
                  <Text style={styles.textStyle5}>See all</Text>
                </TouchableOpacity>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{gap:12,flexDirection:'row'}}>
                <View style={styles.mySmartpotContainer}>
                    <View style={styles.mySmartpotContainerImage}>
                    </View>
                      <View style={{flexDirection:'column',gap:4}}>
                        <Text style={styles.textStyle5}> Spider Plants</Text>
                        <Text style={styles.textStyle6}> SmartPot At Bedroom</Text>
                      </View>
                  </View>

                <View style={styles.mySmartpotContainer}>
                    <View style={styles.mySmartpotContainerImage}>
                    </View>
                      <View style={{flexDirection:'column',gap:4}}>
                        <Text style={styles.textStyle5}> Spider Plants</Text>
                        <Text style={styles.textStyle6}> SmartPot At Bedroom</Text>
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

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  headContainerStyle: {
    flex: 1,
    backgroundColor: "#C1FC49",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    top: -50,
    ...Platform.select({
      ios: {
        paddingTop: 40,
      },
      android: {
        paddingTop: 80,
      },
    }),
  },
  PictureStyle: {
    width: width > 400 ? 80 : 60,
    aspectRatio: 1,
    borderRadius: 50,
    backgroundColor: "white",
  },
  mySmartpotContainer: {
    height: width > 400 ? 52 : 40,
    width: width > 400 ? 220 : 190,
    borderRadius: 28,
    backgroundColor: "#a9de3d",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 7,
  },
  mySmartpotContainerImage: {
    width: width > 400 ? 38 : 28,
    aspectRatio: 1,
    borderRadius: 20,
    backgroundColor: "white",
  },
  circleRadio1: {
    width: width > 400 ? 18 : 14,
    aspectRatio: 1,
    borderRadius: 13,
    backgroundColor: "#94dc04",
    alignItems: "center",
    justifyContent: "center",
  },
  circleRadio2: {
    width: width > 400 ? 10 : 8,
    aspectRatio: 1,
    borderRadius: 20,
    backgroundColor: "white",
  },
  textStyle1: {
    fontSize: width > 400 ? 28 : 18,
    fontWeight: "600",
  },
  textStyle2: {
    fontSize: width > 400 ? 24 : 16,
    fontWeight: "600",
  },
  textStyle3: {
    fontSize: width > 400 ? 20 : 12,
    fontWeight: "400",
  },
  textStyle4: {
    fontSize: width > 400 ? 16 : 12,
    fontWeight: "400",
  },
  textStyle5: {
    fontSize: width > 400 ? 16 : 12,
    fontWeight: "600",
  },
  textStyle6: {
    fontSize: width > 400 ? 14 : 10,
    fontWeight: "400",
  },
});