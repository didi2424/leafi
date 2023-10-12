import { View, Text,Image, StyleSheet,Dimensions, Platform, ImageBackground, ScrollView,  } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraType } from 'expo-camera';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import {
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { useTheme } from './Profile/Settings/Account/ThemeContext';
import {theme,darkTheme} from '../Style/style'
import * as tf from '@tensorflow/tfjs';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import * as FileSystem from 'expo-file-system';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
 
} from "react-native-reanimated";
import CustomBackdrop from "../Components/Filter/CustomBackdrop";
import CustomHandle from "../Components/Filter/CustomHandle";
import CustomBackground from "../Components/Filter/CostomBackgroud";
import {getDiseaseData} from "../ClientSideAPI/api"

type Props = {
  onScreenChange: (screenNumber: number) => void;
  onDeviceData: (data: any) => void;
};

const Cameras = ({onScreenChange,onDeviceData}: Props) => {
  const [imageUri, setImageUri] = useState<null | string>(null);
  const cameraRef = useRef<Camera | null>(null); 
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [flashMode, setFlashMode] = useState<string>('off');

  const openFilterModalRef = useRef<BottomSheetModal>(null);
  const openFilterModal = useCallback(() => {
    openFilterModalRef.current?.present();
  }, []);

  const { isDarkMode } = useTheme();
  const selectedTheme = isDarkMode ? darkTheme : theme;
  const { colors } = selectedTheme;

  const [isTfReady, setIsTfReady] = useState(false);
  const [result, setResult] = useState<null | string>(null);
  const [pickedImage, setPickedImage] = useState<null | string>(null);
  const [model, setModel] = useState(null);
  const class_names = ['Cat', 'Dog'];

  const load = async () => {
    try {
      await tf.ready();
      const modelJSON = require('../assets/models/norescalecatdog.json');
      const modelWeights = require('../assets/models/norescalecatdog.bin');
      const model = await tf.loadLayersModel(
        bundleResourceIO(modelJSON, modelWeights)
      );
      setModel(model);
      setIsTfReady(true);
    } catch (err) {
      console.error(err);
      setResult('Error: Unable to classify.');
    }
  };

  useEffect(() => {
    load();
   
  }, []);

  const [diseaseName, setDiseaseName] = useState('yellows');
  const [data, setData] = useState([]);

  const predict = () => {
    getDiseaseData(diseaseName)
      .then((response) => {
        setData(response);
        console.log(data)
      })
      .catch((error) => {
        console.error('API call failed:', error);
      });
  };
  
  const classifyImage = async () => {
    if (!model) {
      setResult('Error: No image selected or model not loaded.');
      return;
    }

    try {
      const imgB64 = await FileSystem.readAsStringAsync(pickedImage, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
      const raw = new Uint8Array(imgBuffer)
      const imageTensor = decodeJpeg(raw);
      
      const resizedImageTensor = tf.image.resizeBilinear(imageTensor, [80, 80]);
      const batchedImageTensor = tf.stack([resizedImageTensor]);

      const predictions = model.predict(batchedImageTensor);
      const score = tf.softmax(predictions).dataSync();

      const maxPredictionIndex = score.indexOf(Math.max(...score));
      const confidence = (score[maxPredictionIndex] * 100).toFixed(2);

      const resultObject = {
        class: class_names[maxPredictionIndex],
        confidence: `${confidence}%`
      };

      const jsonString = JSON.stringify(resultObject);
      setResult(jsonString);

      // setResult(`Class: ${class_names[maxPredictionIndex]}, Confidence: ${confidence}%`);

    } catch (error) {
      console.error('Error classifying image:', error);
      setResult('Error: Unable to classify the selected image.');
    }
  };



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

  const snapPoints = useMemo(() => [ height*0.50, height*0.75], []);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={{gap:10, width:width,height:height,justifyContent:'center', alignItems:'center', backgroundColor:colors.background}}>
        <Text style={{ textAlign: 'center', color: colors.textcolor }}>We need your permission to use the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={{backgroundColor: colors.buttoncolor , width:130, height:30,alignItems:'center',justifyContent:'center',borderRadius:20}} >
            <Text>Grant Permission !</Text>
          </TouchableOpacity>
      </View>
    );
  }
  const handlePress = () => {
    onScreenChange(1)
  };

  const toggleFlash = () => {
    if (flashMode === 'off') {
      setFlashMode('on');
      console.log('on');
    } else if (flashMode === 'on') {
      console.log('auto');
      setFlashMode('auto');
    } else {
      setFlashMode('off');
      console.log('off');
    }
  };
  const takePicture = async () => {
   
    try {
      if (cameraRef.current) {
        const photo = await (cameraRef.current as any).takePictureAsync({flashMode:flashMode});
        setImageUri(photo.uri);
        setPickedImage(photo.uri)

      }
    } catch (error) {
      console.error('Error while taking photo:', error);
    }
  };

  const selectImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('Media library permissions not granted.');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.canceled) {
        const selectedImage = result.assets[0];
        setImageUri(selectedImage.uri)
        setPickedImage(selectedImage.uri)


      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };
  

  const pressHistory = () => {
    console.log('Pressed History')
  }

  const resetImage = () => {
    setImageUri(null);
    setPickedImage(null);
    setResult(null);
  };

  return (
    
    <View style={{height:height,width:width}}>
     <View style={{flex:1,alignContent:'center'}}>
       {imageUri ? (
        <View style={{alignContent:'center',alignItems:'center',flex: 1}}>

              <ImageBackground  source={{ uri: imageUri }} style={{height:height,width:width,alignItems:'center',alignContent:'center',justifyContent:'space-between',paddingBottom:40}}  resizeMode="cover" >
              <View style={styles.headContainerStyle}>
                      <View style={styles.headRow}>
                        <Text style={styles.HeadtextStyle1}>Results</Text>
                        <Text style={styles.textStyle2}>Enjoy our scan plants</Text>
                       
                        
                      </View>
                      <TouchableOpacity onPress={pressHistory}>
                        <FontAwesomeIcon size={24} color={CIRCLE_BG} icon={icon({ name: 'history'})} />
                      </TouchableOpacity>
              </View>

              <View style={styles.ContainerSelect}>
              <TouchableOpacity style={styles.retakeButtton} onPress={resetImage}>
                    <Text>Retake</Text>
                  </TouchableOpacity>

              <TouchableOpacity style={styles.showDetailsButtton} onPress={() => {
                classifyImage()
                openFilterModal()
                //predict() 
              }}>
                    <Text>Details</Text>
              </TouchableOpacity>
         
              </View>
              </ImageBackground>

        </View>
      ) : (
        
            <View style={{alignContent:'center',flex:1,backgroundColor:'red'}}>
                 <Camera flashMode={flashMode} style={styles.camera} type={type} ref={cameraRef} ratio="16:9" >
                  <View style={styles.MenuContainerStyle} >
                  <View style={styles.headContainerStyle}>
                      <View style={styles.headRow}>
                        <Text style={styles.HeadtextStyle1}>Scan Plants</Text>
                        <Text style={styles.textStyle2}>Enjoy our scan plants</Text>
                      </View>
                      <TouchableOpacity onPress={pressHistory}>
                        <FontAwesomeIcon size={24} color={CIRCLE_BG} icon={icon({ name: 'history'})} />
                      </TouchableOpacity>
                  </View>


        
                  <View style={{  justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../assets/cameraBox.png')} style={{  resizeMode: 'cover' }} />
                    {!isTfReady && 
                    <View style={{backgroundColor: colors.buttoncolor, width: 120, height: 40, borderRadius:20, position:'absolute',justifyContent:'center',alignItems:'center'}}>
                      <Text>Loading Model...</Text>
                    </View>
                    }
                  </View>

                  <View style={styles.ContainerSelect}>
                     
                      <TouchableOpacity style={styles.FlashButton} onPress={toggleFlash}  disabled={!isTfReady}>

                      <FontAwesomeIcon  size={22} color={flashMode === 'auto' ? BG  : flashMode === 'on' ? 'yellow' : 'green'} icon={icon({ name: 'bolt'})} />
 
                      </TouchableOpacity> 

                      <TouchableOpacity style={styles.takePhotosButton} onPress={takePicture}  disabled={!isTfReady}>
                        <FontAwesomeIcon size={18} color={BG} icon={icon({ name: 'camera'})} /> 
                      </TouchableOpacity> 

                      <TouchableOpacity style={styles.selectPhotosButton} onPress={selectImage}  disabled={!isTfReady}>
                        <FontAwesomeIcon size={18} color={BG} icon={icon({ name: 'image'})} /> 
                      </TouchableOpacity>
                    </View>
                  
                  </View>
                 </Camera>
            </View>
            )}
          </View>
          
        <View>
        </View>

        <BottomSheetModal 
          snapPoints={snapPoints} 
          index={0} 
          ref={openFilterModalRef}
          backdropComponent={props => <CustomBackdrop {...props}/>}
          handleComponent={props => <CustomHandle {...props}/>}
          backgroundComponent={(props) => <CustomBackground {...props} />}
          >
          <View style={{gap:10}}>
           <View style={{gap:12,paddingHorizontal:24}}>
              <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              <View style={{flexDirection:'column',justifyContent:'space-between', alignContent:'flex-end', alignItems:'flex-start'}}>
                  
                  <Text style={{ fontSize: 18, color: colors.textcolor }}>Disease</Text>
                  <Text style={{ fontSize: 36, fontWeight:'600', color: colors.textcolor }}>{result ? JSON.parse(result).class : 'No result available'}</Text>

              </View>

              <View>
                  <FontAwesomeIcon size={20} color={CIRCLE_BG} icon={icon({ name: 'bookmark'})} />
              </View>

              </View>
              <View style={{flexDirection:'column',justifyContent:'space-between'}}>
              <View style={{ flexDirection: "row", gap: 20 }}>
                <View style={{ width: 120 }}>
                  <Text style={[styles.textStyle1,{color: colors.textcolor }]}>{result}</Text>
                </View>
                <View style={{ width: 120 }}>
                  <Text style={[styles.textStyle1,{color: colors.textcolor }]}>Monstera Kind</Text>
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

                {selectedButton === "Details" && (
                      <View style={{gap:9,marginHorizontal:24}}>
                          <Text style={[styles.textStyle1,{color: colors.textcolor }]}>Details Content</Text>
                          <ScrollView style={{borderRadius:12,padding:12,gap:8,borderColor: colors.textcolor,borderWidth:2}}>
                          <Text style={{textAlign: "justify",color: colors.textcolor}}>Leaf spot is a common fungal disease that can affect various plant species, including Monstera plants. It is caused by different types of fungi and can result in circular or irregularly shaped spots on the leaves of the affected plants. The disease is more likely to occur in conditions of high humidity and when the foliage remains wet for extended periods.</Text>
                          <Text style={{color:colors.textcolor}}>Symptoms:</Text>
                              <Text style={{textAlign: "justify",color: colors.textcolor}}>Circular or irregularly shaped spots on the leaves, usually with a distinct border.
                                  Spots can be of various colors, including yellow, brown, or black, depending on the stage and type of the disease.
                                  As the disease progresses, the spots may increase in size and number, leading to leaf yellowing and wilting.
                              </Text>
                          </ScrollView>
                      </View>
                    )}
                {selectedButton === "Treatment" && (
                  <View style={{marginHorizontal:24}}>
                    <Text style={[styles.textStyle1,{color: colors.textcolor }]}>Treatment Content</Text>
                  </View>
                )}
            </View>
          </BottomSheetModal>
      </View>

  )
  
}

export default Cameras 

const { width,height } = Dimensions.get("window");

const BG = '#C1FC49'
const CIRCLE_BG= '#86ba1c'
const styles = StyleSheet.create({
  containerPermission:{
    width:width,
    height:height,
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center'
    
  },
  camera:{
    width:width,
    height:height
  },
  borderHorizontal: {
    backgroundColor: "gray",
    width: 2,
    height: 24,
    borderRadius: 2,
  }, 
  ButtonMenu: {
    width: width / 4,
    height: 28,
    borderRadius: 8,
    
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },

  headContainerStyle: {
    height:120,
    width: width,
    alignContent: 'center',
    backgroundColor: BG,
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    borderBottomRightRadius: 24,
    paddingHorizontal: 24,
    ...Platform.select({
      ios: {
        paddingTop: 40,
      },
      android: {
        paddingTop: 30,
      }
    })
  },
  containerMenu: {
    backgroundColor: BG,
    borderRadius: 12,
    height: 40,
    marginHorizontal: 24,
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
 
  headRow: {
   flexDirection:'column'
  },
  headTextStyle: {
    fontSize: width > 400 ? 32 : 22,
    fontWeight: "600",
  },
  MenuContainerStyle: {
    justifyContent:'space-between',
    width:width,
    height:height,
    alignItems:'center',
    
    ...Platform.select({
      ios: {
        paddingBottom:90
      },
      android: {
        paddingBottom:60
      }
    })
  },
  ContainerSelect: {
    paddingHorizontal:80,
    bottom: width > 400 ? 48 : 12,
    width: width, 
    flexDirection: 'row',
    alignItems: 'center',
    alignContent:'center',
    justifyContent: 'space-between',
  },
  takePhotosButton: {
    width: width > 400 ? 72 : 62,
    aspectRatio: 1,
    borderRadius: 60,
    backgroundColor: CIRCLE_BG,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectPhotosButton: {
    width:width > 400 ? 48 : 42,
    aspectRatio:1,
    borderRadius:60,
    backgroundColor: CIRCLE_BG,
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
  },
  buttonIndicator: {
    position: "absolute",
  
    left: 0,
    width: width / 4.4,
    height: 28,

    borderRadius: 8,
  },
  FlashButton: {
    width:width > 400 ? 48 : 42,
    aspectRatio:1,
    
    borderRadius:60,
    backgroundColor: CIRCLE_BG,
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
  },
  retakeButtton: {
    backgroundColor:BG,
    width:width > 400 ? 108 : 90,
    height:width > 400 ? 42 : 32,
    borderRadius:30,
    alignItems:'center',
    justifyContent:'center'
  },
  showDetailsButtton: {
    backgroundColor:BG,
    width:width > 400 ? 108 : 90,
    height:width > 400 ? 42 : 32,
    borderRadius:30,
    alignItems:'center',
    justifyContent:'center'
  },
 
  container: {
    height: width > 400 ? 360 : 260,
    width: width > 400 ? 360 : 260,
    borderRadius: 20,
    padding: 10,
    justifyContent:'flex-end',
    alignItems:'flex-end',
  },
  containerImage: {
    position: 'absolute',
    height: width > 400 ? 360 : 260,
    width: width > 400 ? 360 : 260,
    borderRadius: 20,
  },
 
  containerNoImage: {
    height: width > 400 ? 360 : 260,
    width: width,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20
  },
  HeadtextStyle1: {
    fontSize: width > 400 ? 28 : 22,
    fontWeight:'600'
  },
  textStyle1: {
    fontSize: width > 400 ? 22 : 16,
  },
  textStyle2: {
    fontSize: width > 400 ? 16 : 12,
  },
  scanContainer: {
    height: width > 400 ? 80 : 60,
    backgroundColor: BG,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    gap: 20
  }, 
  addImagesButton: {
    position: 'relative',
    width: width > 400 ? 46 : 36,
    aspectRatio: 1,
    borderRadius: 60,
    backgroundColor: CIRCLE_BG,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scanButton: {
    width: width > 400 ? 40 : 32,
    aspectRatio: 1,
    borderRadius: 60,
    backgroundColor: CIRCLE_BG,
    justifyContent: 'center',
    alignItems: 'center', 
  },
 

});