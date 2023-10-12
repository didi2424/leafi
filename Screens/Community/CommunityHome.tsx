import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import Role from '../Profile/Role';


const CommunityHome = () => {


  return (
    <View
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Role/>
    </View>
  )
}

export default CommunityHome;
