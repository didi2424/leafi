import { Text, View, ScrollView, Image, TouchableOpacity, useWindowDimensions, FlatList} from "react-native";
import { SafeAreaView } from "react-native";
import  {useTheme} from "@react-navigation/native"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useState,useMemo,useEffect, useRef, useCallback  } from "react";
import Animated, {useSharedValue, useAnimatedStyle,useAnimatedScrollHandler,interpolate, event} from "react-native-reanimated";
import {
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import CustomBackdrop from "../components/Filter/CustomBackdrop";
import CustomHandle from "../components/Filter/CustomHandle";
import BottomSheetBackground from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackground/BottomSheetBackground";

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

type CareofTypeItem = {
  type: string;
  step: string;
  fullstep: string;
  imagepost: string;
  details: {
    light: string[];
    water: string[];
    soil: string[];
    humidity: string[];
    support:string[];
    temperature: string[];
    fertilization: string[];
    pruning: string[];
    pests: string[];
    diseases: string[];

  };
};


const CareofType: CareofTypeItem[] = [
  {
    "type": "Succulents and Cacti",
    "step": "Water sparingly and allow the soil to dry out between waterings, Place in bright sunlight, Use well-draining soil specifically formulated for succulents and cacti.",
    "fullstep": "Caring for succulents and cacti requires some specific considerations due to their unique characteristics. Here are some general care tips for succulents and cacti:",
    "imagepost": require('../assets/images/carestep/S.png'),
    "details": {
        "light": [
            "Place your succulents and cacti in bright sunlight, preferably near a south or east-facing window.",
            "Avoid placing them in direct, intense sunlight during the hottest part of the day, as it can cause sunburn."
        ],
        "water": [
            "Succulents and cacti are easy to care for. They don't need much water, so let the soil dry completely between waterings.",
            "Water deeply, then wait for the soil to dry out before watering again. This helps keep them healthy and avoids overwatering."
        ],
        "soil": [
            "Use well-draining soil specifically formulated for succulents and cacti, or create your own by mixing regular potting soil with perlite or coarse sand."
        ],
        "humidity": [
            "Succulents and cacti are adapted to arid conditions and generally do not require high humidity levels.",
            "Avoid misting the plants, as excess moisture can promote fungal diseases."
        ],
        "temperature": [
            "Succulents and cacti prefer warm temperatures, ideally between 70°F to 90°F (21°C to 32°C).",
            "Protect them from frost and extremely low temperatures, as they are not cold-tolerant."
        ],
        "fertilization": [
            "Succulents and cacti have low nutrient requirements. Fertilize sparingly, usually once or twice a year.",
            "Use a balanced, diluted fertilizer specifically formulated for succulents and cacti during the growing season."
        ],
        "pruning": [
            "Pruning is generally not necessary for succulents and cacti, but you can remove dead or damaged parts with clean pruning shears.",
            "Be careful of spines and thorns when handling and pruning cacti."
        ],
        "pests": [
            "Common pests for succulents and cacti include mealybugs, scale insects, and spider mites.",
            "Inspect your plants regularly and treat any pest infestations with appropriate methods, such as using insecticidal soap or neem oil."
        ],
        "diseases": [
            "Overwatering and poor air circulation can lead to fungal diseases in succulents and cacti.",
            "Ensure proper drainage and avoid overcrowding the plants to prevent disease problems."
        ]
    }
},
  {
    "type": "Leafy Green Plants",
    "step": "Water when the top inch of soil feels dry, Place in bright, indirect light, Fertilize every 2-4 weeks during the growing season.",
    "fullstep": "Leafy full step here",
    "imagepost": "",
    "details": {
        "light": [
            "Leafy green plants thrive in bright, indirect light. Place them near a window with filtered sunlight or provide artificial grow lights if natural light is insufficient.",
            "Avoid direct sunlight as it can scorch the leaves. If necessary, provide some shade during the hottest part of the day."
        ],
        "water": [
            "Water your leafy green plants when the top inch of soil feels dry to the touch. Stick your finger into the soil to check the moisture level.",
            "Use room temperature water and water the plants thoroughly until water drains out of the bottom of the pot. Discard any excess water to prevent waterlogging.",
            "Avoid overwatering, as it can lead to root rot. Ensure proper drainage to prevent standing water."
        ],
        "soil": [
            "Leafy green plants prefer well-draining potting soil that retains some moisture but doesn't become waterlogged. A mix of peat moss, perlite, and compost or a commercial potting mix formulated for indoor plants should work well."
        ],
        "humidity": [
            "Most leafy green plants appreciate moderate to high humidity levels. Increase humidity around your plants if the air in your home is dry.",
            "Mist the leaves with water or place a tray filled with water near the plants to increase humidity. Avoid misting if your plant is susceptible to fungal diseases."
        ],
        "temperature": [
            "Most leafy green plants prefer temperatures between 60°F to 75°F (15°C to 24°C). Avoid exposing them to extreme temperature fluctuations or drafts.",
            "Keep your plants away from cold drafts from windows or doors during winter months."
        ],
        "fertilization": [
            "Feed your leafy green plants with a balanced, water-soluble fertilizer during the growing season (spring and summer).",
            "Follow the instructions on the fertilizer package for application rates and frequency. Avoid over-fertilization, as it can damage the plants."
        ],
        "pruning": [
            "Regularly inspect your leafy green plants for any yellow or dead leaves. Prune them off with clean, sharp scissors or pruning shears to maintain plant health and appearance.",
            "Pruning can also help encourage bushier growth and prevent legginess."
        ],
        "pests": [
            "Keep an eye out for common pests like aphids, spider mites, and whiteflies. If you notice any signs of pest infestation, treat them promptly with an appropriate insecticidal soap or horticultural oil."
        ],
        "diseases": [
            "Maintain good air circulation around your plants to discourage fungal diseases. Avoid overwatering and overcrowding of plants."
        ]
    }
},
{
  "type": "Flowering Plants",
  "step": "Water when the top inch of soil feels slightly dry, Provide adequate sunlight based on the plant's specific light requirements.",
  "fullstep": "Flowering full step here",
  "imagepost": "",
  "details": {
      "light": [
          "Most flowering plants require bright, indirect light to thrive.",
          "Some flowering plants have specific light requirements, such as partial shade or full sun. Research your plant's light preferences and provide the appropriate conditions."
      ],
      "water": [
          "Water your flowering plants when the top inch of soil feels slightly dry to the touch.",
          "Ensure thorough watering, allowing the water to reach the root zone. Avoid overwatering, as it can lead to root rot."
      ],
      "soil": [
          "Use a well-draining soil mix formulated for flowering plants, providing good aeration and moisture retention.",
          "Amend heavy soils with organic matter to improve drainage and create a nutrient-rich environment for the plants."
      ],
      "fertilization": [
          "Flowering plants benefit from regular fertilization during the growing season.",
          "Use a balanced, water-soluble fertilizer specifically formulated for flowering plants, following the recommended dosage and frequency of application."
      ],
      "pruning": [
          "Regular pruning helps promote bushier growth and encourages more blooms.",
          "Remove dead or faded flowers to redirect the plant's energy toward new growth. Trim back any overgrown or leggy branches to maintain a compact shape."
      ],
      "support": [
          "Some flowering plants may require support or staking, especially those with tall or heavy blooms.",
          "Use stakes, trellises, or plant supports to prevent bending or breaking of stems and to maintain an upright appearance."
      ],
      "pests": [
          "Monitor your flowering plants for common pests such as aphids, mealybugs, or spider mites.",
          "Treat any pest infestations promptly using appropriate organic or chemical insecticides to prevent damage to the plants."
      ],
      "diseases": [
          "Watch out for common plant diseases like powdery mildew or fungal infections.",
          "Provide good air circulation, avoid overhead watering, and promptly remove any diseased plant parts to minimize disease risks."
      ]
  }
}
];



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
      console.log("TouchableOpacity pressed", item.text );
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
    const initialDiscover = [
        { key: 'spacer-left' },
        ...dataPlants,
        { key: 'spacer-right' },
      ];
    const {colors} = useTheme()
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [newDiscovers, setNewDiscover] = useState(initialDiscover);
    const snapPoints = useMemo(() => ['25%', '85%'], []);

    const openFilterModalRef = useRef<BottomSheetModal>(null);
    const openFilterModal = useCallback(() => {
      openFilterModalRef.current?.present();
    }, []);

    const [selectedItem, setSelectedItem] = useState<ForYouItem | null>(null);
    
    const openForYouModalRef = useRef<BottomSheetModal>(null);
    const openForYouModal = useCallback((item: ForYouItem)=> {
      setSelectedItem(item);
      openForYouModalRef.current?.present();
      
    },[]);

    const [selectedCareItem, setSelectedCareItem] = useState<CareofTypeItem | null>(null);
    const openDetachModalRef = useRef<BottomSheetModal>(null);
    const openDetachuModal = useCallback((item: CareofTypeItem)=> {
      setSelectedCareItem(item)
      openDetachModalRef.current?.present();
      console.log("Selected item:", item);
    },[]);
   
    const getCategoryIconName = (category: string) => {
      switch (category) {
        case 'light':
          return faSun;
        case 'water':
          return faTint;
        case 'soil':
          return faTree;
        case 'humidity':
          return faCloud;
        case 'temperature':
          return faTemperature3;
        case 'fertilization':
          return faTemperature3;
        case 'pruning':
          return faScissors;
        case 'pests':
          return faTemperature3;
        case 'diseases':
          return faTemperature3;
                    

          
        default:
          return null; // Return a default icon or handle the case differently if the category is not recognized
      }
    };
  
    const CareItem = ({ selectedCareItem }: { selectedCareItem: CareofTypeItem }) => {
      const [isPressed, setIsPressed] = useState<{ light?: boolean; water?: boolean; soil?: boolean; fertilization?: boolean; pruning?: boolean; support?: boolean; pests?: boolean; diseases?: boolean }>({});
      const togglePress = (category: keyof typeof selectedCareItem.details) => {
        setIsPressed((prevState) => ({
          ...prevState,
          [category]: !prevState[category],
        }));
      };
      
      const renderTouchableOpacity = (category: keyof typeof selectedCareItem.details) => {
        const isPressedCategory = isPressed[category] || false;
        const categoryDetails = selectedCareItem.details[category] || [];
        const icons = getCategoryIconName(category);
        return (
          <TouchableOpacity onPress={() => togglePress(category)}>
            <View style={{ borderRadius: 18, backgroundColor: '#ACE1AF', marginTop: 22, marginHorizontal: 12, height: isPressedCategory ? 200 : 118 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ alignItems: 'center', paddingHorizontal: 12 }}>
                {/* <FontAwesomeIcon icon={icon({ name: 'leaf' })} style={{ opacity: 0.9, color: '#2a6f29',width:40,height:40 }}  />  */}
                {icons && <FontAwesomeIcon icon={icons} style={{ opacity: 0.9, color: '#2a6f29', width: 40, height: 40 }} />}
                </View>
  
                <View style={{ flex: 1, paddingHorizontal: 2, top: isPressedCategory ?28 : 0 }}>
                  <Text style={{ bottom: 12 }}>{getCategoryTitle(category)}</Text>
                  <Text numberOfLines={isPressedCategory ? 10 : 4} style={{ fontSize: 12, fontWeight: '400', color: 'rgba(0,0,0,0.7)' }}>
                    {categoryDetails.map((step, stepIndex) => (
                      <Text key={stepIndex} style={{ marginLeft: 20 }}>
                        {`${stepIndex + 1}. ${step}\n`}
                      </Text>
                    ))}
                  </Text>
                </View>
  
                <View style={{ alignItems: 'center', paddingHorizontal: 12, padding: 8 }}>
                  <Image source={selectedCareItem.imagepost} style={{ width: 100, height: 100, borderRadius: 12 }} resizeMode="cover" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      };
  
      const getCategoryTitle = (category: keyof typeof selectedCareItem.details) => {
        switch (category) {
          case 'light':
            return 'Lights';
          case 'water':
            return 'Water';
          case 'soil':
            return 'Soil';
          case 'humidity':
            return 'Humidity';
          case 'temperature':
            return 'Temperature';
          case 'pruning':
            return 'Pruning';
          case 'fertilization':
            return 'Fertilization';
          case 'support':
            return 'Support';
          case 'pests':
            return 'Pests';
          case 'diseases':
            return 'Diseases';
          default:
            return '';
        }
      };
  
  
      return (
        <View>
          {Object.keys(selectedCareItem.details).map((category) => (
            renderTouchableOpacity(category as keyof typeof selectedCareItem.details)
          ))}
        </View>
      );
    };



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
    <ScrollView style={{marginBottom:78}}>
        <SafeAreaView style={{paddingVertical:24,gap:24}}>
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
                    <Text style={{fontSize:18, fontWeight:"600", marginBottom:8}} numberOfLines={1}>Hi! Mita 👋🏻 </Text>
                    <Text style={{color:colors.text, opacity:0.5 }} numberOfLines={1}>Discover Plant!</Text>
                </View>

                <TouchableOpacity style={{
                    width:52,
                    aspectRatio:1,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius:52,
                    borderWidth:1,
                    borderColor: colors.border,
                }}>
                    <FontAwesomeIcon icon={icon({ name: 'bell' })} /> 
                </TouchableOpacity>

            </View>
            {/*Search Section*/}
        <View style={{flexDirection:"row",paddingHorizontal:24,gap:12}}>
            <TouchableOpacity style={{flex:1,height:52, borderRadius:52, borderWidth:1.2, borderColor: colors.border,alignItems: 'center', paddingHorizontal:24,gap:12,flexDirection:'row'}}>
            <FontAwesomeIcon icon={icon({ name: 'magnifying-glass' })} style={{ opacity: 0.9, color: '#2a6f29' }} /> 
            <Text style={{color: '#2a6f29', opacity:0.7}}>
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
                    borderColor: colors.border,
                  
                 
                }}
                >
                    <FontAwesomeIcon icon={icon({ name: 'sliders' })} style={{color: '#2a6f29'}}/> 
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
            <Text style={{fontSize:24}}>
                Discover
            </Text>
            <TouchableOpacity>
                <Text>See All</Text>
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
                            style={{backgroundColor: isSelected ? '#B2D3C2' : colors.card,
                            paddingHorizontal:24,
                            paddingVertical:16,
                            borderRadius:20,
                            }}
                        >
                            <Text style={{
                            color: isSelected ? '#7db149ff' : 'rgba(125, 177, 73, 1)',
                            fontWeight:"600",
                            fontSize:16,
                            opacity: isSelected ? 1 : 0.8
                            }}
                            >{item.text}
                            </Text>
                        </TouchableOpacity>

                    )
                }}
            />
          {/* Foryou Section */}
        <View style={{paddingHorizontal:24,position:'relative',overflow: 'hidden'}}>
              <Text style={{fontSize:24, marginBottom:12}}>
                For You 
              </Text>
        
              {FORYOU.map((item, index) => (
                <View style={{backgroundColor: '#fff',
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
                <Text style={{fontWeight: "600",fontSize: 28}} >{item.text}</Text>
                  <View  style={{ flexDirection: 'row',gap:8, alignContent:'center', justifyContent: 'center'}}>
                          <TouchableOpacity  style={{flexDirection:"row",gap:2,backgroundColor:"#2a6f29",width:52, height:22, borderRadius:8, alignItems:"center",alignContent:'center', justifyContent: 'center',marginTop:4}}>
                                <FontAwesomeIcon icon={icon({ name: 'eye' })} style={{ color: '#7db149ff',width:40,height:40 }}  /> 
                                <Text style={{color:'white'}}>{item.views}</Text>
                              </TouchableOpacity>

                          <TouchableOpacity onPress={() => openForYouModal(item)}>
                          <FontAwesomeIcon  size={30} icon={icon({ name: 'circle-chevron-up' })} style={{ color: '#7db149ff'}}  />
                            </TouchableOpacity>
                  </View>
              
                  </View>            
              </View>

                

            <View style={{marginHorizontal:22 ,backgroundColor: 'rgba(125, 177, 73, 0.25)', borderRadius: 15,marginBottom:22}}>
                    <View style={{flex:1,justifyContent:"center",padding:12}} >
                      <Text style={{fontSize:14, fontWeight:"600", marginBottom:8}} numberOfLines={4}>{item.describe} </Text>
                      <Text style={{color:colors.text, opacity:0.5 }} numberOfLines={1}>{item.describe1}</Text>
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
          >
           
          <Text>Filter</Text>

          </BottomSheetModal>

          <BottomSheetModal 
          snapPoints={snapPoints} 
          index={0} 
          ref={openForYouModalRef}
          
          backdropComponent={props => <CustomBackdrop {...props}/>}
          handleComponent={props => <CustomHandle {...props}/>}
          >
         {selectedItem && (
          <View style={{paddingHorizontal:12,alignContent:"center",alignItems:"center"}}>
            <Text numberOfLines={3} style={{fontSize:24, fontWeight:"600", height:50}}>{selectedItem.title}</Text>
            <Text numberOfLines={10} style={{fontSize:18, fontWeight:"500",textAlign: 'center'}}>{selectedItem.step}</Text>

          {selectedItem.type === "Plants Care" && (
            <View style={{ marginTop: 20,paddingHorizontal:12 }}>
            {CareofType.map((item, index) => (
            <TouchableOpacity onPress={() => openDetachuModal(item)} key={index} style={{ borderRadius:12,marginBottom: 12, backgroundColor:'#7db149ff', }}>
              <View>
              <Text style={{ top:12, left:12,fontWeight: "600", fontSize: 20, marginBottom:8 }}>{item.type}</Text>
              </View>
              <View style={{top:8, left:8,right:8}}>
              <Text numberOfLines={10} style={{ fontSize: 14,marginHorizontal:12 }}>{item.step.split(', ').map((step, stepIndex) => (
                    <Text key={stepIndex} style={{ marginLeft: 20 }}>
                      {`${stepIndex + 1}. ${step}\n`}
                    </Text>
                  ))}
                </Text>
                </View>
                
                </TouchableOpacity>
            ))}
            <Text>and More</Text>
            
            <View style={{flexDirection:"row",paddingHorizontal:24,gap:12,top:42}}>
            <TouchableOpacity style={{flex:1,height:52, borderRadius:52, borderWidth:1.2, borderColor: colors.border,alignItems: 'center', paddingHorizontal:24,gap:12,flexDirection:'row'}}>
            <FontAwesomeIcon icon={icon({ name: 'magnifying-glass' })} style={{ opacity: 0.9, color: '#2a6f29' }} /> 
            <Text style={{color: '#2a6f29', opacity:0.7}}>
                Search
            </Text>
            </TouchableOpacity>
            </View>
          </View>
            )}
         
          </View>
        
        )}
                  
          </BottomSheetModal>


          <BottomSheetModal
            snapPoints={['90%']} 
            index={0} 
            ref={openDetachModalRef}
            bottomInset={110}
            style={{marginHorizontal: 24,}}
            detached={true}
            backdropComponent={props => <CustomBackdrop {...props} />}
          >
           {selectedCareItem && (
            <ScrollView>
           <View style={{ marginHorizontal: 12 }}>
            <View style={{justifyContent:'space-between',flexDirection: 'row', alignItems: 'flex-start',gap:8}}>
            <Image  source={selectedCareItem.imagepost} style={{ width: 130, height: 130, borderRadius:12 }} resizeMode="cover" />
            
            <View style={{ flex: 1, paddingHorizontal: 2 }}>
            <Text style={{ textAlign: 'left', fontSize: 26, fontWeight: "600" }}>
             {selectedCareItem.type}
           </Text>
           <Text numberOfLines={10} style={{fontSize:12}}>
            {selectedCareItem.fullstep}
           </Text>
           </View>
            </View>
           
          
            {selectedCareItem && <CareItem selectedCareItem={selectedCareItem} />}
         
         </View>
         </ScrollView>
            )}
          </BottomSheetModal>

        </SafeAreaView>
    </ScrollView>
    )
     
} 




export default Home;