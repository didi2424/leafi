import { Alert, StyleSheet, Text, Touchable, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import api from '../../api';
import { response } from 'express';

type VertifyProps = {
  onScreenChange: (screenNumber: number) => void;
  registerData: any;
};

const Vertify = ({onScreenChange,registerData }: VertifyProps) => {

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
      api.post('/otp/verify', payload2)
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
          setTimer(120); // Set timer to 2 minutes (120 seconds)
        }
      }, [timer]);
      
      const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
      };
      
    const resendOTP = () => {
      setCount((prevCount) => prevCount + 1);
      const email = registerData.email
      const payload2 = {
        email
      }
      api.post('/otp/send', payload2)
      .then(response => {
          if (response.status === 200)
          console.log('otp send')
      })

      if (count >= 1) {
        setDisabled(true);
        setCount(0);
        setTimer(120); // Reset timer to 2 minutes (120 seconds)
      }
      };
  return (
    <View style={{justifyContent:'space-between',top:12}}>
      <TouchableOpacity onPress={() => BacktoRegister()} style={{left:20,width:42,aspectRatio:1,borderRadius:40,alignItems: 'center',alignContent:'center',justifyContent:'center',backgroundColor:'white'}} >
         <FontAwesomeIcon size={22} icon={icon({ name: 'chevron-left' })} style={{ color: '#7db149ff' }}  /> 
        </TouchableOpacity>

      <View style={{alignContent:'center',alignItems:'center',justifyContent:'space-between'}}>
          <View style={{top:12,height:220,width:180,borderRadius:20,alignContent:'center', alignItems:'center', justifyContent:'center',backgroundColor:'white'}}>
            <Text>Vertify</Text>
          </View>
        <View style={{top:22}}>
          <Text style={{fontSize:42, fontWeight:'600'}}>Enter OTP</Text>
          <Text style={{fontSize:18}}>An 6 Digit Code has been send to</Text>
          <Text style={{fontSize:18}}>{registerData.email}</Text>

        <View style={{top:12,flexDirection:'row',gap:12}}>
        <View style={{flexDirection:'row',gap:8}}>
          <View style={{height:50,width:38,borderRadius: 10,backgroundColor:'gray',alignContent:'center',alignItems:'center',justifyContent:'space-between'}}>
            <TextInput
            
              maxLength={1}
              keyboardType="numeric"
              placeholderTextColor="#909090"
              style={{height:50,color:"white",width:38,fontSize:22,textAlign:'center'}}
              ref={firstInput}
              onChangeText={text => {
                setOtpv({...otpv, 1: text});
                text && secondInput.current.focus();
              }}
            />
          </View>

          <View style={{height:50,width:38,borderRadius: 10,backgroundColor:'gray',alignContent:'center',alignItems:'center',justifyContent:'center'}}>
            <TextInput
              style={{height:50,color:"white",width:38,fontSize:22,textAlign:'center'}}
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

          <View style={{height:50,width:38,borderRadius: 10,backgroundColor:'gray',alignContent:'center',alignItems:'center',justifyContent:'center'}}>
            <TextInput
              style={{height:50,color:"white",width:38,fontSize:22,textAlign:'center'}}
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
          <View style={{height:50,width:38,borderRadius: 10,backgroundColor:'gray',alignContent:'center',alignItems:'center',justifyContent:'center'}}>
            <TextInput
              style={{height:50,color:"white",width:38,fontSize:22,textAlign:'center'}}
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

          <View style={{height:50,width:38,borderRadius: 10,backgroundColor:'gray',alignContent:'center',alignItems:'center',justifyContent:'center'}}>
            <TextInput
            
              style={{height:50,color:"white",width:38,fontSize:22,textAlign:'center'}}
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

          <View style={{height:50,width:38,borderRadius: 10,backgroundColor:'gray',alignContent:'center',alignItems:'center',justifyContent:'center'}}>
            <TextInput
              style={{height:50,color:"white",width:38,fontSize:22,textAlign:'center'}}
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
          <TouchableOpacity disabled={disabled} onPress={handleVerify} style={{width:120,height:42,borderRadius:22,backgroundColor:'#ACE1AF',justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontSize:18,color:'white'}}>Vertify</Text>
          </TouchableOpacity>
      <View>
        {infailedOTP && (
        <Text>Invalid OTP</Text>
        )}
        {disabled && (
        <Text>
          Please wait for {formatTime(timer)}
        </Text>
      )}
      </View>
      <View style={{flexDirection:'row',alignContent:'center',alignItems:'center',justifyContent:'space-between',gap:8}}>
      <Text style={{fontSize:14,color:'gray'}}>Didn't receive the email ?</Text>
        <TouchableOpacity onPress={resendOTP} disabled={disabled} style={{justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:14,color:'#7db149ff'}}>Click to resend</Text>
        </TouchableOpacity>
       
      </View>
      
      </View>
      {/* )
    } */}
  </View>
    </View>
  )
}

export default Vertify

