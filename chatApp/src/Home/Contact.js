import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView, View, StyleSheet, Text, Image, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
// import io from 'socket.io-client';

const Contact = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {userId} = route.params;
  console.log(userId)
  const [users, setUsers]  = useState([]);
  
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://192.168.0.104:4000/api/v2/user/${userId}`);
        const data = response.data;
        const contacts = data.data.contacts;
        setUsers(contacts)
      } catch (error) {
        console.error('Error fetching user contacts:', error);
        Alert.alert('Error', 'Failed to fetch contacts. Please try again later.');
      }
    }

    if (userId) {
      getData();
    } else {
      console.error('No userId parameter found');
    }

  }, [userId]);

  

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.arrowImage} source={require('../assests/arrow.png')} />
        </TouchableOpacity>
        <Text style={styles.selectContactText}>Select contact</Text>
        <View style={styles.twoImages}>
          <Image style={styles.childImage} source={require('../assests/search.png')} />
          <Image style={styles.childImage} source={require('../assests/dots.png')} />
        </View>
      </View>

      {/* Contacts */}
      <ScrollView style={styles.scrollableContent}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.newGroup}>
            <View style={styles.addNew}>
              <Image style={{ width: 20, height: 20 }} source={require('../assests/people.png')} />
            </View>
            <Text style={{ marginLeft: 20, fontWeight: '500', fontSize: 16 }}>New group</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('AddUser', {userId})} style={styles.newContact}>
            <View style={styles.addNew}>
              <Image style={{ width: 22, height: 20 }} source={require('../assests/addUser.png')} />
            </View>
            <Text style={{ marginLeft: 20, fontWeight: '500', fontSize: 16 }}>New contact</Text>
            <Image style={{ width: 20, height: 20, position: 'relative', left: 120 }} source={require('../assests/scanner.png')} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('AddUser')} style={styles.newContact}>
            <View style={styles.addNew}>
              <Image style={{ width: 22, height: 20 }} source={require('../assests/whiteGroup.png')} />
            </View>
            <Text style={{ marginLeft: 20, fontWeight: '500', fontSize: 16 }}>New community</Text>
          </TouchableOpacity>

          <View style={styles.userContact}>
            <Text style={{ position: 'relative', left: 20, fontSize: 15 }}>Contacts on WhatsApp</Text>
            { 
              users.map((contactArr, i) => (
        <TouchableOpacity
          key={i}
          style={styles.everyUser}
          onPress={() => navigation.navigate("SendMessage", {firstName: contactArr.contact.firstName,
           lastName: contactArr.contact.lastName, userId: contactArr._id },
           )}
        >
          <TouchableOpacity style={styles.userDP}>
            <Image style={styles.whiteUser} source={require('../assests/whiteUser.png')} />
          </TouchableOpacity>
          <Text style={styles.userName}>
            {contactArr.contact.firstName} {contactArr.contact.lastName}
          </Text>
        </TouchableOpacity>
      ))}          
          </View>

          

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    width: '100%',
    height: 60,
    backgroundColor: '#008069',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    position: 'absolute',
    zIndex: 999,
  },
  arrowImage: {
    width: 17,
    height: 20,
  },
  selectContactText: {
    fontSize: 17,
    color: 'white',
  },
  twoImages: {
    flexDirection: 'row',
  },
  childImage: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
  },
  scrollableContent: {
    flex: 1,
    marginTop: 60,
  },
  newGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 30,
    paddingTop: 27,
  },
  newContact: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 30,
  },
  addNew: {
    width: 40,
    height: 40,
    backgroundColor: '#008069',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userContact: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
  },
  everyUser: {
    width: '100%',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  userDP: {
    width: 50,
    height: 50,
    backgroundColor: 'silver',
    opacity: 0.7,
    borderRadius: 100,
    position: 'relative',
    left: 10,
    top: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteUser: {
    width: 30,
    height: 30,
  },
  userName: {
    fontSize: 16,
    position: 'relative',
    left: 30,
    top: 20,
  },
});

export default Contact;
