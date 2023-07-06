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

const CircleTemp = (props: SvgProps) => {

  const BACKGROUD_MAIN = ''
  

  

  const markerRendering1 = `<svg width="275" height="275" viewBox="0 0 275 275" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M137 259.043C112.871 259.034 89.2857 251.871 69.2276 238.459C49.1695 225.046 33.5391 205.987 24.313 183.691C15.0869 161.395 12.6794 136.864 17.3951 113.2C22.1107 89.5361 33.7377 67.8018 50.8056 50.7458C67.8736 33.6897 89.616 22.0779 113.283 17.3788C136.951 12.6796 161.48 15.1042 183.769 24.3459C206.059 33.5876 225.107 49.2312 238.506 69.2987C251.904 89.3662 259.051 112.956 259.043 137.085" stroke="#C7EF75" stroke-width="30" stroke-linecap="round"/>
  <path d="M137 259.043C112.871 259.034 89.2857 251.871 69.2276 238.459C49.1695 225.046 33.5391 205.987 24.313 183.691C15.0869 161.395 12.6794 136.864 17.3951 113.2C22.1107 89.5361 33.7377 67.8018 50.8056 50.7458C67.8736 33.6897 89.616 22.0779 113.283 17.3788C136.951 12.6796 161.48 15.1042 183.769 24.3459C206.059 33.5876 225.107 49.2312 238.506 69.2987C251.904 89.3662 259.051 112.956 259.043 137.085" stroke="#81C000" stroke-width="20" stroke-linecap="round"/>
  <path d="M194.029 29.1703C213.627 39.5231 230.033 55.019 241.488 73.9935C252.942 92.9681 259.011 114.704 259.042 136.868" stroke="url(#paint0_linear_26_57)" stroke-width="15" stroke-linecap="round"/>
  <path d="M137 259.043C116.145 259.036 95.6404 253.682 77.4435 243.495C59.2465 233.307 43.965 218.624 33.0579 200.849C22.1509 183.074 15.9825 162.799 15.1417 141.961C14.301 121.123 18.8159 100.418 28.2555 81.8218" stroke="url(#paint1_linear_26_57)" stroke-width="15" stroke-linecap="round"/>
  <path d="M137 259.043C116.145 259.036 95.6404 253.682 77.4435 243.495C59.2465 233.307 43.965 218.624 33.0579 200.849C22.1509 183.074 15.9825 162.799 15.1417 141.961C14.301 121.123 18.8159 100.418 28.2555 81.8218" stroke="url(#paint2_linear_26_57)" stroke-width="15" stroke-linecap="round"/>
  <path d="M43.4296 58.8086C57.8947 41.5 76.8752 28.5407 98.2624 21.3705C119.65 14.2003 142.606 13.0999 164.581 18.1916" stroke="url(#paint3_linear_26_57)" stroke-width="15" stroke-linecap="round"/>
  <defs>
  <linearGradient id="paint0_linear_26_57" x1="223" y1="147" x2="170.5" y2="84" gradientUnits="userSpaceOnUse">
  <stop stop-color="#A8E231"/>
  <stop offset="1" stop-color="#CDFC6D"/>
  </linearGradient>
  <linearGradient id="paint1_linear_26_57" x1="144.5" y1="253.5" x2="52.5" y2="93" gradientUnits="userSpaceOnUse">
  <stop stop-color="#F7FFE7"/>
  <stop offset="1" stop-color="#E0FDA4"/>
  </linearGradient>
  <linearGradient id="paint2_linear_26_57" x1="144.5" y1="253.5" x2="52.5" y2="93" gradientUnits="userSpaceOnUse">
  <stop stop-color="#F7FFE7"/>
  <stop offset="1" stop-color="#E0FDA4"/>
  </linearGradient>
  <linearGradient id="paint3_linear_26_57" x1="182" y1="56" x2="60" y2="137" gradientUnits="userSpaceOnUse">
  <stop stop-color="#CDFC6D"/>
  <stop offset="1" stop-color="#E0FDA4"/>
  </linearGradient>
  </defs>
  </svg>
  

  
  `;
  
  const current = `<svg width="284" height="284" viewBox="0 0 284 284" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g filter="url(#filter0_d_25_56)">
  <circle cx="143" cy="264" r="11" fill="#619100"/>
  </g>
  <defs>
  <filter id="filter0_d_25_56" x="125" y="246" width="36" height="36" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  <feMorphology radius="3" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_25_56"/>
  <feOffset/>
  <feGaussianBlur stdDeviation="2"/>
  <feComposite in2="hardAlpha" operator="out"/>
  <feColorMatrix type="matrix" values="0 0 0 0 0.803922 0 0 0 0 0.988235 0 0 0 0 0.431373 0 0 0 1 0"/>
  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_25_56"/>
  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_25_56" result="shape"/>
  </filter>
  </defs>
  </svg>
  
  
  `;

  const MinimalTemp = `<svg width="284" height="284" viewBox="0 0 284 284" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g filter="url(#filter0_d_25_54)">
  <circle cx="142" cy="264" r="8" fill="#91D600"/>
  </g>
  <defs>
  <filter id="filter0_d_25_54" x="132" y="255" width="22" height="22" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  <feOffset dx="1" dy="2"/>
  <feGaussianBlur stdDeviation="1.5"/>
  <feComposite in2="hardAlpha" operator="out"/>
  <feColorMatrix type="matrix" values="0 0 0 0 0.380419 0 0 0 0 0.566667 0 0 0 0 0 0 0 0 1 0"/>
  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_25_54"/>
  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_25_54" result="shape"/>
  </filter>
  </defs>
  </svg>  
  `;

  const HighTemp = `<svg width="284" height="284" viewBox="0 0 284 284" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g filter="url(#filter0_d_25_53)">
  <circle cx="142" cy="264" r="8" fill="#2a6f29"/>
  </g>
  <defs>
  <filter id="filter0_d_25_53" x="132" y="255" width="22" height="22" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  <feOffset dx="1" dy="2"/>
  <feGaussianBlur stdDeviation="1.5"/>
  <feComposite in2="hardAlpha" operator="out"/>
  <feColorMatrix type="matrix" values="0 0 0 0 0.380419 0 0 0 0 0.566667 0 0 0 0 0 0 0 0 1 0"/>
  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_25_53"/>
  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_25_53" result="shape"/>
  </filter>
  </defs>
  </svg>
  `;
  let textTemp = '';
  const temperature = 30
  const minTemp = 20
  const maxTemp = 31
  

    let rotationDegree;
    let rotationDegreemin;
    let rotationDegreemax;

    if (temperature <= minTemp ) {
      textTemp = 'Too Cold';
    } else if (temperature > minTemp && temperature <= maxTemp) {
      textTemp = 'I like this ';
    } else if (temperature > maxTemp) {
      textTemp = 'to hot';
    }

    if (temperature >= 0 && temperature <= 26) {
      rotationDegree = (temperature / 26) * 118;
    } else if (temperature > 26 && temperature <= 36) {
      rotationDegree = ((temperature - 26) / 10) * (198 - 126) + 126;
    } else if (temperature > 36 && temperature <= 45) {
      rotationDegree = ((temperature - 36) / 9) * (270 - 198) + 198;
    } else {
      rotationDegree = 0;
    }

    if (minTemp >= 0 && minTemp <= 26) {
      rotationDegreemin = (minTemp / 26) * 118;
    } else if (minTemp > 26 && minTemp <= 36) {
      rotationDegreemin = ((minTemp - 26) / 10) * (198 - 126) + 126;
    } else if (minTemp > 36 && minTemp <= 45) {
      rotationDegreemin = ((minTemp - 36) / 9) * (270 - 198) + 198;
    } else { 
      rotationDegreemin = 0;
    }

    if (maxTemp >= 0 && maxTemp <= 26) {
      rotationDegreemax = (maxTemp / 26) * 118;
    } else if (maxTemp > 26 && maxTemp <= 36) {
      rotationDegreemax = ((maxTemp - 26) / 10) * (198 - 126) + 126;
    } else if (maxTemp > 36 && maxTemp <= 45) {
      rotationDegreemax = ((maxTemp - 36) / 9) * (270 - 198) + 198;
    } else {
      rotationDegreemax = 0; 
    }
  return (

<View style={{ position: 'relative', width: 200, height: 200}}>
  <View style={{ position: 'absolute', top: '50%', left: '50%', marginTop: -60, marginLeft: -60, width: 120, height: 120,alignContent:'center',justifyContent:'center',alignItems:'center' }}>
    <SvgXml xml={markerRendering1} />
  </View>
  <View style={{ position: 'absolute', top: '50%', left: '50%', marginTop: -35, marginLeft: -35, width: 70, height: 70,alignContent:'center',justifyContent:'center',alignItems:'center' }}>
    <SvgXml style={{ transform: [{ rotate: `${rotationDegree}deg` }]}}xml={current} />
  </View>
  <View style={{ position: 'absolute', top: '50%', left: '50%', marginTop: -35, marginLeft: -35, width: 70, height: 70,alignContent:'center',justifyContent:'center',alignItems:'center' }}>
    <SvgXml style={{ transform: [{ rotate: `${rotationDegreemin}deg` }]}}xml={MinimalTemp} />
  </View>
  <View style={{ position: 'absolute', top: '50%', left: '50%', marginTop: -35, marginLeft: -35, width: 70, height: 70,alignContent:'center',justifyContent:'center',alignItems:'center' }}>
    <SvgXml style={{ transform: [{ rotate: `${rotationDegreemax}deg` }]}}xml={HighTemp} />
  </View>


  <View style={{flexDirection:'column',gap:1,alignContent:'center',justifyContent:'center',alignItems:'center',marginTop:70}}>
      
      <View style={{flexDirection:'row'}}>
      <Text style={{fontSize:50,fontWeight:'600',color:'#86ba1c'}}>{temperature}</Text>
      <Text  style={{fontSize:22,fontWeight:'500',color:'#9ac93a'}}>°C</Text>
      </View>
      
      <Text  style={{fontSize:18,fontWeight:'600',color:'#9ac93a'}}>{textTemp}</Text>
    </View>

    <View style={{flexDirection:'column',gap:1,justifyContent:'center',alignItems:'flex-start',marginTop:-5,left:120}}>
      <View style={{flexDirection:'row'}}>
      <Text style={{fontSize:50,fontWeight:'600',color:'#86ba1c'}}>Monstera</Text>
      </View>
      <Text  style={{fontSize:18,fontWeight:'400',color:'#9ac93a'}}>Araceae</Text>
    </View>

    

    <View style={{flexDirection:'column',gap:1,justifyContent:'center',alignItems:'flex-start',marginTop:-270,left:-90}}>
      <View style={{flexDirection:'row'}}>
      <Text style={{fontSize:25,fontWeight:'600',color:'#86ba1c'}}>50 days</Text>
      </View>
      <Text  style={{fontSize:12,fontWeight:'400',color:'#9ac93a'}}>Age</Text>
    </View>

    <View style={{flexDirection:'column',gap:6,justifyContent:'center',alignItems:'flex-start',top:-36,right:-210}}>
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:8}}>
        <View style={{backgroundColor:'#619100',width:14,aspectRatio:1,borderRadius:20}}></View>
        <Text style={{fontSize:14,fontWeight:'600',color:'#86ba1c'}}>Current</Text>
      </View>
      <View style={{left:2,flexDirection:'row',justifyContent:'center',alignItems:'center',gap:10}}>
        <View style={{backgroundColor:'#91D600',width:10,aspectRatio:1,borderRadius:20}}></View>
        <Text style={{fontSize:14,fontWeight:'600',color:'#86ba1c'}}>R Minimal</Text>
      </View>
      <View style={{left:2,flexDirection:'row',justifyContent:'center',alignItems:'center',gap:10}}>
        <View style={{backgroundColor:'#2a6f29',width:10,aspectRatio:1,borderRadius:20}}></View>
        <Text style={{fontSize:14,fontWeight:'600',color:'#86ba1c'}}>R Maximal</Text>
      </View>
    </View>
   
</View>


   
    
  );
};

export default CircleTemp;
