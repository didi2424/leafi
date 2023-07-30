import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScanDetails from '../Screens/Camera/ScanDetails';
import SmartpotDevice from '../Screens/Smartpot/SmartpotDevice';
import Cameras from '../Screens/Cameras';


type DeviceData = {
  devices: string;
  email: string;
};

const CameraNavigator = () => {
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
            <Cameras onScreenChange={handleScreenChange} onDeviceData={handleDeviceData}/> 
        ) : selectedScreen === 1 ? (
            <ScanDetails onScreenChange={handleScreenChange} onDeviceData={deviceData}  />
        ): null}
      </View>

  )
}

export default CameraNavigator
