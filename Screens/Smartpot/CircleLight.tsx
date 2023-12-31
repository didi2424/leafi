import { Dimensions, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Svg, { Circle, Defs, G, Marker, Path,Line,Text } from 'react-native-svg'
import { polarToCartesian } from "../Helpers/geometry";

const CircleLight = () => {
  const HOURS_BG = '#86ba1c'
  const MINUTE_BG = '#91D600'
  const SECOND_BG = '#91C000'
  const CLOCK_BG = '#234d20'
  const lightPercentage = 10; 

  const radius = Dimensions.get('window').width > 400 ? 130-16 : 100-16
  const center = 130
  const minutes = 75
  const hours = 12
  
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])
  let currentHour = currentTime.getHours();

// Convert 24-hour format to 12-hour format
  currentHour = currentHour % 12 || 12;


  const minutesArray = new Array(minutes).fill(1);
  const hoursArray = new Array(hours).fill(1);
  const minuteSticks = minutesArray.map((minute, index) => {
    
    const start = polarToCartesian(center, center, radius, index * 5);
    const end = polarToCartesian(center, center, radius, index * 5);
    return (
      <Line
        stroke='#86ba1c'
        strokeWidth={3}
        strokeLinecap='round'
        key={index}
        x1={start.x}
        x2={end.x}
        y1={start.y}
        y2={end.y}
      />
      
    );
  });

  const hourSticks = hoursArray.map((hour, index) => {
    const start = polarToCartesian(center, center, radius - 8, index * 30);
    const end = polarToCartesian(center, center, radius, index * 30);
    const time = polarToCartesian(center, center, radius - 28, index * 30);

    return (
      
      <G key={index}>
        <Circle
          fill="#9ac93a"
          strokeWidth={Dimensions.get('window').width > 400 ? 10 : 6}
          x={time.x}
          y={time.y}
          r={10}   
        />
        <Line
          stroke='#9ac93a'
          strokeWidth={8}
          strokeLinecap='round'
          x1={start.x}
          x2={end.x}
          y1={start.y}
          y2={end.y}
        />
        
        <Text
          textAnchor='middle'
          fontSize={Dimensions.get('window').width > 400 ? 12 : 8}
          fontWeight='bold'
          fill='#619100'
          alignmentBaseline='central'
          x={time.x}
          y={time.y}>
          {index === 0 ? 12 : index}
        </Text>
        
      </G>
    );
  })

  const secondCircle = polarToCartesian(
    center,
    center,
    radius,
    currentTime.getSeconds() * 6
  );

  const minuteCircle = polarToCartesian(
    center,
    center,
    radius,
    (currentTime.getMinutes() + currentTime.getSeconds() / 60) * 6
  );
  const hoursCircle = polarToCartesian(
    center,
    center,
    radius,
    ((currentHour % 12) + currentTime.getMinutes() / 60) * 30
  );
  const hoursLineStart = polarToCartesian(center, center, radius - (Dimensions.get('window').width > 400 ? 140 : 90), ((currentHour % 12) + currentTime.getMinutes() / 60) * 30);
  const hoursLineEnd = polarToCartesian(center, center, radius-(Dimensions.get('window').width > 400 ? 60 : 40), ((currentHour % 12) + currentTime.getMinutes() / 60) * 30);
  const minutesLineStart = polarToCartesian(center, center, radius - (Dimensions.get('window').width > 400 ? 140 : 90),(currentTime.getMinutes() + currentTime.getSeconds() / 60) * 6);
  const minutesLineEnd = polarToCartesian(center, center, radius - (Dimensions.get('window').width > 400 ? 50 : 50), (currentTime.getMinutes() + currentTime.getSeconds() / 60) * 6);
  const secondLineStart = polarToCartesian(center, center, radius - (Dimensions.get('window').width > 400 ? 140 : 90),currentTime.getSeconds() * 6)
  const secondLineEnd = polarToCartesian(center, center, radius -(Dimensions.get('window').width > 400 ? 42 : 30),currentTime.getSeconds() * 6)
  const maxLightPercentage = 100; 
  const numberOfCircles = Math.floor((lightPercentage / maxLightPercentage) * 20) + 8;

  const circleArray = [];
  const colors = ["#86ba1c", "#91D600", "#5d8213", "#435d0e"];
  for (let i = 0; i < numberOfCircles; i++) {
    const cx = Math.random() * 90 + center - 40; // Random x-coordinate between center-10 and center+10
    const cy = Math.random() * 90 + center - 40; // 
    const radius = Math.random() * (Dimensions.get('window').width > 400 ? 8 : 3) + 2; // Random radius between 5 and 25
    const randomColorIndex = Math.floor(Math.random() * colors.length);
    const fill = colors[randomColorIndex];

    circleArray.push(
      <Circle
        key={i}
        fill={fill}
        cx={cx}
        cy={cy}
        r={radius}
      />
    );
  }

    return (
        <Svg height={260} width={260} style={{top:-20}}>
          <G>
          <G>
            <Circle
              fill={CLOCK_BG}
              cx={center}
              cy={center}
              r={Dimensions.get('window').width > 400 ? radius+14 : radius+12}
            />
             <Circle
              fill={'#385e36'}
              cx={center}
              cy={center}
              r={70}
            />
            {circleArray}
          </G>
          {minuteSticks}
          {hourSticks}
          <Circle
            fill={SECOND_BG}
            cx={secondCircle.x }
            cy={secondCircle.y }
            r={Dimensions.get('window').width > 400 ? 4 : 3}
          />
          <Circle
            fill={MINUTE_BG}
            cx={minuteCircle.x}
            cy={minuteCircle.y}
            r={Dimensions.get('window').width > 400 ? 8 : 3}
          />
          <Circle
            fill={HOURS_BG}
            cx={hoursCircle.x}
            cy={hoursCircle.y}
            r={Dimensions.get('window').width > 400 ? 12 : 8}
          />
          <Line
              stroke={HOURS_BG}
              strokeWidth={Dimensions.get('window').width > 400 ? 12 : 6}
              x1={hoursLineStart.x}
              y1={hoursLineStart.y}
              x2={hoursLineEnd.x}
              y2={hoursLineEnd.y}
              strokeLinecap="round"
            />
            <Line
              stroke={MINUTE_BG}
              strokeWidth={Dimensions.get('window').width > 400 ? 8 : 4}
              x1={minutesLineStart.x}
              y1={minutesLineStart.y}
              x2={minutesLineEnd.x}
              y2={minutesLineEnd.y}
              strokeLinecap="round"
            />
            <Line
              stroke="#9ac93a"
              strokeWidth={Dimensions.get('window').width > 400 ? 4 : 2}
              x1={secondLineStart.x}
              y1={secondLineStart.y}
              x2={secondLineEnd.x}
              y2={secondLineEnd.y}
              strokeLinecap="round"
              
            />
            </G>
          </Svg>
          
    );
  };


export default CircleLight