import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import { fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'; // Import FileSystem for saving the image
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'


const CommunityHome = () => {
  const [isTfReady, setIsTfReady] = useState(false);
  const [result, setResult] = useState('');
  const image = useRef(null);
  const [model, setModel] = useState(null);
  const class_names = ['cat', 'dog'];
  const [imageUri, setImageUri] = useState('');

  const [pickedImage, setPickedImage] = useState('');

  const load = async () => {
    try {
      await tf.ready();
      const modelJSON = require('../../assets/models/norescalecatdog.json');
      const modelWeights = require('../../assets/models/norescalecatdog.bin');
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

      console.log(batchedImageTensor);

      const predictions = model.predict(batchedImageTensor);
      const score = tf.softmax(predictions).dataSync();

      const maxPredictionIndex = score.indexOf(Math.max(...score));
      const confidence = (score[maxPredictionIndex] * 100).toFixed(2);

      setResult(`Class: ${class_names[maxPredictionIndex]}, Confidence: ${confidence}%`);
      console.log(class_names[maxPredictionIndex], confidence);
    } catch (error) {
      console.error('Error classifying image:', error);
      setResult('Error: Unable to classify the selected image.');
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
        setPickedImage(selectedImage.uri);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  const resetImage = () => {
    setImageUri('');
    setPickedImage('');
  };

  return (
    <View
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {!isTfReady && <Text>Loading TFJS model...</Text>}
      {imageUri ? (
        <ImageBackground source={{ uri: imageUri }} style={{ height: 400, width: 400, alignItems: 'center', alignContent: 'center', justifyContent: 'space-between', paddingBottom: 40 }} resizeMode="cover">
          <TouchableOpacity onPress={resetImage}>
            <Text>
              Reset Image
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      ) : (
        <View style={{ width: 400, height: 400, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
          <Text>no image selected</Text>
        </View>
      )}

      {isTfReady && result === '' && <Text>Classifying...</Text>}
      {result !== '' && <Text>{result}</Text>}

      <TouchableOpacity style={{}} onPress={selectImage}>
        <FontAwesomeIcon size={18} color='red' icon={icon({ name: 'image' })} />
      </TouchableOpacity>


      <TouchableOpacity style={{}} onPress={classifyImage}>
        <Text>details</Text>
      </TouchableOpacity>

    </View>
  )
}

export default CommunityHome;
