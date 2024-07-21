import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TextInput, Modal, TouchableOpacity, } from 'react-native';

const SendMessage = () => {
  const navigation = useNavigation()
  const [imageSource, setImageSource] = useState(require('../../assests/voice.png'));
  const [inputText, setInputText] = useState('');
  const route = useRoute();
  const { userId, firstName, lastName } = route.params;
  
  const goToAbout = () => {
    navigation.navigate("UserAbout", userId, firstName, lastName)
  }


  useEffect(() => {
    if (inputText) {
      setImageSource(require('../../assests/send.png'));
    } else {
      setImageSource(require('../../assests/voice.png'));
    }
  }, [inputText]);
    
    return (
      <ScrollView style={styles.mainContainer}>
      
        <TouchableOpacity onPress={goToAbout} style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.arrowImage} source={require('../../assests/arrow.png')} />
        </TouchableOpacity>

          <TouchableOpacity style={styles.userDP}>
            <Image style={styles.whiteUser} source={require('../../assests/whiteUser.png')} />
          </TouchableOpacity>

        <Text style={styles.selectContactText}>{`${firstName} ${lastName}`}</Text>
        <TouchableOpacity style={styles.twoImages}>
          <Image style={{width: 20, height: 20, position: 'relative', left: -10}}
           source={require('../../assests/whiteCall.png')} />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* ============================ */}
      <ScrollView style={styles.chatContainer}>
        <View style={styles.typeMessageView}>
          <TextInput style={styles.inputField} placeholder='Message'
           onChangeText={(text) => setInputText(text)}
           value={inputText} />
           <TouchableOpacity style={{width: 20, height: 20, position: 'relative', left: -50, top: 12}}>
           <Image source={require('../../assests/cameraColor.png')} />
           </TouchableOpacity>
            <TouchableOpacity style={styles.voiceSendImage}>
           <Image source={imageSource} />
            </TouchableOpacity>
        </View>
      </ScrollView>
    
      </ScrollView>
    );
};

const styles = StyleSheet.create({
   mainContainer:{
   width: '100%',
   height: '100%',
   },
      navbar: {
        width: '100%',
        height: 60,
        backgroundColor: '#008069',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        
      },
      arrowImage: {
        width: 17,
        height: 20,
      },
      selectContactText: {
        fontSize: 17,
        color: 'white',
        marginLeft: -60
      },

      childImage: {
        width: 20,
        height: 20,
        marginHorizontal: 10,
      },
      chatContainer: {
        width: '100%',
        height: 'auto',
        backgroundColor: 'pink',
        
      },
      typeMessageView: {
        width: '100%',
        height: 70,
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginTop: 570,
        paddingTop: 10,
        // backgroundColor: 'red'
      },
      inputField:{
        width: '80%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 100,
        fontSize: 20,
        paddingLeft: 15
      },
      voiceSendImage:{
        width: 54,
        height: 54,
        borderRadius: 100,
        backgroundColor: '#008069',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -15
      },
      userDP: {
        width: 40,
        height: 40,
        backgroundColor: 'silver',
        opacity: 0.7,
        borderRadius: 100,
        position: 'relative',
        left: -30,
        top: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      whiteUser: {
        width: 20,
        height: 20,
      },
});

export default SendMessage;
