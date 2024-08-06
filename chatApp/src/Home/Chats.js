import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

const Chats = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId, token } = route.params;
  const [users, setUsers] = useState([]);
  const [chatId, setChatId] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://192.168.0.104:4000/api/v2/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const contacts = response.data.data.contacts;
        const filteredContacts = contacts.filter(contact => contact.exists === true);
        setUsers(filteredContacts);
      } catch (error) {
        console.error('Error fetching user contacts:', error);
        Alert.alert('Error', 'Failed to fetch contacts. Please try again later.');
      }
    };

    if (userId) {
      getData();
    } else {
      console.error('No userId parameter found');
    }
  }, [userId, token]);
  const createOrNavigateChat = async (contactArr) => {
    try {
      const participant1 = userId;
      const participant2 = contactArr.contact.user[0];
      const participants = [participant1, participant2];

      // Check if chat already exists
      const existingChatResponse = await axios.post(
        `http://192.168.0.104:4000/api/v2/chat/participantsExist`,
        { participants },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (existingChatResponse.data.data) {
        setChatId(existingChatResponse.data.data._id);
        navigation.navigate("SendMessage", {
          firstName: contactArr.contact.firstName,
          lastName: contactArr.contact.lastName,
          contactId: contactArr.contact.user[0],
          chatId: existingChatResponse.data.data._id,
          userId: userId,
          // receiverId: contactArr
        });
      } else {
        // Create new chat
        const createChatResponse = await axios.post(
          `http://192.168.0.104:4000/api/v2/chat/createChat`,
          { participants },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setChatId(createChatResponse.data.data._id);
        navigation.navigate("SendMessage", {
          firstName: contactArr.contact.firstName,
          lastName: contactArr.contact.lastName,
          contactId: contactArr.contact.user[0],
          chatId: createChatResponse.data.data._id,
          userId: userId
        });

      }
    } catch (error) {
      console.error("Error creating or navigating chat:", error);
      Alert.alert('Error', 'Failed to create or navigate to chat. Please try again later.');
    }
  };

  const goToContact = () => {
    navigation.navigate("Contact", { userId, token });
  };

  return (
    <ScrollView style={styles.mainView}>
      <View style={styles.userContact}>
        {users.map((contactArr, i) => (
          <TouchableOpacity
            key={i}
            style={styles.everyUser}
            onPress={async () => {
              await createOrNavigateChat(contactArr);
            }}
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
      <TouchableOpacity onPress={goToContact} style={styles.goToContact}>
        <Image style={{ width: 35, height: 35 }} source={require('../assests/comment.png')} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    height: 'auto',
    flexDirection: 'column',
  },
  userContact: {
    width: '100%',
    height: 'auto',
    flexDirection: 'column',
    marginTop: 10,
  },
  everyUser: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    marginTop: 10,
  },
  userDP: {
    width: 50,
    height: 50,
    backgroundColor: 'silver',
    opacity: 0.7,
    borderRadius: 100,
    marginLeft: 10,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteUser: {
    width: 30,
    height: 30,
  },
  userName: {
    fontSize: 16,
    marginLeft: 30,
    marginTop: 15,
  },
  goToContact: {
    width: 60,
    height: 60,
    backgroundColor: '#008069',
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Chats;
