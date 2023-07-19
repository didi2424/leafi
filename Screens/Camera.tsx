import { View, Text,ScrollView,Image, Button  } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as tf from '@tensorflow/tfjs'

import path from 'path';

const loadModel = async () => {
  const modelPath = require('../assets/modes/model.json');

  try {
    const model = await tf.loadLayersModel(tf.io.browserFiles(modelPath));
    console.log('Model loaded successfully:', model);

    // Perform operations with the loaded model here

  } catch (error) {
    console.error('Error loading the model:', error);
  }
};
const Camera = () => {
  useEffect(() => {
    loadModel();
  }, []);
  return (
     <View>
       <Text> as</Text>
      </View>
  
  )
}

export default Camera