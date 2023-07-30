import { View, Text,Image, StyleSheet,Dimensions, Platform, ImageBackground  } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraType } from 'expo-camera';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import api from '../api';

type Props = {
  onScreenChange: (screenNumber: number) => void;
  onDeviceData: (data: any) => void;
};

const Cameras = ({onScreenChange,onDeviceData}: Props) => {
  const [imageUri, setImageUri] = useState<null | string>(null);
  const [uploadResponse, setUploadResponse] = useState('');
  const cameraRef = useRef<Camera | null>(null); 
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [flashMode, setFlashMode] = useState<string>('off');


  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.containerPermission}>
        <Text style={{ textAlign: 'center' }}>We need your permission to use the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={{backgroundColor:CIRCLE_BG,width:120,height:30,alignItems:'center',justifyContent:'center',borderRadius:20}} >
            <Text>Grant Permission</Text>
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
        console.log('Photo taken!', photo);
        setImageUri(photo.uri);
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
        setImageUri(selectedImage.uri);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };
  
  const uploadImage = async () => {
    try {

      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        name: 'image.jpg',
        type: 'image/jpg',
      });
      const response = await api.post('/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadResponse(response.data);
      return false;

    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const pressHistory = () => {
    console.log('Pressed History')
  }

  const resetImage = () => {
    setImageUri(null);
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

             
                  <TouchableOpacity style={styles.retakeButtton} onPress={resetImage}>
                    <Text>Retake</Text>
                  </TouchableOpacity>
            
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
                  <View style={styles.ContainerSelect}>

                      <TouchableOpacity style={styles.FlashButton} onPress={toggleFlash}>
                        <FontAwesomeIcon size={18} color={BG} icon={icon({ name: 'bolt'})} />
                        <FontAwesomeIcon size={22} color={BG} icon={icon({ name: 'bolt'})}  /> 
                      </TouchableOpacity> 

                      <TouchableOpacity style={styles.takePhotosButton} onPress={takePicture}>
                        <FontAwesomeIcon size={18} color={BG} icon={icon({ name: 'camera'})} /> 
                      </TouchableOpacity> 

                      <TouchableOpacity style={styles.selectPhotosButton} onPress={selectImage}>
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

  headContainerStyle: {
    flex: 0.1,
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
    backgroundColor:CIRCLE_BG,
    width:60,
    aspectRatio:1,
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