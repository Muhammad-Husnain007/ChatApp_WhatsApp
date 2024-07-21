import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'

const Chats = () => {
  const navigation = useNavigation();

  const goToContact = () => {
    navigation.navigate("Contact")
  }
  return (
    <ScrollView style={styles.mainView}>
      <Text>Hello Chat</Text>
      <TouchableOpacity onPress={goToContact} style={styles.addNewUser}>
        <Image source={require('../assests/comment.png')} />
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    height: '100%',
  },
  addNewUser: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#008069',
    marginTop: 480,
    marginLeft: 270,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export default Chats;
