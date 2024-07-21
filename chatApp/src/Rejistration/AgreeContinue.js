import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {TouchableOpacity, View, Text, Image} from 'react-native'

const AgreeContinue = () => {
const navigation = useNavigation()
    const verifyAccount = () => {
    navigation.navigate('VerifyAccount')
    }
  return (
    <View style={{width: '100%', height: '80%',display:'flex', justifyContent: 'space-between', 
     alignItems: 'center', backgroundColor: 'white' }}>

    <Text style={{fontSize: 24, marginTop: 70, color: '#008069'}}>Welcome to WhatsApp</Text>
    <Image style={{width: '94%', height: '60%', position: 'relative', top: 30,}} source={require('../assests/agreeAndContinue.jpg')} />
    <Text style={{position: 'relative', top: 77, fontSize: 14, color: '#008069'}}>Read our Privacy Policy, Tap "Agree and continue"  {`\n`}
    </Text>
    <Text style={{position: 'relative', top: 68, fontSize: 14, color: '#008069'}}>
       to accept the Terms of Service.
   </Text>
     <View style={{ width: '100%', height: '24%', backgroundColor: 'white',
     position: 'relative', top: 70, display: 'flex', alignItems: 'center',
     justifyContent: 'center'
     }}>
      <TouchableOpacity 
      onPress={verifyAccount}
      style={{width: 280, height: 45, backgroundColor: '#008069', position: 'relative',
      borderRadius: 100, display: 'flex', justifyContent: 'center',
      alignItems: 'center',
      }}>
        <Text
        style={{ fontSize: 14, fontWeight: 'bold', color: '#FFFFFF'
      }}
      >Agree and continue</Text>
      </TouchableOpacity>
    </View>
    </View>
  )
}

export default AgreeContinue;
