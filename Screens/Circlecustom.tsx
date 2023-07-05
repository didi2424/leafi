import React, { useState } from 'react';
import { Button, Dimensions, View,Text } from 'react-native';
import Svg, {
  SvgProps,
  Path,
  Defs,
  G,
  LinearGradient,
  Stop,
  Circle,
  SvgXml,
} from "react-native-svg"
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const CircleCustom = (props: SvgProps) => {
  const BACKGROUND_COLOR = '#444B6F';
  const BACKGROUND_STROKE_COLOR = '#303858';
  const STROKE_COLOR = '#A6E1FA';
  const CIRCLE_LENGTH = 760; // 2PI*R
  const R = CIRCLE_LENGTH /  - Math.PI/2;
 
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const progress = useSharedValue(0);
  const { width, height } = Dimensions.get('window');
  // Animated properties for the Circle component
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  // Function to start the animation
  const startAnimation = () => {
    progress.value = withTiming(1, { duration: 2000 });
  };
  

  const markerRendering1 = `<svg width="230" height="129" viewBox="0 0 230 129" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M216 115C216 88.2134 205.359 62.5237 186.418 43.5825C167.477 24.6413 141.787 14.0003 115 14.0003C88.2132 14.0003 62.5235 24.6413 43.5823 43.5825C24.6411 62.5237 14.0001 88.2134 14.0001 115" stroke="#DBDBDB" stroke-width="28" stroke-linecap="round"/>
  <g filter="url(#filter0_i_12_259)">
  <path d="M216 115C216 88.2134 205.359 62.5237 186.418 43.5825C167.477 24.6413 141.787 14.0003 115 14.0003C88.2132 14.0003 62.5235 24.6413 43.5823 43.5825C24.6411 62.5237 14.0001 88.2134 14.0001 115" stroke="#EBEBEB" stroke-width="22" stroke-linecap="round"/>
  </g>
  <path d="M14 115C14 98.4731 18.0557 82.1984 25.8114 67.604C33.5671 53.0096 44.7858 40.5415 58.4832 31.2933C72.1806 22.0452 87.9383 16.2997 104.374 14.5608C120.809 12.822 137.42 15.143 152.75 21.3201" stroke="url(#paint0_linear_12_259)" stroke-width="13" stroke-linecap="round"/>
  <path d="M169.192 29.7698C184.319 39.3882 196.614 52.8596 204.814 68.8005" stroke="url(#paint1_linear_12_259)" stroke-width="13" stroke-linecap="round"/>
  <path d="M211.143 84.0562C214.37 94.0813 216.008 104.549 216 115.081" stroke="url(#paint2_linear_12_259)" stroke-width="13" stroke-linecap="round"/>
  <defs>
  <filter id="filter0_i_12_259" x="3.00006" y="3.00028" width="224" height="127" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  <feOffset dy="4"/>
  <feGaussianBlur stdDeviation="2"/>
  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
  <feBlend mode="normal" in2="shape" result="effect1_innerShadow_12_259"/>
  </filter>
  <linearGradient id="paint0_linear_12_259" x1="37" y1="105.5" x2="145.5" y2="58.0003" gradientUnits="userSpaceOnUse">
  <stop stop-color="#40DFE9"/>
  <stop offset="1" stop-color="#FFD540"/>
  </linearGradient>
  <linearGradient id="paint1_linear_12_259" x1="163" y1="36.0003" x2="198.5" y2="73.5003" gradientUnits="userSpaceOnUse">
  <stop stop-color="#FFD540"/>
  <stop offset="1" stop-color="#FF5C28"/>
  </linearGradient>
  <linearGradient id="paint2_linear_12_259" x1="203" y1="84.0003" x2="213.572" y2="115.081" gradientUnits="userSpaceOnUse">
  <stop stop-color="#FF5C28"/>
  <stop offset="1" stop-color="#E61C00"/>
  </linearGradient>
  </defs>
  </svg>
  
  `;
  
  


  const markerRenderingTest = `<svg width="301" height="301" viewBox="0 0 301 301" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="49.0007" cy="152.035" r="10" transform="rotate(-0.02 49.0007 152.035)" fill="#B076D3"/>
  </svg>
  `;

  const minimalTemp = `<svg width="301" height="301" viewBox="0 0 301 301" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="49.0024" cy="150.002" r="7" transform="rotate(-0.02 49.0024 150.002)" fill="#6DFF9F"/>
  </svg>
  
  `;

  const HighTemp = `<svg width="301" height="301" viewBox="0 0 301 301" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="49.0024" cy="150.002" r="7" transform="rotate(-0.02 49.0024 150.002)" fill="#6DFF"/>
  </svg>
  `;
  let textTemp = '';
  const temperature = 19
  const maxTemp = 30 
  const minTemp = 20 

    let rotationDegree;


    if (temperature <= minTemp ) {
      textTemp = 'Too Cold';
    } else if (temperature > minTemp && temperature <= maxTemp) {
      textTemp = 'I like this ';
    } else if (temperature > maxTemp) {
      textTemp = 'to hot';
    }

    if (temperature >= 0 && temperature <= 26) {
      // Map temperature range 0-26 to rotation degree range 0-112
      rotationDegree = (temperature / 26) * 112;
    } else if (temperature > 26 && temperature <= 36) {
      // Map temperature range 27-36 to rotation degree range 124-152
      rotationDegree = ((temperature - 26) / 10) * (152 - 122) + 122;
    } else if (temperature > 36 && temperature <= 45) {
      // Map temperature range 37-45 to rotation degree range 164-180
      rotationDegree = ((temperature - 36) / 9) * (180 - 164) + 164;
    } else {
      // Handle temperatures outside the specified range
      rotationDegree = 0; // Default rotation degree
    }


    let rotationDegreemin;

    if (minTemp >= 0 && minTemp <= 26) {
      // Map temperature range 0-26 to rotation degree range 0-112
      rotationDegreemin = (minTemp / 26) * 112;
    } else if (minTemp > 26 && minTemp <= 36) {
      // Map temperature range 27-36 to rotation degree range 124-152
      rotationDegreemin = ((minTemp - 26) / 10) * (152 - 122) + 122;
    } else if (minTemp > 36 && minTemp <= 45) {
      // Map temperature range 37-45 to rotation degree range 164-180
      rotationDegreemin = ((minTemp - 36) / 9) * (180 - 164) + 164;
    } else {
      // Handle temperatures outside the specified range
      rotationDegreemin = 0; // Default rotation degree
    }

     // The temperature value within the range of 0 to 45

    let rotationDegreemax;

    if (maxTemp >= 0 && maxTemp <= 26) {
      // Map temperature range 0-26 to rotation degree range 0-112
      rotationDegreemax = (maxTemp / 26) * 112;
    } else if (maxTemp > 26 && maxTemp <= 36) {
      // Map temperature range 27-36 to rotation degree range 124-152
      rotationDegreemax = ((maxTemp - 26) / 10) * (152 - 122) + 122;
    } else if (maxTemp > 36 && maxTemp <= 45) {
      // Map temperature range 37-45 to rotation degree range 164-180
      rotationDegreemax = ((maxTemp - 36) / 9) * (180 - 164) + 164;
    } else {
      // Handle temperatures outside the specified range
      rotationDegreemax = 0; // Default rotation degree
    }
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center',top:340}}>
    
    <View style={{top:100}} >
      <SvgXml xml={markerRendering1} />
    </View>
      <View style={{ transform: [{ rotate: `${rotationDegree}deg` }], alignItems: 'center', justifyContent: 'center',top:-63}}>
        <SvgXml xml={markerRenderingTest} />
      </View>

      <View style={{top:-260,flexDirection:'column',gap:2,alignContent:'center',justifyContent:'center',alignItems:'center'}}>
      <Text  style={{fontSize:12,fontWeight:'400'}}>Current</Text>
      <View style={{flexDirection:'row'}}>
      <Text style={{fontSize:28,fontWeight:'600'}}>{temperature}</Text>
      <Text  style={{fontSize:22,fontWeight:'400'}}>°C</Text>
      </View>
      
      <Text  style={{fontSize:12,fontWeight:'400'}}>{textTemp}</Text>
    </View>

      <View style={{ transform: [{ rotate: `${rotationDegreemin}deg` }], alignItems: 'center', justifyContent: 'center',top:-420}}>
        <SvgXml xml={minimalTemp} />
      </View>
      <View style={{ transform: [{ rotate: `${rotationDegreemax}deg` }], alignItems: 'center', justifyContent: 'center',top:-722}}>
        <SvgXml xml={HighTemp} />
      </View>
 
  </View>
   
    
  );
};

export default CircleCustom;
