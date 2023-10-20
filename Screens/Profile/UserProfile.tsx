import { View, Text, TouchableOpacity, FlatList, Platform, Dimensions,StyleSheet, RefreshControl  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from './Settings/Account/ThemeContext';
import { theme, darkTheme } from '../../Style/style'
import { GetUser } from '../../ClientSideAPI/UserAPI';
import * as SecureStore from 'expo-secure-store';
import api from '../../ClientSideAPI/Api'; 
import Swipeable from "react-native-gesture-handler/Swipeable"
type Props = {
  onScreenChange: (screenNumber: number) => void;
};

const UserProfile = ({ onScreenChange  }: Props) => {
  const toUserSettings =() => {
    onScreenChange(4)
  }
  const { isDarkMode } = useTheme();
  const selectedTheme = isDarkMode ? darkTheme : theme;
  const { colors, spacing } = selectedTheme;

  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<any[]>([]);
  const [userActivityData, setUserActivityData] = useState<any[]>([]);
  const [activitynull, setActivityNotNull] = useState(false)

  const [refreshing, setRefreshing] = useState(false);

  

const getStoredToken = async () => {
  try {
    const storedToken = await SecureStore.getItemAsync('authenticationToken');
  
    if (storedToken) {
      // Token is available, set it in the state
      setToken(storedToken);
    } else {
      // Handle the case where no token is found
      console.error('No token found in SecureStore.');
    }
  } catch (error) {
    // Handle errors that may occur when accessing SecureStore
    console.error('Error retrieving token from SecureStore:', error);
  }
};

const getUser = async () => {
  
  if (token) {
    try {
      const response = await GetUser(token);
      setUserData(response);
    } catch (error) {
      // Handle different error cases here
      console.error('API call failed');
    }
  } else {
    console.error('Token is null. Cannot fetch user data.');
    // Handle the case where there is no valid token, e.g., display an error message
  }
};

const getActivity = () => {
  
  if (!token) {
    
    console.error('Token is null. Cannot fetch user data.');
    return;
  }

  const headers = {
    Authorization: `${token}`,
  };
  console.log(token)

  // Make an HTTP GET request to the API endpoint
  api.get('/Auth/usersactivity', { headers: headers })
  .then(response => {
    if (response.status === 200) {
      console.log('data respone',response.data.results);
      setActivityNotNull(false)
      setUserActivityData(response.data.results)
      setRefreshing(false); 
      
      // Handle the data from the response here if needed
    } else {
      console.log('Unexpected response status:', response.status);
    }
  })
  .catch(error => {
    if (error.response) {
      // The request was made and the server responded with a non-2xx status
        if (error.response.status === 401) {
        console.error('Unauthorized: Check your token and authentication');
        // Handle the unauthorized error here
      }
      else if (error.response.status === 404) {
        console.error('Activity Not Found');
        setActivityNotNull(true)
        // Handle the unauthorized error here
      }
    } else {
      // The request was not made, or something went wrong in the network
      console.error('Error:', error.message);
    }
  });
};


// Trigger getUser whenever the token changes
useEffect(() => {
  getStoredToken();
  if (token) {
    getUser();
    getActivity()
  }
}, [token]);

const handleEndReached = () => {
  // This function is called when the user scrolls to the end of the list.
  // You can use it to trigger a data refresh.
  getActivity();
};

const handleRefresh = () => {
  // This function is called when the user pulls down to refresh.
  // You can use it to refresh the data.
  setRefreshing(true);

  // Fetch fresh data here.
  getActivity();

  // After fetching data, update the 'data' state and reset the refreshing flag.
  // Example:
  // setData(newData);
  // setRefreshing(false);
};

  const reversedData = [...userActivityData].reverse();

  const dataWithKeys = reversedData.map((item, index) => ({
    ...item,
    key: `${index}`, // Generate unique keys using the index
  }));

  
const deleteActivity = (idactivity:number) => {
      if (!token) {
        console.error('Token is null. Cannot fetch user data.');
        return;
      }
      const headers = {
        Authorization: `${token}`,
      };
      const payload = {
        idActivity: idactivity
      }
      // Make an HTTP GET request to the API endpoint
      api.delete('/Auth/usersactivity',{ headers: headers, data: payload })
      .then(response => {
        if (response.status === 200) {
          console.log('Activity Deleted');
          getActivity();
          // Handle the data from the response here if needed
        } else {
          console.log('Unexpected response status:');
        }
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a non-2xx status
            if (error.response.status === 401) {
            console.error('Unauthorized: Check your token and authentication');
            // Handle the unauthorized error here
          }
          else if (error.response.status === 404) {
            console.error('Activity Not Found');
            // Handle the unauthorized error here
          }
        } else {
          // The request was not made, or something went wrong in the network
          console.error('Error:', error.message);
        }
      });
    }
  

  const renderItem = ({ item, index, data }: { item: typeof dataWithKeys[number]; index: number; data: typeof dataWithKeys;icon: string }) => {
    const dateOnly = new Date(item.date).toLocaleDateString('en-US', { day: 'numeric' });
    const monthsOnly = new Date(item.date).toLocaleDateString('en-US', { month: 'short' });
    const fullDate = new Date(item.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour:'numeric',minute:'numeric',});

    const isSameDay = index > 0 && new Date(item.date).getDate() === new Date(data[index - 1].date).getDate();
    const isNextDayDifferent = index < data.length - 1 && new Date(item.date).getDate() !== new Date(data[index + 1].date).getDate();
    
    

    const renderLeftActions = () =>  {
      return (
      <TouchableOpacity style={{backgroundColor:colors.buttoncolor,width: 60, height:58, borderRadius:20,justifyContent:'center', alignItems:'center',alignContent:'center'}} onPress={() => deleteActivity(item.idactivity)}>
          <Text>Delete</Text>
      </TouchableOpacity>
      )
    }

    return (
      <View style={{ padding: 2 }}>
        {!isSameDay && (
          <View style={{ flexDirection: 'row', height: 80, gap:8 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
              <Text style={[styles.textStyle2,{color: colors.textcolor}]}>{dateOnly}</Text>
              <Text style={[styles.textStyle4,{color: colors.textcolor}]}>{monthsOnly}</Text>
            </View>
            <View style={{ flex: 0.22, alignContent: 'center', alignItems: 'center' }}>
                <View style={styles.circleRadio1}>
                  <View style={styles.circleRadio2}></View>
                </View>
                <View style={{width:2, height:'100%', backgroundColor: colors.cardcolor}}>
                </View>
            </View>
            <View style={{ flex: 3}}>
            
            <Swipeable renderRightActions={() => renderLeftActions()}>
              <TouchableOpacity style={{ backgroundColor: colors.cardcolor, height: 60, marginHorizontal: 8, borderRadius: 12, justifyContent:'center',
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
                    <Text style={[styles.textStyle4,{color: colors.textcolor}]}>{item.action}</Text>
                    <Text style={[styles.textStyle5,{color: colors.textcolor}]}>{item.plantskind} : {item.diseasesname} </Text>
                    <Text style={[styles.textStyle6,{color: colors.textcolor}]}>{fullDate}</Text>
                  </View>
                    <Ionicons name={item.icon} size={26} color={colors.buttoncolor} />
                </View>
                
              </TouchableOpacity>
              </Swipeable>
            </View>
          </View>
        )}
  
        {isSameDay && !isNextDayDifferent && (
          <View style={{ flexDirection: 'row', height: 80,gap:8 }}>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 0.2, alignContent: 'center', alignItems: 'center' }}>
                <View style={{width:2, height:'100%', backgroundColor: colors.cardcolor}}>
                </View>
            </View>
            <View style={{ flex: 3}}>
            <Swipeable renderRightActions={() => renderLeftActions()}>
              <TouchableOpacity style={{ backgroundColor: colors.cardcolor, height: 60, marginHorizontal: 8, borderRadius: 12, justifyContent:'center',
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
                    <Text style={[styles.textStyle4,{color: colors.textcolor}]}>{item.action}</Text>
                    <Text style={[styles.textStyle5,{color: colors.textcolor}]}>{item.plantskind} : {item.diseasesname} </Text>
                    <Text style={[styles.textStyle6,{color: colors.textcolor}]}>{fullDate}</Text>
                  </View>
                    <Ionicons name={item.icon} size={26} color={colors.buttoncolor} />
                </View>
              </TouchableOpacity>
              </Swipeable>
            </View>
          </View>
        )}
  
        {isSameDay && isNextDayDifferent && (
          <View style={{ flexDirection: 'row', height: 80,gap:8 }}>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 0.2, alignContent: 'center', alignItems: 'center' }}>
                
                <View style={{width:2, height:'100%', backgroundColor: colors.cardcolor}}>
                </View>
            </View>
            <View style={{ flex: 3}}>
            <Swipeable renderRightActions={() => renderLeftActions()}>
              <TouchableOpacity style={{ backgroundColor: colors.cardcolor, height: 60, marginHorizontal: 8, borderRadius: 12, justifyContent:'center',
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
                    <Text style={[styles.textStyle4,{color: colors.textcolor}]}>{item.action}</Text>
                    <Text style={[styles.textStyle5,{color: colors.textcolor}]}>{item.plantskind} : {item.diseasesname} </Text>
                    <Text style={[styles.textStyle6,{color: colors.textcolor}]}>{fullDate}</Text>
                  </View>
                    <Ionicons name={item.icon} size={26} color={colors.buttoncolor} />
                </View>
              </TouchableOpacity>
              </Swipeable>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (

    <View style={{height:height, borderBottomRightRadius:22, borderBottomLeftRadius:22}} >
    
    <View style={styles.headContainerStyle} >

    <View style={{flexDirection:"row",
            alignItems: "center",
            justifyContent:"space-between",paddingHorizontal:24}}>
        <Text style={[styles.textStyle1,{fontSize: spacing.llll}]}>Profile</Text>
        <TouchableOpacity style={{width:(Dimensions.get('window').width > 400 ? 40 : 30),aspectRatio:1,borderRadius:20,borderWidth:1,alignContent:'center',justifyContent:'center',alignItems:'center',borderColor:'#75af02'}} onPress={toUserSettings}>
          <Ionicons name="settings-sharp" size={(Dimensions.get('window').width > 400 ? 28 : 20)} color="#75af02" />
        </TouchableOpacity>
      </View>

    <View style={{alignContent: 'space-between',alignItems:'center'}}> 
        <View style={{top:12,gap:12,alignContent: 'space-between',alignItems:'center'}}>
            <View style={styles.PictureStyle}>
              </View>
              {userData.map((user, index) => (
                <>
                <Text key={index} style={styles.textStyle2}>{user.firstname + ' ' + user.lastname}</Text>
                {user.RoleID === 1 && (
                  <Text style={styles.textStyle3}>Botanis</Text>
                )}
                {user.RoleID === 2 && (
                  <Text style={styles.textStyle3}>Member</Text>
                )}
                {user.RoleID === 3 && (
                  <Text style={styles.textStyle3}>Admin</Text>
                )}
                </>
              ))}
        </View>
    </View>
    </View>

    <View style={{flex:2.7,paddingHorizontal:24,gap:12}} >

          <View style={{top:-20,height:280,gap:12}}>
            <Text style={[styles.textStyle2,{color: colors.textcolor, fontSize: spacing.llll}]}>Activity</Text>
            
            {activitynull ? (
            <View style={{justifyContent:'center', alignItems:'center'}}>
               <Text style={{color: colors.textcolor, fontSize: spacing.ll}}>Activity Not Found</Text>
             </View>
            ) : (
            <FlatList
                  data={dataWithKeys}
                  renderItem={({ item, index }) => renderItem({ item, index, data: dataWithKeys })}
                  keyExtractor={(item) => item.key} 
                  showsVerticalScrollIndicator={false}
                  onEndReached={handleEndReached}
                  onEndReachedThreshold={0.1}
                  refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                  }
                />
              )
            }
            
          </View>

          <View style={{gap:12}}>
              <View style={{flexDirection:"row",
                alignItems: "center",
                justifyContent:"space-between"}}>
                <Text style={[styles.textStyle2,{color: colors.textcolor,fontSize: spacing.llll}]}>My Smartpot</Text>
                <TouchableOpacity>
                  <Text style={[styles.textStyle5,{color: colors.textcolor}]}>See all</Text>
                </TouchableOpacity>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{gap:12,flexDirection:'row'}}>
                <View style={styles.mySmartpotContainer}>
                    <View style={styles.mySmartpotContainerImage}>
                    </View>
                      <View style={{flexDirection:'column',gap:4}}>
                        <Text style={styles.textStyle5}>Spider Plants</Text>
                        <Text style={styles.textStyle6}>SmartPot At Bedroom</Text>
                      </View>
                  </View>

                <View style={styles.mySmartpotContainer}>
                    <View style={styles.mySmartpotContainerImage}>
                    </View>
                      <View style={{flexDirection:'column',gap:4}}>
                        <Text style={styles.textStyle5}>Spider Plants</Text>
                        <Text style={styles.textStyle6}>SmartPot At Bedroom</Text>
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

const { width,height } = Dimensions.get("window");

const styles = StyleSheet.create({
  headContainerStyle: {
    height: height/3,
    backgroundColor: "#C1FC49",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    top: -50,
    ...Platform.select({
      ios: {
        paddingTop: 90,
      },
      android: {
        paddingTop: 90,
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
    gap:8
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