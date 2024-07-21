import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const HomeRoutes = () => {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEnabled={true}
    >
      <View style={styles.mainView}>
        <View style={styles.rowOne}>
          <Text style={styles.whatsAppText}>WhatsApp</Text>
          <View style={styles.threeImages}>
            <Image style={styles.cameraImage} source={require('../assests/camera.png')} />
            <Image style={styles.cameraImage} source={require('../assests/search.png')} />
            <Image style={styles.cameraImage} source={require('../assests/dots.png')} />
          </View>
        </View>
      </View>

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
    position: 'fixed'

  },
  whatsAppText: {
    fontSize: 25,
    position: 'relative',
    top: 10,
    left: 20,
    color: 'white'
  },
  threeImages: {
    width: '57%',
    height: 60,
    backgroundColor: '#008069',
    position: 'relative',
    left: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  cameraImage: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginRight: 15
  },
  tabText: {
    color: 'white',
  },
});

export default HomeRoutes;