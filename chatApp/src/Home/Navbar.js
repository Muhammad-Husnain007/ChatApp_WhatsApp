import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, BackHandler } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Chats from './Chats';
import Groups from './Groups';
import Updates from './Updates';
import Calls from './Calls';
import { launchCamera } from 'react-native-image-picker';

const Tab = createMaterialTopTabNavigator();

const Navbar = ({ navigation }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigator = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (isSearchActive) {
          setIsSearchActive(false);
          return true; // Prevent default behavior (closing the app)
        }
        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [isSearchActive])
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsSearchActive(false);
      setIsModalVisible(false);
    });

    return unsubscribe;
  }, [navigation]);

  const searchContact = () => {
    setIsSearchActive(true);
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      cameraType: 'back',
    };
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        console.log('Image Source: ', source);
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollEnabled={true}>
      <View style={styles.mainView}>
        <View style={styles.rowOne}>
          {!isSearchActive ? (
            <>
              <Text style={styles.whatsAppText}>WhatsApp</Text>
              <View style={styles.threeImages}>
                <TouchableOpacity onPress={openCamera}>
                  <Image style={styles.threeImage} source={require('../assests/camera.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={searchContact}>
                  <Image style={styles.threeImage} source={require('../assests/search.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={openModal}>
                  <Image style={styles.threeImage} source={require('../assests/dots.png')} />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                autoFocus={true}
              />
            </View>
          )}
        </View>
      </View>

      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={closeModal}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalItem} onPress={() => { navigator.navigate("OpenSetting") }}>
              <Text style={styles.modalText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={() => { /* Add your functionality here */ }}>
              <Text style={styles.modalText}>Starred Messages</Text>
            </TouchableOpacity>
            {/* Add more items here */}
          </View>
        </TouchableOpacity>
      </Modal>

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold', color: 'white' },
          tabBarStyle: { backgroundColor: '#008069' },
          tabBarIndicatorStyle: { backgroundColor: 'white' },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'white',
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Groups' && route !== undefined) {
              return (
                <Image
                  source={require('../assests/group.png')}
                  style={{ width: 24, height: 24 }}
                />
              );
            } else {
              return null;
            }
          },
        })}
      >
        <Tab.Screen name="Groups" component={Groups} />
        <Tab.Screen name="Chats" component={Chats} />
        <Tab.Screen name="Updates" component={Updates} />
        <Tab.Screen name="Calls" component={Calls} />
      </Tab.Navigator>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    height: 60,
    backgroundColor: '#008069',
    position: 'fixed'
  },
  rowOne: {
    width: '100%',
    height: 60,
    backgroundColor: '#008069',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  whatsAppText: {
    fontSize: 25,
    color: 'white'
  },
  threeImages: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  threeImage: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginRight: 15
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  tabText: {
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalItem: {
    paddingVertical: 10,
  },
  modalText: {
    fontSize: 16,
  },
});

export default Navbar;
