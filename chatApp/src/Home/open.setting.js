import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, ScrollView, TextInput, StyleSheet, Image, TouchableOpacity, BackHandler } from 'react-native'

const OpenSetting = () => {
  const navigation = useNavigation()
  const uploadProfile = () => {
    navigation.navigate("UploadProfile")
  }
  return (
    <ScrollView style={styles.mainView}>
      <View style={styles.viewOne}>

        <View style={styles.settingMain}>
        <View style={styles.settingArrow}>
        <TouchableOpacity onPress={() => {navigation.goBack()}}>
          <Image style={{width: 25, height: 25, position: 'relative',
          top: 5,}} source={require("../assests/arrow.png")} />
          </TouchableOpacity>
          <Text style={{fontSize: 24, position: 'relative',
          left: 40, color: 'white', fontWeight: 500,
          }}>Settings</Text>
        </View>
        </View>

        <View style={styles.searchBar}>
          <TextInput style={{width: "88%", height: 45, 
          backgroundColor: '#F0F2F5', borderRadius: 5, 
          paddingLeft: 20, fontSize: 18, color: '#E5E5E5',
          }}  placeholder="Search settings" />
        </View>
      </View>

      <ScrollView style={styles.viewTwo}>
        <TouchableOpacity onPress={uploadProfile} style={styles.descriptionMain}>
        <View style={styles.description}>
        <View style={styles.addProfile}>
          <Image style={{width: 70, height: 70, borderRadius: 100}} source={require("../assests/whiteUser.png")} />
        </View>
          <Text style={{fontSize: 20, marginLeft: 40, marginTop: 34}}> Free Palestine</Text>
        </View>
        </TouchableOpacity>

        <View style={styles.account}>
          <Image style={{width: 24, height: 24, marginLeft: 24, marginTop: 24}} source={require("../assests/account.png")} />
          <Text style={{fontSize: 18, marginLeft: 24, marginTop: 24}}> Account</Text>
        </View>
        <View style={styles.privacy}>
          <Image style={{width: 24, height: 24, marginLeft: 24, marginTop: 26}} source={require("../assests/privacy.png")} />
          <Text style={{fontSize: 18, marginLeft: 24, marginTop: 24}}>Privacy</Text>
        </View>
        <View style={styles.chats}>
          <Image style={{width: 24, height: 24, marginLeft: 24, marginTop: 26}} source={require("../assests/chatS.png")} />
          <Text style={{fontSize: 18, marginLeft: 24, marginTop: 24}}>Chats</Text>
        </View>
        <View style={styles.notifications}>
          <Image style={{width: 24, height: 24, marginLeft: 24, marginTop: 26}} source={require("../assests/notification.png")} />
          <Text style={{fontSize: 18, marginLeft: 24, marginTop: 24}}>Notification</Text>
        </View>
        <View style={styles.keyboardShortcuts}>
          <Image style={{width: 24, height: 24, marginLeft: 24, marginTop: 26}} source={require("../assests/privacy.png")} />
          <Text style={{fontSize: 18, marginLeft: 24, marginTop: 24}}>Keyboard shortcuts</Text>
        </View>
        <View style={styles.help}>
          <Image style={{width: 24, height: 24, marginLeft: 24, marginTop: 26}} source={require("../assests/help.png")} />
          <Text style={{fontSize: 18, marginLeft: 24, marginTop: 24}}>Help</Text>
        </View>
        <ScrollView style={styles.logout}>
          <Image style={{width: 24, height: 24, marginLeft: 24, marginTop: 26}} source={require("../assests/logout.png")} />
          <Text style={{fontSize: 18, marginLeft: 24, marginTop: 24, color: '#EA0038'}}>Logout</Text>
        </ScrollView>
      </ScrollView>

    </ScrollView>
  )
}

export default OpenSetting;


const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    height: '100%',
  },
  viewOne: {
    width: '100%',
    height: '19%',

  },
  settingMain: {
    width: '100%',
    height: 70,
    backgroundColor: '#008069',
  },
  settingArrow: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    left: 30,
    top: 15,

  },
  searchBar: {
    width: '100%',
    height: 85,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewTwo: {
    width: '100%',
    height: 660,
  },
  descriptionMain: {
    width: '100%',
    height: 120,
    borderTopWidth: 0.5,
    marginTop: -10,
    borderTopColor: '#E5E5E5',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  description: {
    display: 'flex',
    flexDirection: 'row',
    
  },
  addProfile: {
    width: 92,
    height: 92,
    backgroundColor: '#E5E5E5',
    position: 'relative',
    left: 24,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  account: {
    width: '100%',
    height: 75,
    borderTopWidth: 0.5,
    borderTopColor: '#E5E5E5',
    display: 'flex',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  privacy: {
    width: '100%',
    height: 75,
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderTopColor: '#E5E5E5',
    display: 'flex',
    flexDirection: 'row'
  },
  chats: {
    width: '100%',
    height: 75,
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderTopColor: '#E5E5E5',
    display: 'flex',
    flexDirection: 'row'
  },
  notifications: {
    width: '100%',
    height: 75,
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderTopColor: '#E5E5E5',
    display: 'flex',
    flexDirection: 'row'
  },
  keyboardShortcuts: {
    width: '100%',
    height: 75,
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderTopColor: '#E5E5E5',
    display: 'flex',
    flexDirection: 'row'
  },
  help: {
    width: '100%',
    height: 75,
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderTopColor: '#E5E5E5',
    display: 'flex',
    flexDirection: 'row'
  },
  logout: {
    width: '100%',
    height: 75,
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderTopColor: '#E5E5E5',
    display: 'flex',
    flexDirection: 'row'
  },
 

});