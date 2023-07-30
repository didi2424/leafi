import { StyleSheet, Text, View,ScrollView } from 'react-native'
import React from 'react'
import {
  BottomSheetModal,
} from '@gorhom/bottom-sheet';

import CustomBackdrop from "../../components/Filter/CustomBackdrop";
import CustomHandle from "../../components/Filter/CustomHandle";



const DetailsBottom = () => {
  return (
    <BottomSheetModal
    snapPoints={['90%']} 
    index={0} 
    ref={openDetachModalRef}
    bottomInset={110}
    style={{marginHorizontal: 24,}}
    detached={true}
    backdropComponent={props => <CustomBackdrop {...props} />}
  >
   <View>
    <ScrollView>
  
    </ScrollView>
   </View>
  </BottomSheetModal>
  )
}

export default DetailsBottom

const styles = StyleSheet.create({})