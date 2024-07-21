import React from 'react'
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const UploadProfile = () => {
    const navigation = useNavigation()
    return (
        <ScrollView style={styles.mainView}>
            <View style={styles.profileNav}>
                <View style={styles.profileImage}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assests/arrow.png')} />
                    </TouchableOpacity>
                    <Text style={{fontSize: 24, color: 'white', position: 'relative',
                    left: 30, top: -5}}>Profile</Text>
                </View>
            </View>

            <View style={styles.uploadView}>
                <View style={styles.uploadPhoto}>
                    <Image style={{width: 90, height: 90, marginTop: 30, borderRadius: 100}} source={require('../assests/whiteUser.png')} />
                </View>
            </View>

            <View style={styles.nameView}>
                <View style={{position: 'relative', top: -30, left: 20}}>
                    <Image style={{width: 22, height: 22}} source={require('../assests/user.png')} />

                </View>
                <View>
                    <Text style={{fontSize: 17, position: 'relative', left: 45,
                    top: -10
                    }}>Name</Text>
                    <Text style={{fontSize: 17, position: 'relative', left: 45,
                    top: -8
                    }}>Free Palestine</Text>
                    <Text style={{fontSize: 13.5, position: 'relative', left: 45,

                    }}>This is not your username or pin. This name {`\n`} will be visible for your whatsApp contacts.</Text>
                </View>
                <View style={{position: 'relative', top: -30}}>
                    <Image style={{width: 27, height: 27}}  source={require('../assests/pen.png')} />

                </View>
            </View>

            <View style={styles.aboutView}>
                <View style={{position: 'relative', top: 30, left: 20 }}>
                    <Image style={{width: 22, height: 22}}  source={require('../assests/info.png')} />

                </View>
                <View>
                    <Text style={{fontSize: 17, position: 'relative', left: 45
                    , top: 20 }}>About</Text>
                    <Text style={{fontSize: 14, position: 'relative', left: 45,
                    top: 20}}>Hey there I am using WhatsApp.</Text>
                </View>
                <View style={{position: 'relative', top: 25, left: 70 }}>
                    <Image style={{width: 27, height: 27}}  source={require('../assests/pen.png')} />
                </View>
            </View>

            <View style={styles.phoneView}>
                <View style={{position: 'relative', top: 30, left: 20 }}>
                    <Image style={{width: 22, height: 22}} source={require('../assests/call.png')} />

                </View>
                <View style={{position: 'relative', top: 25, left: 45,}}>
                    <Text>Phone</Text>
                    <Text>+92 33368516534</Text>
                </View>
            </View>

        </ScrollView>
    )
}

export default UploadProfile

const styles = StyleSheet.create({
    mainView: {
        width: '100%',
        height: '100%',
    },
    profileNav: {
        width: '100%',
        height: '14%',
        backgroundColor: '#008069',
    },

    profileImage: {
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        top: 30,
        left: 40
    },
    uploadView: {
        width: '100%',
        height: 180,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    uploadPhoto: {
        width: 120,
        height: 120,
        backgroundColor: '#E5E5E5',
        borderRadius: 100,
        display: 'flex',
        alignItems: 'center',
    },
    nameView: {
        width: '100%',
        height: 130,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
       
    },

    aboutView: {
        width: '100%',
        height: 100,
        display: 'flex',
        flexDirection: 'row',
         
    },

    phoneView: {
        width: '100%',
        height: 150,
        display: 'flex',
        flexDirection: 'row',
    }
})