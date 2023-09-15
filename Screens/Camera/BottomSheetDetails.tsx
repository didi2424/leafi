import { Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBackdrop from "../../components/Filter/CustomBackdrop"; // Import your CustomBackdrop component
import CustomHandle from "../../components/Filter/CustomHandle"; //
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomBackground from '../../components/Filter/CostomBackgroud';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolateColor,
   
  } from "react-native-reanimated";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useTheme } from '../Profile/Settings/Account/ThemeContext';


interface CustomBottomSheetProps {
    snapPoints: number[];
  }

interface Item {
    key: string;
    text: string;
    price: string;
    }

interface Item2 {
    key: string;
    text: string;
    price: string;
    }
const BottomSheetDetails = React.forwardRef<BottomSheetModal, CustomBottomSheetProps>(( { snapPoints },  ref) => {
    const isDarkMode = useTheme()
    const data: Item[] = [
        { key: "item1", text: "Essential Nutrients", price: "Rp. 24.000" },
        { key: "item2", text: "Nutrient Uptake", price: "Rp. 30.000" },
        // Add more items as needed
      ];

      const data1: Item2[] = [
        { key: "item3", text: "Leafi Marble", price: "Rp. 245.000" },
        { key: "item4", text: "Leafi Wallnuts L", price: "Rp. 269.000" },
        { key: "item5", text: "Leafi Wallnuts XL", price: "Rp. 320.000" },
        // Add more items as needed
      ];

      const renderItem = ({ item}: { item: Item }) => (
        <View style={{backgroundColor:BG_VIEW, width: 180,height:44, borderRadius:29,alignItems:'center',flexDirection:'row',gap:8, padding:4,marginHorizontal: 10,}}>
        <View style={{width:36,aspectRatio:1, borderRadius:20,backgroundColor:'white'}}></View>
        <View style={{flexDirection:'column'}}>
        <Text style={styles.textStyle3}>{item.text}</Text>
        <Text style={styles.textStyle3}>{item.price}</Text>
        </View>
    </View>
      );

      const renderItems2 = ({ item }: { item: Item2 }) => (
        <View style={{backgroundColor:BG_VIEW, width: 180,height:44, borderRadius:29,alignItems:'center',flexDirection:'row',gap:8, padding:4,marginHorizontal: 10,}}>
        <View style={{width:36,aspectRatio:1, borderRadius:20,backgroundColor:'white'}}></View>
        <View style={{flexDirection:'column'}}>
        <Text style={styles.textStyle3}>{item.text}</Text>
        <Text style={styles.textStyle3}>{item.price}</Text>
        </View>
    </View>
      );

    const [selectedButton, setSelectedButton] = useState('Details'); 
    const selectedButtonPosition = useSharedValue(12);
    useEffect(() => {
        // Trigger the animation once the component has mounted
        selectedButtonPosition.value = withTiming(12);
        setSelectedButton('Details')

      }, []);

    const handleButtonPress = (buttonText: string) => {
        setSelectedButton(buttonText);
        switch (buttonText) {
          case "Details":
            selectedButtonPosition.value = withTiming(12);
            break;
          case "Treatment":
            selectedButtonPosition.value = withTiming((width-24) / 3);
            break;
          case "Shop":
            selectedButtonPosition.value = withTiming(((width -30) *2) / 3);
            break;
          default:
            break;
        }
      };
    
      const buttonIndicatorStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
          selectedButtonPosition.value,
          [12, (width -24) / 3, ((width -36) *2) / 3],
          [CIRCLE_BG, CIRCLE_BG, CIRCLE_BG]
        );
    
        return {
          transform: [{ translateX: selectedButtonPosition.value }],
          backgroundColor,
        };
      });
return (
  <BottomSheetModal
    ref={ref} // Pass the ref to the BottomSheetModal
    snapPoints={snapPoints}
    index={0}
    backdropComponent={(props) => <CustomBackdrop {...props} />}
    handleComponent={(props) => <CustomHandle {...props} />}
    backgroundComponent={(props) => <CustomBackground {...props} />}
  >
    <View style={styles.Container}>
      <View style={{gap:12}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <View style={{flexDirection:'column',justifyContent:'space-between', alignContent:'flex-end', alignItems:'flex-start'}}>
            <Text style={{ fontSize: 18, color: isDarkMode ? "white": "black" }}>Disease</Text>
            <Text style={{ fontSize: 36,fontWeight:'600',color: isDarkMode ? "white": "black"  }}>Leaf Spot</Text>

        </View>

        <View>
            <FontAwesomeIcon size={20} color={CIRCLE_BG} icon={icon({ name: 'bookmark'})} />
        </View>

        </View>
        <View style={{flexDirection:'column',justifyContent:'space-between'}}>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <View style={{ width: 120 }}>
            <Text style={[styles.textStyle1,{color: isDarkMode ? "gray": "gray" }]}>Plants Kind</Text>
          </View>
          <View style={{ width: 120 }}>
            <Text style={[styles.textStyle1,{color: isDarkMode ? "gray": "gray" }]}>Monstera Kind</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <View style={{ width: 120 }}>
            <Text style={{color: isDarkMode ? "white": "black"  }}>Monstera</Text>
          </View>
          <View style={{width: 120 }}>
            <Text style={{color: isDarkMode ? "white": "black"  }}>Swiss Cheese</Text>
          </View>
        </View>
        </View>
      </View>
      <View style={styles.containerMenu}>
      <Animated.View
        style={[
          styles.buttonIndicator,
          buttonIndicatorStyle,
        ]}
      />
        <TouchableOpacity
          style={[
            styles.ButtonMenu,
            {
                // backgroundColor:
                // selectedButton === "Details" ? CIRCLE_BG : BG_VIEW,
            },
          ]}

          onPress={() => handleButtonPress("Details")}
        >
          <Text > Details</Text>
        </TouchableOpacity>

        <View style={styles.borderHorizontal}>

        </View>

        <TouchableOpacity
          style={[
            styles.ButtonMenu,
            {
             
            },
          ]}
   
          onPress={() => handleButtonPress("Treatment")}
        >
          <Text> Treatment </Text>
        </TouchableOpacity>

        <View style={styles.borderHorizontal}>

        </View>

        <TouchableOpacity
          style={[
            styles.ButtonMenu,
            {
             
            },
          ]}
  
          onPress={() => handleButtonPress("Shop")}
        >
          <Text> Shop </Text>
        </TouchableOpacity>
        
      </View>
      
      <View style={{backgroundColor:'gray',height:1.2,borderRadius:2}}>

    </View>
      {/* Conditional rendering of content based on the selected button */}
      {selectedButton === "Details" && (
        <View style={{gap:9}}>
            <Text style={[styles.textStyle1,{color: isDarkMode ? "white": "black" }]}>Details Content</Text>
            <ScrollView style={{backgroundColor: isDarkMode ? 'gray' : 'white',borderRadius:12,padding:12,gap:8}}>
            <Text style={{textAlign: "justify",}}>Leaf spot is a common fungal disease that can affect various plant species, including Monstera plants. It is caused by different types of fungi and can result in circular or irregularly shaped spots on the leaves of the affected plants. The disease is more likely to occur in conditions of high humidity and when the foliage remains wet for extended periods.</Text>
            <Text>Symptoms:</Text>
                <Text style={{textAlign: "justify",}}>Circular or irregularly shaped spots on the leaves, usually with a distinct border.
                    Spots can be of various colors, including yellow, brown, or black, depending on the stage and type of the disease.
                    As the disease progresses, the spots may increase in size and number, leading to leaf yellowing and wilting.
                </Text>
            </ScrollView>
        </View>
      )}

      {selectedButton === "Treatment" && (
        <View>
          {/* Content for Good button */}
          {/* You can customize the content here */}
          <Text style={[styles.textStyle1,{color: isDarkMode ? "white": "black" }]}>Treatment Content</Text>
        </View>
      )}
      
      {selectedButton === "Shop" && (
        <View style={{gap:6}}>
        <Text style={[styles.textStyle1,{color: isDarkMode ? "white": "black" }]}>Shop</Text>
        <View style={{backgroundColor: isDarkMode ? 'gray' : 'white',borderRadius:12,padding:12,gap:8}}>
            <Text style={styles.textStyle1}>Smart Pots</Text>
            <Text style={styles.textStyle3}>Say goodbye to guesswork and hello to precision. Our intelligent sensors monitor soil moisture, temperature, and light levels, ensuring your plants receive optimal care at all times. With built-in automation, SmartPots water and adjust light conditions based on your plant's unique needs.</Text>
            <FlatList
                data={data1}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderItems2}
                keyExtractor={(item) => item.key}
                />

        </View>

        <View style={{backgroundColor: isDarkMode ? 'gray' : 'white',borderRadius:12,padding:12,gap:8}}>
          

            <Text style={styles.textStyle1}>Nutrition</Text>
            <Text style={styles.textStyle3}>Nourish your plants with the vital elements they need to thrive. Our collection of essential nutrients is carefully crafted to provide your greens with everything they require for robust growth and vibrant health.</Text>
            
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
                />
       
        </View>
    </View>
      )}
    </View>
  </BottomSheetModal>
);
});

export default BottomSheetDetails
const { width,height } = Dimensions.get("window");
const BG_VIEW = "#C1FC49"
const TEXT_COLOR = '#2a6f29'
const CIRCLE_BG= '#86ba1c'
const styles = StyleSheet.create({
  Container: {
    marginHorizontal: 24,
    gap: 12,
    flexDirection: "column",
   
  },
  borderHorizontal: {
    backgroundColor: "gray",
    width: 2,
    height: 24,
    borderRadius: 2,
  },
  containerMenu: {
    backgroundColor: BG_VIEW,
    borderRadius: 12,
    height: 40,
    paddingHorizontal: 12,
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  ButtonMenu: {
    width: width / 4,
    height: 28,
    borderRadius: 8,
    
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  buttonIndicator: {
    position: "absolute",
  
    left: 0,
    width: width / 4.4,
    height: 28,

    borderRadius: 8,
  },
  textStyle1: {
    fontSize: width > 400 ? 22 : 16,
    fontWeight:'500',
    
  },
  textStyle2: {
    fontSize: width > 400 ? 22 : 16,
  },
  textStyle3: {
    fontSize: width > 400 ? 16 : 12,
    textAlign: "justify"
  },
});