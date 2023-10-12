import { Alert, Dimensions, Platform, StyleSheet, Text, Touchable, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import api from '../../ClientSideAPI/api';
import { useTheme } from './Settings/Account/ThemeContext';
import {theme,darkTheme} from '../../Style/style'

import { SendOTP } from '../../ClientSideAPI/api'; 

type VertifyProps = {
  onScreenChange: (screenNumber: number) => void;
  registerData: any;
};

const Vertify = ({onScreenChange, registerData }: VertifyProps) => {
    const { isDarkMode } = useTheme();
    const selectedTheme = isDarkMode ? darkTheme : theme;
    const { colors } = selectedTheme;

    const firstInput = useRef() as React.MutableRefObject<HTMLInputElement>;
    const secondInput = useRef() as React.MutableRefObject<HTMLInputElement>;
    const thirdInput = useRef() as React.MutableRefObject<HTMLInputElement>;
    const fourthInput = useRef() as React.MutableRefObject<HTMLInputElement>;
    const fifthInput = useRef() as React.MutableRefObject<HTMLInputElement>;
    const sixthInput = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [otpv, setOtpv] = useState({1: '', 2: '', 3: '', 4: '',5: '',6: ''});
    const [infailedOTP, setInvailedOTP] = useState(false)
    const BacktoRegister = () => {
      onScreenChange(1);
    }

    const handleVerify = () => {
      const otp = Object.values(otpv).join('')
      const email = registerData.email
      const payload2 = {
        email,
        otp
      }
      api.post('/Auth/verifyotp', payload2)
          .then(response => {
            if (response.status === 200) 
            console.log('otp same and update registered')
            onScreenChange(2);
            setInvailedOTP(false)
         })
          .catch(error => {
            if (error.response && error.response.status === 400) {
                console.log('Invailed OTP or Experied')
                setInvailedOTP(true)
          }}) 
     
    };

    const [count, setCount] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
      let interval: NodeJS.Timeout;
      if (disabled) {
        interval = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
      }
    
      return () => {
        clearInterval(interval);
      };
    }, [disabled]);
    
    useEffect(() => {
      if (timer <= 0) {
        setDisabled(false);
        setTimer(0);
        
      }
    }, [timer]);
    
    const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };
    
      
    const resendOTP = () => {
      const email = registerData.email
      const payload2 = {
        email
      }

      api.post('/Auth/sendotp', payload2)
          .then(response => {
            if (response.status === 200) {
              console.log('OTP sent');
            }
          })
          .catch(error => {
            if (error.response && error.response.status === 403) {
              const resetTime = error.response.data.reset_time;
              console.log('OTP request limit exceeded. Please wait for the reset time.');
              console.log(`Reset Time: ${resetTime}`);
              const currentTime = Math.floor(Date.now() / 1000);
              const resetTimestamp = Math.floor(new Date(resetTime).getTime() / 1000);
              const timeInSeconds = resetTimestamp - currentTime + 45;
              setTimer(timeInSeconds);
              setDisabled(true);
              setInvailedOTP(false)
            } else {
              console.error('Error:', error);
            }
          });



      };
  return (
    <View>
    <View style={{height:height,paddingTop:36}}>
      <View style={styles.headContainer}>
        <TouchableOpacity onPress={() => BacktoRegister()} style={styles.buttonBack}>
            <FontAwesomeIcon size={Dimensions.get("window").width > 400 ? 22 : 16} icon={icon({ name: 'chevron-left' })} style={{ color: '#7db149ff' }}  /> 
          </TouchableOpacity>
        </View>
          
      <View style={{alignContent:'center',alignItems:'center',justifyContent:'space-between' }}>
      <View style={styles.cardContainer}>
            <Text>Vertify</Text>
      </View>

      <View style={{top:30}}>
          <Text style={[styles.textStyle1,{color: colors.textcolor}]}>Enter OTP</Text>
          <Text style={[styles.textStyle2,{color: colors.textcolor}]}>An 6 Digit Code has been send to</Text>
          <Text style={[styles.textStyle2,{color: colors.textcolor}]}>{registerData.email}</Text>

        <View style={{top:12,flexDirection:'row',gap:12}}>
        <View style={{flexDirection:'row',gap:8}}>
          <View style={styles.otpContainer}>
            <TextInput
            
              maxLength={1}
              keyboardType="numeric"
              placeholderTextColor="#909090"
              style={styles.numberTextContainer}
              ref={firstInput}
              onChangeText={text => {
                setOtpv({...otpv, 1: text});
                text && secondInput.current.focus();
              }}
            />
          </View>

          <View style={styles.otpContainer}>
            <TextInput
              style={styles.numberTextContainer}
              ref={secondInput}
              onChangeText={text => {
                setOtpv({ ...otpv, 2: text });
                if (text) {
                  thirdInput.current.focus();
                } else {
                  firstInput.current.focus();
                }
              }}
              onKeyPress={({ nativeEvent: { key } }) => {
                if (key === 'Backspace' && !otpv[2]) {
                  firstInput.current.focus();
                }
              }}
              maxLength={1}
              keyboardType="numeric"
              placeholderTextColor="#909090"
            />
          </View>

          <View style={styles.otpContainer}>
            <TextInput
              style={styles.numberTextContainer}
              maxLength={1}
              ref={thirdInput}
              onChangeText={text => {
                setOtpv({ ...otpv, 3: text });
                if (text) {
                  fourthInput.current.focus();
                } else {
                  secondInput.current.focus();
                }
              }}
              onKeyPress={({ nativeEvent: { key } }) => {
                if (key === 'Backspace' && !otpv[3]) {
                  secondInput.current.focus();
                }
              }}
              keyboardType="numeric"
              placeholderTextColor="#909090"
            />
          </View>
        </View>
        <View style={{flexDirection:'row',gap:8}}>
          <View style={styles.otpContainer}>
            <TextInput
              style={styles.numberTextContainer}
              ref={fourthInput}
              onChangeText={text => {
                setOtpv({ ...otpv, 4: text });
                if (text) {
                  fifthInput.current.focus();
                } else {
                  thirdInput.current.focus();
                }
              }}
              onKeyPress={({ nativeEvent: { key } }) => {
                if (key === 'Backspace' && !otpv[4]) {
                  thirdInput.current.focus();
                }
              }}
              maxLength={1}
              keyboardType="numeric"
              placeholderTextColor="#909090"
            />
          </View>

          <View style={styles.otpContainer}>
            <TextInput
            
              style={styles.numberTextContainer}
              maxLength={1}
              keyboardType="numeric"
              placeholderTextColor="#909090"
              ref={fifthInput}
              onChangeText={text => {
                setOtpv({ ...otpv, 5: text });
                if (text) {
                  sixthInput.current.focus();
                } else {
                  fourthInput.current.focus();
                }
              }}
              onKeyPress={({ nativeEvent: { key } }) => {
                if (key === 'Backspace' && !otpv[5]) {
                  fourthInput.current.focus();
                }
              }}
              

            />
          </View>

          <View style={styles.otpContainer}>
            <TextInput
              style={styles.numberTextContainer}
              maxLength={1}
              keyboardType="numeric"
              placeholderTextColor='#909090'
              ref={sixthInput}
              onChangeText={text => {
                setOtpv({ ...otpv, 6: text });
                if (text) {
                  sixthInput.current.focus();
                } else {
                  fifthInput.current.focus();
                }
              }}
              onKeyPress={({ nativeEvent: { key } }) => {
                if (key === 'Backspace' && !otpv[6]) {
                  fifthInput.current.focus();
                }
              }}
       
            />
          </View>
        </View>
      </View>
      </View>
      
      <View style={{top:52,gap:8,flexDirection:'column',alignContent:'center',alignItems:'center',justifyContent:'space-between'}}>
          <TouchableOpacity disabled={disabled} onPress={handleVerify} style={[styles.buttonHandle,{backgroundColor: colors.buttoncolor}]}>
              <Text style={styles.textStyle2}>Vertify</Text>
          </TouchableOpacity>
      <View >
        {infailedOTP && (
        <Text style={[styles.textStyle4,{color: colors.textcolor}]}>Invalid or Experied OTP</Text>
        )}
        {disabled && (
        <Text style={[styles.textStyle4,{color: colors.textcolor}]} numberOfLines={2}>
          OTP request limit exceeded, Please wait for {formatTime(timer)}
        </Text>
      )}
      </View>
      <View style={{flexDirection:'row',alignContent:'center',alignItems:'center',justifyContent:'space-between',gap:8}}>
      <Text style={[styles.textStyle5,{color: colors.textcolor}]}>Didn't receive the email ?</Text>
        <TouchableOpacity onPress={resendOTP} disabled={disabled} style={{justifyContent:'center',alignItems:'center'}}>
            <Text style={styles.textStyle6}>Click to resend</Text>
        </TouchableOpacity>
       
      </View>
      
      </View>
      </View>
    </View>
  </View>
  )
}

export default Vertify

const { width,height } = Dimensions.get("window");

const styles = StyleSheet.create({
  headContainer: {
  
    
  marginHorizontal: 24,
   alignContent:'center',
   alignItems:'flex-start'
   
  },
  cardContainer: {
    top:20,
    height: width > 400 ? 250 : 180,
    width: width > 400 ? 160 : 120,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 20,
  },
  buttonBack: {
    width: width > 400 ? 42 : 28,
    aspectRatio: 1,
    borderRadius: width > 400 ? 20 : 20,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  otpContainer: {
    height: width > 400 ? 50 : 42,
    width: width > 400 ? 38 : 34,
    borderRadius: 10,
    backgroundColor: "gray",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  numberTextContainer: {
    height: 50,
    color: "white",
    width: 38,
    fontSize: width > 400 ? 22 : 18,
    textAlign: "center",
  },
  buttonHandle: {
    width: width > 400 ? 120 : 110,
    height: width > 400 ? 42 : 32,
    borderRadius: width > 400 ? 22 : 18,
    justifyContent: "center",
    alignItems: "center",
  },


  textStyle1: {
    fontSize: width > 400 ? 42 : 28,
    fontWeight: "600",
  },
  textStyle2: {
    fontSize: width > 400 ? 18 : 12,
    fontWeight: "400",
  },
  textStyle3: {
    fontSize: width > 400 ? 20 : 12,
    fontWeight: "400",
  },
  textStyle4: {
    fontSize: width > 400 ? 16 : 12,
    fontWeight: "400",
  },
  textStyle5: {
    fontSize: width > 400 ? 14 : 10,
    fontWeight: "400",
  },
  textStyle6: {
    fontSize: width > 400 ? 14 : 10,
    fontWeight: "400",
    color: "#7db149ff",
  },
});

