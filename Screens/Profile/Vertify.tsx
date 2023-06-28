import { Alert, StyleSheet, Text, Touchable, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import api from '../../api';

type VertifyProps = {
  onScreenChange: (screenNumber: number) => void;
  registerData: any;
};

const Vertify = ({onScreenChange,registerData }: VertifyProps) => {
  // Access the form data properties as needed

  console.log(registerData);
    const [selectedRegisterButton, setRegisterButton] = useState(1);
    const [phonenumber, onChangePhoneNumber] = useState('');
    const [inputOtp, onChangeinputOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [isTextVisible, setIsTextInputVisible] = useState(false);
    const firstInput = useRef() as React.MutableRefObject<HTMLInputElement>;
    const secondInput = useRef() as React.MutableRefObject<HTMLInputElement>;
    const thirdInput = useRef() as React.MutableRefObject<HTMLInputElement>;
    const fourthInput = useRef() as React.MutableRefObject<HTMLInputElement>;
    const fifthInput = useRef() as React.MutableRefObject<HTMLInputElement>;
    const sixthInput = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [otpv, setOtpv] = useState({1: '', 2: '', 3: '', 4: '',5: '',6: ''});
    const componentRef = useRef<HTMLDivElement>(null);
    const BacktoRegister = () => {
      onScreenChange(1);
      console.log('back')
    }

    const generateOTP = () => {
      const digits = '0123456789';
      let otp = '';
      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        otp += digits[randomIndex];
      }
      setGeneratedOtp(otp)
      return otp;
    };
    const handleSendOTP = () => {
      setRegisterButton(2)
      // const otp = generateOTP();
      // console.log('Generated OTP:', otp);
      // const payload = {
      //   phonenumber,
      //   otp
      // };
      // api.post('/verify', payload)
      // .then(response => {
      //   const gigimiong = response.data;
      //   console.log(gigimiong);
      //   if (gigimiong === 'success: false') {
      //     console.log('otp tidak terkirim');
      //     setIsTextInputVisible(true)

      //   } else if (gigimiong === 'success: true') {
      //     console.log('otp terkirim');
      //     setRegisterButton(2)
      //   }
      // })
      // .catch(error => {
      //   console.error('Error sending OTP:', error);
      // });
    };
    
    const handleVerify = () => {
      const otpc = Object.values(otpv).join('')
      console.log(otpc)
      if (generatedOtp === otpc) {
        console.log('Same OTP');
      } else {
        console.log('Invalid OTP');
      }
    };
    

  return (
    <View style={{justifyContent:'flex-start',top:20}}>
      <TouchableOpacity onPress={() => BacktoRegister()} style={{left:20,width:52,aspectRatio:1,borderRadius:40,alignItems: 'center',alignContent:'center',justifyContent:'center',backgroundColor:'white'}} >
         <FontAwesomeIcon size={30} icon={icon({ name: 'chevron-left' })} style={{ color: '#7db149ff' }}  /> 
        </TouchableOpacity>

      <View style={{alignContent:'center',alignItems:'center',justifyContent:'space-between'}}>
      
      {/* {selectedRegisterButton === 1 ? (
      <View style={{top:50,alignContent:'center',alignItems:'center',gap:20}}>
      <Text numberOfLines={2} style={{fontSize:28, fontWeight:'600'}}>Confirm Your Phone Number</Text>

      <TouchableOpacity style={{width:170,height:42,backgroundColor:'white',borderRadius:10}}>
        <TextInput style={{left:10,width:170,height:42}}
                    onChangeText={onChangePhoneNumber}
                    placeholder="Phone Number"
                    autoFocus={true}
                    placeholderTextColor="#909090"
                    />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSendOTP} style={{backgroundColor:'#B2D3C2',width:120, height:40,borderRadius:10,alignContent:'center',alignItems:'center',justifyContent:'center'}}>
        <Text>Request OTP</Text>
      </TouchableOpacity>
      { isTextVisible && (
        <Text> failed to send</Text>
      )}
      </View>
      ) : ( */}
        <View>
          <Text style={{fontSize:30, fontWeight:'600'}}>Enter OTP</Text>
          <Text>An 6 Digit Code has been send to</Text>
        <View style={{flexDirection:'row',gap:12}}>
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

          <TouchableOpacity onPress={handleVerify} style={{width:80}}>
            <Text style={{fontSize:22}}>Vertify</Text>
          </TouchableOpacity>
      </View>
      
      {/* )
    } */}
  </View>
    </View>
  )
}

export default Vertify

