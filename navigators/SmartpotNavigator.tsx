import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Smartpot from '../Screens/Smartpot/Smartpot';
import SmartpotDevice from '../Screens/Smartpot/SmartpotDevice';

type DeviceData = {
  devices: string;
  email: string;
};

const SmartpotNavigator = () => {
  const[selectedScreen,setSelectedScreen] = useState(0);
  const handleScreenChange = (screenNumber: number) => {
    setSelectedScreen(screenNumber);
  };
  const [deviceData, setDeviceData] = useState<any>(null);
  const handleDeviceData = (data: DeviceData) => {
    setDeviceData(data);
  };
  
  return (
    <View>
      {selectedScreen === 0 ? (
            <Smartpot onScreenChange={handleScreenChange} onDeviceData={handleDeviceData}/> 
        ) : selectedScreen === 1 ? (
            <SmartpotDevice onScreenChange={handleScreenChange} deviceData={deviceData}  />
        ): null}
      </View>

  )
}

export default SmartpotNavigator
