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

const CircleCustom = (props: SvgProps) => {

  

  const markerRendering1 = `<svg width="255" height="142" viewBox="0 0 255 142" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M240.136 127.57C240.136 97.674 228.26 69.0022 207.12 47.8623C185.98 26.7225 157.308 14.8463 127.412 14.8463C97.5156 14.8463 68.8438 26.7225 47.704 47.8623C26.5642 69.0022 14.6879 97.6739 14.6879 127.57" stroke="#79B400" stroke-width="28" stroke-linecap="round"/>
<path d="M240.136 127.57C240.136 97.674 228.26 69.0022 207.12 47.8623C185.98 26.7225 157.308 14.8463 127.412 14.8463C97.5156 14.8463 68.8438 26.7225 47.704 47.8623C26.5642 69.0022 14.6879 97.6739 14.6879 127.57" stroke="#A2F100" stroke-width="22" stroke-linecap="round"/>
<path d="M14.6878 127.57C14.6878 109.125 19.2144 90.9608 27.8703 74.6723C36.5263 58.3838 49.0472 44.4683 64.3346 34.1466C79.622 23.825 97.2088 17.4126 115.552 15.4719C133.895 13.5312 152.434 16.1216 169.543 23.0158" stroke="url(#paint0_linear_12_259)" stroke-width="14" stroke-linecap="round"/>
<path d="M187.894 32.4463C204.778 43.1812 218.5 58.2163 227.651 76.0076" stroke="url(#paint1_linear_12_259)" stroke-width="14" stroke-linecap="round"/>
<path d="M234.715 93.0342C238.316 104.223 240.145 115.906 240.136 127.66" stroke="url(#paint2_linear_12_259)" stroke-width="14" stroke-linecap="round"/>
<defs>
<linearGradient id="paint0_linear_12_259" x1="40.3576" y1="116.967" x2="161.452" y2="63.9537" gradientUnits="userSpaceOnUse">
<stop stop-color="#F2FEDA"/>
<stop offset="1" stop-color="#E0FDA4"/>
</linearGradient>
<linearGradient id="paint1_linear_12_259" x1="180.984" y1="39.4" x2="220.604" y2="81.2529" gradientUnits="userSpaceOnUse">
<stop stop-color="#E0FDA4"/>
<stop offset="1" stop-color="#CDFC6D"/>
</linearGradient>
<linearGradient id="paint2_linear_12_259" x1="225.627" y1="92.9718" x2="237.425" y2="127.66" gradientUnits="userSpaceOnUse">
<stop stop-color="#CDFC6D"/>
<stop offset="1" stop-color="#C1FC49"/>
</linearGradient>
</defs>
</svg>

  
  `;
  
  const current = `<svg width="335" height="336" viewBox="0 0 335 336" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="55.0031" cy="168.003" r="9" transform="rotate(-0.02 55.0031 168.003)" fill="#619100"/>
  </svg>
  
  `;

  const MinimalTemp = `<svg width="335" height="336" viewBox="0 0 335 336" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="55.0024" cy="168.002" r="7" transform="rotate(-0.02 55.0024 168.002)" fill="#81C000"/>
  </svg>
  
  
  `;

  const HighTemp = `<svg width="335" height="336" viewBox="0 0 335 336" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="55.0024" cy="168.002" r="7" transform="rotate(-0.02 55.0024 168.002)" fill="#81C000"/>
  </svg>
  
  `;
  let textTemp = '';
  const temperature = 27
  const minTemp = 20 
  const maxTemp = 30 
  

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

<View style={{ position: 'relative', width: 200, height: 200}}>
  <View style={{ position: 'absolute', top: '50%', left: '50%', marginTop: -60, marginLeft: -60, width: 120, height: 120,alignContent:'center',justifyContent:'center',alignItems:'center' }}>
    <SvgXml xml={markerRendering1} />
  </View>
  <View style={{ position: 'absolute', top: '50%', left: '50%', marginTop: 21, marginLeft: -35, width: 70, height: 70,alignContent:'center',justifyContent:'center',alignItems:'center' }}>
    <SvgXml style={{ transform: [{ rotate: `${rotationDegree}deg` }]}}xml={current} />
  </View>
  <View style={{ position: 'absolute', top: '50%', left: '50%', marginTop: 21, marginLeft: -35, width: 70, height: 70,alignContent:'center',justifyContent:'center',alignItems:'center' }}>
    <SvgXml style={{ transform: [{ rotate: `${rotationDegreemin}deg` }]}}xml={MinimalTemp} />
  </View>
  <View style={{ position: 'absolute', top: '50%', left: '50%', marginTop: 21, marginLeft: -35, width: 70, height: 70,alignContent:'center',justifyContent:'center',alignItems:'center' }}>
    <SvgXml style={{ transform: [{ rotate: `${rotationDegreemax}deg` }]}}xml={HighTemp} />
  </View>


  <View style={{flexDirection:'column',gap:1,alignContent:'center',justifyContent:'center',alignItems:'center',marginTop:100}}>
      
      <View style={{flexDirection:'row'}}>
      <Text style={{fontSize:50,fontWeight:'600',color:'#86ba1c'}}>{temperature}</Text>
      <Text  style={{fontSize:22,fontWeight:'500',color:'#9ac93a'}}>°C</Text>
      </View>
      
      <Text  style={{fontSize:18,fontWeight:'400',color:'#9ac93a'}}>{textTemp}</Text>
    </View>
</View>


   
    
  );
};

export default CircleCustom;
