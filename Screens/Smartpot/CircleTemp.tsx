import React, { useEffect, useRef, useState } from 'react';
import {View,Text, Animated, Dimensions,StyleSheet, Button} from 'react-native';
import { SvgXml } from "react-native-svg"


interface CircleTempProps {
  temperature: number;
  kind:string
  timeAdd: string
}
const CircleTemp: React.FC<CircleTempProps> = ({ temperature,kind,timeAdd }) => {
  
  let [textTemp, settextTemp ] = useState('');
  const minTemp = 20
  const maxTemp = 31
 


  const startDateString = timeAdd; // Replace with your start date
  const startDate = new Date(Date.parse(startDateString));

  const currentDate = new Date();
  const timeDiff = Math.abs(currentDate.getTime() - startDate.getTime());
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  console.log(daysDiff)

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


    const rotationDegree = useRef(new Animated.Value(0)).current;
    const rotationDegreemin = useRef(new Animated.Value(0)).current;
    const rotationDegreemax = useRef(new Animated.Value(0)).current;


    useEffect(() => {
      // Calculate the rotation degrees based on minTemp and maxTemp
      let degree = 0;
      let degreeMin = 0;
      let degreeMax = 0;
      if (temperature >= 0 && temperature <= 26) {
        degree = (temperature / 26) * 118;
      } else if (temperature > 26 && temperature <= 36) {
        degree = ((temperature - 26) / 10) * (198 - 126) + 126;
      } else if (temperature > 36 && temperature <= 45) {
        degree = ((temperature - 36) / 9) * (270 - 198) + 198;
      }
  
  
      if (minTemp >= 0 && minTemp <= 26) {
        degreeMin = (minTemp / 26) * 118;
      } else if (minTemp > 26 && minTemp <= 36) {
        degreeMin = ((minTemp - 26) / 10) * (198 - 126) + 126;
      } else if (minTemp > 36 && minTemp <= 45) {
        degreeMin = ((minTemp - 36) / 9) * (270 - 198) + 198;
      } else {
        degreeMin = 0;
      }
  
      if (maxTemp >= 0 && maxTemp <= 26) {
        degreeMax = (maxTemp / 26) * 118;
      } else if (maxTemp > 26 && maxTemp <= 36) {
        degreeMax = ((maxTemp - 26) / 10) * (198 - 126) + 126;
      } else if (maxTemp > 36 && maxTemp <= 45) {
        degreeMax = ((maxTemp - 36) / 9) * (270 - 198) + 198;
      } else {
        degreeMax = 0;
      }
      if (temperature <= minTemp ) {
        settextTemp('Too Cold');
      } else if (temperature > minTemp && temperature <= maxTemp) {
        settextTemp('I like this');
      } else if (temperature > maxTemp) {
        settextTemp('to hot')
      }
  
      
      // Start the animations
      Animated.parallel([
        Animated.timing(rotationDegreemin, {
          toValue: degreeMin,
          duration: 2000, // Duration of the animation in milliseconds
          useNativeDriver: true, // Add this for better performance
        }),
        Animated.timing(rotationDegreemax, {
          toValue: degreeMax,
          duration: 2000, // Duration of the animation in milliseconds
          useNativeDriver: true, // Add this for better performance
        }),
        Animated.timing(rotationDegree, {
          toValue: degree,
          duration: 2000, // Duration of the animation in milliseconds
          useNativeDriver: true, // Add this for better performance
        }),
      ]).start();
    }, [minTemp, maxTemp,temperature]);
   
 
  return (

  <View style={{ position: 'absolute', width: 200, height: 200}}>
    <View style={{ position: 'absolute', top: '50%', left: '50%', marginTop: -60, marginLeft: -60, width: 120, height: 120,alignContent:'center',justifyContent:'center',alignItems:'center' }}>
      <SvgXml xml={markerRendering1} height={(Dimensions.get('window').width > 400 ? "228%" : "180%")} width={(Dimensions.get('window').width > 400 ? "228%" : "180%")} />
    </View>
    <View style={{ position: 'absolute', top: '50%', left: '50%', marginTop: -35, marginLeft: -35, width: 70, height: 70,alignContent:'center',justifyContent:'center',alignItems:'center' }}>
    <Animated.View style={{ transform: [{ rotate: rotationDegree.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }) }] }}>
        <SvgXml xml={current} height={(Dimensions.get('window').width > 400 ? "166.2%" : "151.2%")} />
      </Animated.View>
    </View>
    <View style={{ position: 'absolute', top: '50%', left: '50%', marginTop: -35, marginLeft: -35, width: 70, height: 70,alignContent:'center',justifyContent:'center',alignItems:'center' }}>
    <Animated.View style={{ transform: [{ rotate: rotationDegreemin.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }) }] }}>
        <SvgXml xml={MinimalTemp} height={Dimensions.get('window').width > 400 ? "166%" : "151.2%"}  />
      </Animated.View>
    </View>
    <View style={{ position: 'absolute', top: '50%', left: '50%', marginTop: -35, marginLeft: -35, width: 70, height: 70,alignContent:'center',justifyContent:'center',alignItems:'center' }}>
    <Animated.View style={{ transform: [{ rotate: rotationDegreemax.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }) }] }}>
        <SvgXml xml={HighTemp} height={Dimensions.get('window').width > 400 ? "166%" : "151.2%"} />
      </Animated.View>
    </View>

    
    <View style={styles.overlayout}>

    <View style={{flexDirection:'row', justifyContent:'space-between',top: Dimensions.get('window').width > 400 ? -50 : -20 }}>
    <View style={{flexDirection:'column',gap:1,justifyContent:'center',alignItems:'flex-start'}}>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.textStyle3}>{daysDiff} days</Text>
        </View>
        <Text  style={{fontSize:12,fontWeight:'400',color:'#9ac93a'}}>Age</Text>
      </View>

      <View style={{flexDirection:'column',gap:6,justifyContent:'center',alignItems:'flex-start'}}>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:8}}>
          <View style={{backgroundColor:'#619100',width:14,aspectRatio:1,borderRadius:20}}></View>
          <Text style={styles.textStyle2}>Current</Text>
        </View>
        <View style={{left:2,flexDirection:'row',justifyContent:'center',alignItems:'center',gap:10}}>
          <View style={{backgroundColor:'#91D600',width:10,aspectRatio:1,borderRadius:20}}></View>
          <Text style={styles.textStyle2}>R Minimal</Text>
        </View>
        <View style={{left:2,flexDirection:'row',justifyContent:'center',alignItems:'center',gap:10}}>
          <View style={{backgroundColor:'#2a6f29',width:10,aspectRatio:1,borderRadius:20}}></View>
          <Text style={styles.textStyle2}>R Maximal</Text>
        </View>
      </View>
      </View>

    <View style={{flexDirection:'column',gap:2,alignContent:'center',justifyContent:'center',alignItems:'center'}}>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.textStyleTemp600}>{temperature}</Text>
          <Text  style={{fontSize:22,fontWeight:'500',color:'#9ac93a'}}>°C</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.textStyle3}>{textTemp}</Text>
          
        </View>
    </View>

      
      
      <View style={{flexDirection:'column',gap:1,justifyContent:'center',alignItems:'flex-start',left: Dimensions.get('window').width > 400 ? 240 : 180}}>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.textHeadStyle600}>{kind}</Text>
        </View>
        <Text  style={styles.textStyle40032}>Plants</Text>
      </View>
    </View>
  </View> 
  );
};

export default CircleTemp;

const { width,height } = Dimensions.get("window");
const BG_VIEW = "#C1FC49"
const styles = StyleSheet.create({
  textHeadStyle600: {
    fontSize: width > 400 ? 32 : 22,
    fontWeight: "600",
    color: "#86ba1c",
  },
  textStyleTemp600: {
    fontSize: width > 400 ? 42 : 36,
    fontWeight: "600",
    color: "#86ba1c",
  },
  textStyle40032: {
    fontSize: width > 400 ? 18 : 12,
    fontWeight: "400",
    color: "#9ac93a",
  },
  textStyle400: {
    fontSize: width > 400 ? 12 : 10,
    fontWeight: "400",
    color: "#86ba1c",
  },
  textStyle2: {
    fontSize: width > 400 ? 14 : 10,
    fontWeight: "600",
    color: "#86ba1c",
  },
  textStyle3: {
    fontSize: width > 400 ? 18 : 14,
    fontWeight: "600",
    color: "#9ac93a",
  },
  overlayout: {
    
    width: width > 400 ? 400 : 310,
    left: width > 400 ? -100 : -50,
  },
});