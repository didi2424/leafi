import { Text, View, ScrollView, Image, TouchableOpacity, useWindowDimensions, FlatList} from "react-native";
import { useTheme } from "./Profile/Settings/Account/ThemeContext";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useState,useMemo,useEffect, useRef, useCallback  } from "react";
import Animated, {useSharedValue, useAnimatedStyle,useAnimatedScrollHandler,interpolate} from "react-native-reanimated";
import {
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import CustomBackdrop from "../Components/Filter/CustomBackdrop";
import CustomHandle from "../Components/Filter/CustomHandle";
import CustomBackground from "../Components/Filter/CostomBackgroud";



import {theme, darkTheme} from '../Style/style'
 
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSun, faTint, faTree,faCloud, faTemperature3, faScissors } from '@fortawesome/free-solid-svg-icons';
library.add(faSun, faTint, faTree,faCloud,faTemperature3, faScissors);

const ImageUri= 'https://images.unsplash.com/photo-1564463836317-2f29096583f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80'

const dataPlants = [
    {
        image: require('../assets/images/plants.png'),
        text: "Maranta"
    },
    {
        image: require('../assets/images/plants2.png'),
        text: "Monstera"
    },
    {
        image: require('../assets/images/plants3.png'),
        text: "Spider Plant"
    },
    {
        image: require('../assets/images/plants4.png'),
        text: "Ric Rac Cactus"
    },
]

const dataSoil = [
    {
        image: require('../assets/images/care/soil1.png'),
        text: "Potting Mix"
    },
    {
        image: require('../assets/images/care/soil2.png'),
        text: "Organic Lava Rock"
    },
    {
        image: require('../assets/images/care/soil3.png'),
        text: "Organic Cactix Mix"
    },
    {
        image: require('../assets/images/care/soil4.png'),
        text: "Grade D"
    },
]

const CATEGORIES = [
    {
        text: "Plants"
    },
    {
        text: "Care"
    },
    {
        text: "Smart Pot"
    },
    {
        text: "Tools"
    },
]

const FORYOU: ForYouItem[] = [
  {
    text: "Plants Diseases",
    describe: "Unlock the power of technology to detect and identify plant diseases with our innovative plant disease detection system. By harnessing the capabilities of image analysis and artificial intelligence",
    describe1: "Diseases",
    views: "1.4k",
    title: "1.4k",
    step: "",
    type: ""
  },
  {
    text: "Plants Care",
    describe: "Discover the secrets to maintaining healthy and vibrant plants with our expert plant care guide. Whether you're a seasoned gardener or just starting your green thumb journey",
    describe1: "Care",
    views: "2.1k",
    title: "Proper Care of Plants",
    step: "Caring for plants with different types of species requires understanding their specific needs and adapting your care routine accordingly. Here are some general guidelines for caring for different types of plants:",
    type: "Plants Care"
  },
  {
    text: "Consult Botanist",
    describe: "Welcome to our Consult Botanist Team, where plant enthusiasts like you can find expert guidance, valuable insights, and personalized advice for all your plant-related queries.",
    describe1: "Botanist",
    views: "800",
    title: "Consult Our Expert Botanist Team: Unleash the Full Potential of Your Plants",
    step: "",
    type: ""
  },
  
];


type ForYouItem = {
  text: string;
  describe: string;
  describe1: string;
  views: string;
  title: string;
  step: string
  type: string
};


const CustomCard3 = ({newDiscover} ) => {
    const { width } = useWindowDimensions();
    const SIZE = (width * 0.5) - 12;
    const SPACER = (width - SIZE) / 2;
    const x = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler({
      onScroll: event => {
        x.value = event.contentOffset.x;
      },
    });
    const handlePress = (item: any) => {
      
      // Add additional logic or actions here
    };
  
  
    return (
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={16}
        snapToInterval={SIZE}
        decelerationRate="fast"
        onScroll={onScroll}
      >
      
        {newDiscover.map((item :any, index: any) => {
          const style = useAnimatedStyle(() => {
            const scale = interpolate(
              x.value,
              [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
              [0.8, 1, 0.8],
            );
            return {
              transform: [{ scale }],
            };
          });
  
          if (!item.image) {
            return <View style={{ width: SPACER }} key={index} />;
          }
  
          return (
            <View style={{ width: SIZE }} key={index}>
              <TouchableOpacity onPress={() => handlePress(item)} key={index}>
                <Animated.View style={[{ borderRadius: 24, overflow: 'hidden', position: 'relative' }, style]}>
                  <Image source={item.image} style={{ width: 200, height: 200 }} resizeMode="cover" />
                  <View style={{ position: 'absolute', right: 16, bottom: 16, paddingHorizontal: 12, paddingVertical: 12, backgroundColor: 'rgba(125, 177, 73, 0.25)', borderRadius: 15 }}>
                    <Text style={{ color: '#fff' }}>{item.text}</Text>
                  </View>
                </Animated.View>
              </TouchableOpacity>
            </View>
          );
        })}
      </Animated.ScrollView>
    );
  };

 

  
const Home = () => {
  const { isDarkMode } = useTheme();
  const selectedTheme = isDarkMode ? darkTheme : theme;
  const { colors, spacing } = selectedTheme;

  const initialDiscover = [
      { key: 'spacer-left' },
      ...dataPlants,
      { key: 'spacer-right' },
    ];

  const [categoryIndex, setCategoryIndex] = useState(0);
  const [newDiscovers, setNewDiscover] = useState(initialDiscover);
  const snapPoints = useMemo(() => ['25%', '85%'], []);

  const openFilterModalRef = useRef<BottomSheetModal>(null);
  const openFilterModal = useCallback(() => {
    openFilterModalRef.current?.present();
  }, []);

  const handleCategoryPress = (index: any, item :any) => {
      setCategoryIndex(index);
      // Additional logic based on the item
      if (item.text === 'Plants') {
          setNewDiscover([
            { key: 'spacer-left' },
            ...dataPlants,
            { key: 'spacer-right' },
          ]);
        } else if (item.text === 'Care') {
          setNewDiscover([
            { key: 'spacer-left' },
            ...dataSoil,
            { key: 'spacer-right' },
          ]);
        }
    };

    return (
    <ScrollView style={{paddingBottom:90, paddingTop:20, backgroundColor: colors.background}}>
        <View style={{paddingVertical:24, gap:24}}>
            {/* Header Section*/}
        <View style={{
                paddingHorizontal: 24,
                flexDirection: "row",
                alignItems: "center",
                gap: 8
            }}>
                <Image
                source={{
                    uri : ImageUri}}
                style={{
                    width:58, aspectRatio:1,borderRadius:58
                }}
                resizeMode="cover"
                ></Image>

                <View style={{flex:1 }}>
                    <Text style={{fontSize: spacing.l, fontWeight:"600", marginBottom:8, color: colors.textcolor}} numberOfLines={1}>Hi! Mita 👋🏻 </Text>
                    <Text style={{color:colors.textcolor, opacity:0.5 }} numberOfLines={1}>Discover Plant!</Text>
                </View>

                <TouchableOpacity style={{
                    width:52,
                    aspectRatio:1,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius:52,
                    borderWidth:1,
                    borderColor: colors.textcolor,
                }}>
                    <FontAwesomeIcon icon={icon({ name: 'bell' })} style={{ opacity: 0.9, color: colors.buttoncolor}} /> 
                </TouchableOpacity>

            </View>
            {/*Search Section*/}
        <View style={{flexDirection:"row",paddingHorizontal:24,gap:12}}>
            <TouchableOpacity style={{flex:1,height:52, borderRadius:52, borderWidth:1.2, borderColor: colors.textcolor,alignItems: 'center', paddingHorizontal:24,gap:12,flexDirection:'row'}}>
            <FontAwesomeIcon icon={icon({ name: 'magnifying-glass' })} style={{ opacity: 0.9, color: colors.buttoncolor}} /> 
            <Text style={{color: colors.textcolor, opacity:0.7}}>
                Search
            </Text>

            </TouchableOpacity>
            <TouchableOpacity 
            onPress={openFilterModal}
            style={{
                    width:52,
                    aspectRatio:1,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius:52,
                    borderWidth:1,
                    borderColor: colors.textcolor,
                }}
                >
                    <FontAwesomeIcon icon={icon({ name: 'sliders' })} style={{color: colors.buttoncolor}}/> 
                </TouchableOpacity>
            </View>
            {/* Discover Section*/}
        <View style={{paddingHorizontal: 24}}>
        <View style={{
            flexDirection:"row",
            alignItems: "center",
            justifyContent:"space-between",
            marginBottom:12
        }}>
            <Text style={{fontSize: spacing.llll, color:colors.textcolor, fontWeight: "600",}}>
                Discover
            </Text>
            <TouchableOpacity>
                <Text style={{fontSize: spacing.m, color:colors.textcolor}}>See All</Text>
            </TouchableOpacity>
        
            </View>            
            </View>
            
          <View style={{paddingHorizontal:12}} >
              {newDiscovers.length > 0 && (
                  <CustomCard3 newDiscover={newDiscovers} />
              )}
              </View>

            {/* FlatList Section */}
        <FlatList
                contentContainerStyle={{paddingHorizontal:24,gap:12}}
                data={CATEGORIES} 
                showsHorizontalScrollIndicator={false}
                horizontal 
                renderItem={({item,index}) => {
                    const isSelected = categoryIndex === index
                    return (
                        <TouchableOpacity onPress={() => handleCategoryPress(index, item)}
                            style={{backgroundColor: isSelected ? colors.buttoncolor : 'transparent',
                            paddingHorizontal:24,
                            paddingVertical:12,
                            borderRadius:20,
                            }}
                        >
                            <Text style={{
                            color: isSelected ? 'black' : colors.textcolor,
                            fontWeight:"600",
                            fontSize: isSelected ? 16 : 14,
                            opacity: isSelected ? 1 : 0.7
                            }}
                            >{item.text}
                            </Text>
                        </TouchableOpacity>

                    )
                }}
            />
          {/* Foryou Section */}
        <View style={{paddingHorizontal:24,position:'relative',overflow: 'hidden'}}>
              <Text style={{fontSize: spacing.llll, marginBottom:12, color:colors.textcolor,fontWeight: "600"}}>
                For You 
              </Text>
        
              {FORYOU.map((item, index) => (
                <View style={{backgroundColor: colors.cardcolor,
                borderTopLeftRadius:24,
                borderTopRightRadius:24,
                borderBottomLeftRadius:24,
                borderBottomRightRadius:0,
                position: 'relative',
                overflow: 'hidden',
                marginBottom:12
                }} key={index}>

                

            <View style={{paddingHorizontal: 24}}>
            <View style={{
                flexDirection:"row",
                alignItems: "center",
                justifyContent:"space-between",
                marginTop:12,
                marginBottom:12
            }}>
                <Text style={{fontWeight: "600",fontSize: 24,color:colors.textcolor}} >{item.text}</Text>
                  <View  style={{ flexDirection: 'row',gap:8, alignContent:'center', justifyContent: 'center'}}>
                          
                          <TouchableOpacity  style={{flexDirection:"row",gap:2, backgroundColor: colors.background, width:52, height:22, borderRadius:8, alignItems:"center",alignContent:'center', justifyContent: 'center',marginTop:4}}>
                            <FontAwesomeIcon icon={icon({ name: 'eye' })} style={{ color: colors.buttoncolor, width:40,height:40 }}  /> 
                            <Text style={{color: colors.textcolor}}>{item.views}</Text>
                          </TouchableOpacity>

                          <TouchableOpacity >
                            <FontAwesomeIcon  size={30} icon={icon({ name: 'circle-chevron-right' })} style={{ color: colors.buttoncolor}}  />
                          </TouchableOpacity>
                  </View>
              
                  </View>            
              </View>

                

            <View style={{marginHorizontal:22 , backgroundColor: colors.background, borderRadius: 15 ,marginBottom:22}}>
                    <View style={{flex:1,justifyContent:"center",padding:12}} >
                      <Text style={{fontSize:14, fontWeight:"600", marginBottom:8, color:colors.textcolor,textAlign:'justify'}} numberOfLines={6}>{item.describe} </Text>
                      <Text style={{color:colors.textcolor }} numberOfLines={1}>{item.describe1}</Text>
                  </View>
                </View>
                
                 
                 
                </View>
              ))}
                  
                  {/* <Image source={item.image} style={{  height: 200 }} resizeMode="cover" /> */}
            </View>
            
          {/* FilterModal */}
          <BottomSheetModal 
          snapPoints={snapPoints} 
          index={0} 
          ref={openFilterModalRef}
          backdropComponent={props => <CustomBackdrop {...props}/>}
          handleComponent={props => <CustomHandle {...props}/>}
          backgroundComponent={(props) => <CustomBackground {...props} />}
          >
           
          <Text style={{color:colors.textcolor}}>Filter</Text>

          </BottomSheetModal>

          

        </View>
    </ScrollView>
    )
     
} 

export default Home;