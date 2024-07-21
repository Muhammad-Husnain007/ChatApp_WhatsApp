import { useNavigation, useRoute } from '@react-navigation/native'
import { View, Text, Alert, ScrollView } from 'react-native'

const UserAbout = () => {
  const navigation = useNavigation()
  const route = useRoute()
    const {userId, firstName, lastName} = route.params;
    Alert.alert(userId, firstName, lastName)
  return (
    <ScrollView>

        <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.arrowImage} source={require('../../assests/arrow.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.userDP}>
            <Image style={styles.whiteUser} source={require('../../assests/whiteUser.png')} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.twoImages}>
          <Image style={{width: 20, height: 20, position: 'relative', left: -10}}
           source={require('../../assests/dots.png')} />
        </TouchableOpacity>

        </View>

        <View>
            <Text>Description</Text>
        </View>

        <View>

        <View>
        <Image source={require('../../assests')} />
        <Text>Notifications</Text>
        </View>
        <View>
        <Image source={require('../../assests')} />
        <Text>Media visibility</Text>
        </View>

        </View>

        <View>

        <View>
        <Image source={require('../../assests')} />
        <Text>Notifications</Text>
        </View>
        <View>
        <Image source={require('../../assests')} />
        <Text>Media visibility</Text>
        </View>
        <View>
        <Image source={require('../../assests')} />
        <Text>Media visibility</Text>
        </View>

        </View>

        <View>

         <Text>No group</Text>
        <View>
        <Image source={require('../../assests')} />
        <Text>Create group</Text>
        </View>

       </View>

       <View>
        <View>
        <Image source={require('../../assests')} />
        <Text>Notifications</Text>
        </View>
        <View>
        <Image source={require('../../assests')} />
        <Text>Media visibility</Text>
        </View>
        <View>
        <Image source={require('../../assests')} />
        <Text>Media visibility</Text>
        </View>

       </View>

    </ScrollView>
  )
}
const styles = StyleSheet.create({
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

export default UserAbout
