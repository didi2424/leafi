import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
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
            <View />
        ): null}
      </View>

  )
}

export default CameraNavigator
