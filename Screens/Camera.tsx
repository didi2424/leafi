import { View, Text,Image, StyleSheet,Dimensions, Platform  } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import api from '../api';

type Props = {
  onScreenChange: (screenNumber: number) => void;
  onDeviceData: (data: any) => void;
};

const Camera = ({onScreenChange,onDeviceData}: Props) => {
  const [imageUri, setImageUri] = useState<null | string>(null);
  const [uploadResponse, setUploadResponse] = useState('');

  const handlePress = () => {
    onScreenChange(1)
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
 
  return (
    <View style={{height:height,width:width}}>
     <View style={{flex:1,alignContent:'center',gap:10}}>
      <View style={styles.headContainerStyle}>
        <Text style={styles.HeadtextStyle1}>Scan Plants</Text>
        <Text style={styles.textStyle2}>Enjoy our scan plants</Text>
      </View>
     
       {imageUri ? (
          <View style={{alignContent:'center',justifyContent:'space-between',alignItems:'center'}}>
        <View style={styles.container}>
          <Image resizeMode='cover' source={{ uri: imageUri }} style={styles.containerImage}/>
            <TouchableOpacity  style={styles.addImagesButton} onPress={selectImage}>
              <FontAwesomeIcon size={20} color={BG} icon={icon({ name: 'image'})} /> 
            </TouchableOpacity>
        </View>
        </View>
      ) : (
        <View style={{alignContent:'center',justifyContent:'space-between',alignItems:'center'}}>
        <TouchableOpacity style={styles.containerNoImage} onPress={selectImage}>
          <Text>No Image Selected</Text>
        </TouchableOpacity>
        </View>
      )}
    
    <View>
        
        <Text style={styles.HeadtextStyle1}>Select Mode</Text>
  
          <View style={styles.ContainerSelect}>
            <View style={styles.selectModeButton}>
              <FontAwesomeIcon size={18} color={BG} icon={icon({ name: 'camera'})} /> 
            </View>
            <View style={styles.selectModeButton}>
              <FontAwesomeIcon size={18} color={BG} icon={icon({ name: 'image'})} /> 
            </View>  
          </View>
  
          </View>
            {imageUri ? (
                <View style={styles.scanContainer}>
              
                <TouchableOpacity style={styles.scanButton} onPress={uploadImage}>
                  <FontAwesomeIcon color={BG} icon={icon({ name: 'expand' })} /> 
                </TouchableOpacity>
        
                {uploadResponse && (
                <View>
                  <Text style={styles.textStyle1}>Class: {uploadResponse.class}</Text>
                  <Text style={styles.textStyle2} >Probability: {uploadResponse.probability} %</Text>
                </View>
                )}
           <TouchableOpacity style={styles.bookMarkButton} onPress={handlePress} >
             <FontAwesomeIcon color={CIRCLE_BG} icon={icon({ name: 'bookmark' })} /> 
           </TouchableOpacity>
   
       </View>
   
      ) : (
          <Text>Please press for select an images</Text>        
      )}

      </View>
      </View>
  )
}

export default Camera

const { width,height } = Dimensions.get("window");

const BG = '#C1FC49'
const CIRCLE_BG= '#86ba1c'
const styles = StyleSheet.create({
  headContainerStyle: {
    flex: 0.4,
    width: width,
    alignContent: "center",
    backgroundColor: BG,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
  headTextStyle: {
    fontSize: width > 400 ? 32 : 22,
    fontWeight: "600",
  },
  ContainerSelect: {
    justifyContent:'center',
    padding:4,
    gap:10,
    width: width > 400 ? 120 : 90,
    borderRadius:28,
    backgroundColor:BG,
    flexDirection:'row',
    alignItems:'center'
  },
  selectModeButton: {
    width:width > 400 ? 50 : 30,
    aspectRatio:1,
    borderRadius:60,
    backgroundColor: CIRCLE_BG,
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center'

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
    width: width > 400 ? 360 : 260,
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
  bookMarkButton: {
    justifyContent: 'center',
    alignItems: 'center'
  }

});