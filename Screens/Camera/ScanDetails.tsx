import { View, Text,Image, StyleSheet,Dimensions, Platform  } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
type Props = {
    onScreenChange: (screenNumber: number) => void;
    onDeviceData: (data: any) => void;
  };

const ScanDetails = ({onScreenChange,onDeviceData}: Props) => {

    const data3 = [
        {
          Diseases: 'Monstera',
          devices: [
            { id: '1', name: 'Powdery Mildew', kind:'Monstera'},
            { id: '2', name: 'Leafi Wood Walnut',kind:'Spider',light: '72',temp: '26',soil: '76',RH: '2',Rlight:'20-70',Rtemp:'20-35',timeAdd:'2023-04-15T15:50:58.342Z' },
            { id: '3', name: 'Leafi Marble Liquid',kind:'Ric Rac',light: '80',temp: '28',soil: '67',RH: '4',Rlight:'20-70',Rtemp:'32-46',timeAdd:'2023-05-03T15:50:58.342Z' },
            { id: '4', name: 'Leafi Marble Mozaic',kind:'Monstera',light: '90',temp: '28',soil: '78',RH: '8',Rlight:'20-70',Rtemp:'20-32',timeAdd:'2023-05-04T15:50:58.342Z' },
          ],
        },
        {
        Diseases: 'Ric Rac',
          devices: [
            { id: '1', name: 'Leafi Marble Liquid',kind:'Ric Rac',light: '80',temp: '28',soil: '67',RH: '4',Rlight:'20-70' },
            { id: '2', name: 'Leafi Marble Mozaic',kind:'Monstera',light: '90',temp: '28',soil: '78',RH: '8',Rlight:'20-70' },
          ],
        },
        {
          room: 'Living Room',
          devices: [
            { id: '1', name: 'Leafi Wood Walnut',kind:'Monstera',light: '70',temp: '27',soil: '56',RH: '3',Rlight:'20-70' },
            { id: '2', name: 'Leafi Wood Mozaic',kind:'Monstera',light: '72',temp: '26',soil: '76',RH: '2.6',Rlight:'20-70' },
            { id: '3', name: 'Leafi Marble Liquid',kind:'Ric Rac',light: '80',temp: '28',soil: '67',RH: '4',Rlight:'20-70' },
    
          ],
        }
      ];

    const handlePress = () => {
        onScreenChange(0)
      };
    return (
    <View style={{height:height,width:width}}>
        <View style={styles.container}>
            <View style={styles.headContainerStyle}>
                <View style={styles.headContainer}>
                    <View>
                        <TouchableOpacity style={styles.backButton} onPress={handlePress}>
                            <FontAwesomeIcon icon={icon({ name: 'chevron-left' })} style={{ opacity: 0.9, color: '#2a6f29' }}  /> 
                        </TouchableOpacity>
                    </View>
                    <View style={styles.headContainerKind}>
                        <Text style={styles.textStyle}>
                            Scan Details
                        </Text>
                        <Text style={styles.textStyle3}>
                            Powdery Mildew
                        </Text>
                       
                    </View>

                    <View>
                        <TouchableOpacity style={styles.backButton} onPress={handlePress}>
                            <FontAwesomeIcon icon={icon({ name: 'ellipsis' })} style={{ opacity: 0.9, color: '#2a6f29' }}  /> 
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
           
            <View style={styles.headContainerStyle2}>
            <ScrollView style={{top:10,}} showsVerticalScrollIndicator={false}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <View style={styles.cardImageContainer}>

                    </View>
                </View>
                
                <Text style={styles.textStyle2}>
                    Powdery Mildew
                </Text>
                
                <Text style={styles.textStyle1} >
                    Powdery mildew known as Fungal Disease appears as a white, powdery substance on the leaves.
                    Powdwey mildew tends to thrive in conditions with high humidity and moderate temoeratures, tipiccaly between 60 F to 80 F. The disease is more prevalent in crowded plantinsg and areas with poor air cicculation. it can spread through airbone spores, which facilitate its rapid transmission.
                </Text>

                <Text style={styles.textStyle2}>
                    Treatment and Management
                </Text>

                <View style={{gap:10}}>
                <Text style={styles.textStyle1} >
                    Monstera can be vulnerable common houseplant disease. The most common disease that might affect your Monstera are leaf spot and root rot. Leaf Spot is Cousesd By a fungus and apperars as a yellowwish-brown spot that grows progressively larger until the entire leaf turn brown and fall off.
                </Text>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >

                    <View style={{width:120, height:40, alignContent:'center', backgroundColor:'yellow', borderRadius:20}}> 
                    </View>

                    <View style={{width:120, height:40, alignContent:'center', backgroundColor:'yellow', borderRadius:20}}> 
                    </View>
                    <View style={{width:120, height:40, alignContent:'center', backgroundColor:'yellow', borderRadius:20}}> 
                    </View>

                </ScrollView>
                </View>

                <View style={{gap:8}}>
                <Text style={styles.textStyle2}>
                    Diseases of Monstera
                </Text>
                <Text style={styles.textStyle1} >Feeling Free? Discover another Disease of Monstera Plants</Text>
                <View style={{flexDirection:'row', gap:10}}>
                    <View style={{width:120, height:34,backgroundColor:'yellow', borderRadius:18}}>

                    </View>

                    <View style={{width:120, height:34,backgroundColor:'yellow', borderRadius:18}}>

                    </View>
                </View>
                </View>

                <View style={{gap:8}}> 
                <Text style={styles.textStyle2}>
                    Smartpots
                </Text>

                <Text style={styles.textStyle1}>
                    Whats is Smartpot, Smart Pots, the innovative fabric pots, are the game-changer in the world of plant care. Designed to cater to the needs of modern gardeners, these revolutionary containers bring a plethora of benefits to your plants, making them thrive like never before.
                </Text>

                <View style={{height:80, borderRadius:20, backgroundColor:'yellow'}}>
                    <View >

                    </View>
                </View>
                </View>
            </ScrollView>
            </View>
        </View>
    </View>
    )
}

export default ScanDetails

const { width, height } = Dimensions.get("window");
const BG_VIEW = "#C1FC49"
const TEXT_COLOR = '#2a6f29'
const styles = StyleSheet.create({
    container: {
        flex:1,
        alignContent:'center',
    },
    headContainerStyle: {
        flex:0.2,
    },
    headContainerStyle2: {
        flex:1.7,
        top:10,
        marginHorizontal:24,
        marginBottom:110,
        
    },
    cardImageContainer: {
        width: width > 400 ? 380 : 260,
        aspectRatio: width > 400 ? 1.4 :1.4,
        backgroundColor:'red',
        borderRadius:20
    },
    headContainer: {
        flexDirection:'row',
        alignContent:'space-between',
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:24,
        ...Platform.select({
            ios: {
              paddingTop: 44,
            },
            android: {
              paddingTop: 28,
            },
          }),
    },
    headContainerKind: {
        flexDirection:'column',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },
    backButton:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:BG_VIEW,
        width :width > 400 ? 44 : 32,
        borderRadius:width > 400 ? 30 :20,
        aspectRatio:1
    },
    textStyle:{
        fontSize: width > 400 ? 24 :18,
        fontWeight:'600'
    },
    textStyle1: {
        fontSize: width > 400 ? 16 :12,
        fontWeight:'300'
    },
    textStyle3: {
        fontSize: width > 400 ? 18 :16,
        fontWeight:'400'
    },
    textStyle2: {
        fontSize: width > 400 ? 32 : 24,
        fontWeight:'700',
        color: TEXT_COLOR
    }
})