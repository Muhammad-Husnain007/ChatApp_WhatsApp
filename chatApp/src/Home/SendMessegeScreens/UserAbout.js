import { useNavigation, useRoute } from '@react-navigation/native'
import { View, Text, Alert, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native'

const UserAbout = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const {userId, firstName, lastName} = route.params;
  
  return (
     <View style={{  flex: 1, justifyContent: 'center', backgroundColor: 'azure', alignItems: 'center' }}>
    <ScrollView style={styles.mainScrollView}>

      <View style={styles.profileMain}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Image source={require('../../assests/arrowGreen.png')} />
      </TouchableOpacity>
        <TouchableOpacity style={styles.profile}>
          <Image source={require('../../assests/user.png')} />
        </TouchableOpacity>
        <Text>{`${firstName} ${lastName}`}</Text>
        <TouchableOpacity style={styles.threeImages}>
          <TouchableOpacity style={styles.audio}>
            <Image source={require('../../assests/voice-call.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.video}>
            <Image source={require('../../assests/video.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.search}>
            <Image source={require('../../assests/searchGreen.png')} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      <View style={styles.notificationMain}>
        <TouchableOpacity style={styles.notification}>
          <Image source={require('../../assests/bell.png')} />
          <Text style={styles.textText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.media}>
          <Image source={require('../../assests/voice-call.png')} />
          <Text style={styles.textText}>Media visibility</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.encryptionMain}>
        <TouchableOpacity style={styles.encryption}>
          <Image source={require('../../assests/lock.png')} />
          <Text style={styles.textText}>Encryption</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.disappearing}>
          <Image source={require('../../assests/timer.png')} />
          <Text style={styles.textText}>Disappearing messages</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.chatLock}>
          <Image source={require('../../assests/message.png')} />
          <Text style={styles.textText}>Chat lock</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <View style={styles.groupMain}>
        <Text style={styles.textText}>No group in common</Text>
        <TouchableOpacity style={styles.group}>
          <Image source={require('../../assests/lock.png')} />
          <Text style={styles.textText}>Create group</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.addToMain}>
        <TouchableOpacity style={styles.addTo}>
          <Image source={require('../../assests/heart.png')} />
          <Text style={styles.textText}>Add to Favorities</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.block}>
          <Image source={require('../../assests/block.png')} />
          <Text style={styles.textText}>Block</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.report}>
          <Image source={require('../../assests/unlike.png')} />
          <Text style={styles.textText}>Report</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  mainScrollView: {
    width: '100%',
    height: 'auto',

  },
  profileMain: {
    width: '100%',
    height: 300,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: {
        elevation: 2,
      },
    })
  },
  back:{
    position: 'relative', left: -140, top: -20
    },
  profile: {
    width: 100,
    height: 100,
    backgroundColor: 'silver',
    opacity: 0.7,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: -20,


  },
  threeImages: {
    width: '90%',
    height: 70,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    top: 30,

  },
  audio: {
    width: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#038B5A',
  },
  video: {
    width: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#0FAD64',
  },
  search: {
    width: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#0FAD64',
  },
  notificationMain:{
    width: '100%',
    height: 120,
    marginTop: 5,
    backgroundColor: 'white',
    ...Platform.select({
      android: {
        elevation: 2,
      },
    })
    
  },
  notification:{
    width: '100%',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20
  },
  media:{
    width: '100%',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20
  },
  encryptionMain:{
    width: '100%',
    height: 180,
    marginTop: 5,
    backgroundColor: 'white',
    ...Platform.select({
      android: {
        elevation: 2,
      },
    })
  },
  encryption:{
    width: '100%',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20
  },
  disappearing:{
    width: '100%',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20
  },
  chatLock:{
    width: '100%',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20
  },


  groupMain:{
    width: '100%',
    height: 80,
    paddingTop: 10,
   backgroundColor: 'white',
   marginTop: 5,
   ...Platform.select({
    android: {
      elevation: 2,
    },
  })
  },
  group:{
    width: '100%',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20
  },
  


addToMain:{
  width: '100%',
  height: 180,
  marginTop: 5,
  backgroundColor: 'white',
 
},
addTo:{
  width: '100%',
  height: 60,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  paddingLeft: 20
},
block:{
  width: '100%',
  height: 60,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  paddingLeft: 20,
},
report:{
  width: '100%',
  height: 60,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  paddingLeft: 20
},

textText:{
  position: 'relative',
  left: 20
},

});

export default UserAbout
