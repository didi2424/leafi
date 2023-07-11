import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Circle, Defs, G, Marker, Path } from 'react-native-svg'

const CircleLight = () => {

    const light =27;
    const light2 = 30;
    
    const lightmax = 100;
    const sum = light + light2;
    const scalingFactor = lightmax / sum;
    
    const la = light * scalingFactor;  // la = 29 * (50 / 49) ≈ 29.7959
    const lb = light2 * scalingFactor; // lb = 20 * (50 / 49) ≈ 20.4082

    const size = 360;
    const radius = (size - 80) / 2;
    const circum = radius * 2 * Math.PI;
    const svgNor = 100 - 50;
    const svgProgress = 100 - la;
    const svgProgress2 = 100 - lb;
    const pinkRotation = (360 * svgProgress) / 100;
    const rotation = -pinkRotation;

    console.log(la)
    console.log(lb)
    console.log(lb+lb)
    return (
      <View style={{ margin: 10 }}>
        <Svg width={size} height={size}>
        
     

           <Circle
            stroke="#000"
            fill="black"
            cx={size / 2}
            cy={size / 2}
            r={-radius/1.4}
            strokeWidth={25}
            strokeDasharray={`${circum} ${circum}`}
             
          />
         <Circle
            stroke="red"
            id='dot'
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={-radius/7}
            strokeWidth={20}
            strokeDasharray={`${circum} ${circum}`}
          />
  
          <Circle
            stroke="#619100"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={-radius}
            strokeWidth={25}
            strokeDasharray={`${circum} ${circum}`}
            strokeDashoffset={radius * Math.PI * 2 * (svgProgress / 100)}
            strokeLinecap={'round'}
          />
         
  
          <G transform={`rotate(${rotation} ${size / 2} ${size / 2})`}>
            <Circle
              stroke="pink"
              fill="none"
              cx={size / 2}
              cy={size / 2}
              r={-radius}
              strokeWidth={25}
              strokeDasharray={`${circum} ${circum}`}
              strokeDashoffset={radius * Math.PI * 2 * (svgProgress2 / 100)}
              strokeLinecap={'round'}
            />
          </G>
        </Svg>
      </View>
    );
  };


export default CircleLight