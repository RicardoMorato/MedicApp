import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '@/constants/Colors'
import userIcon from '@/assets/icons/userIcon2.png'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; 
import { useNavigation } from 'expo-router';
import { logOut } from '@/services/auth';
import { fetchUserEmail, fetchusername } from '@/utils/fetchUserData';

function HeaderProfile({ ammount }: { ammount: number }) {
    const navigation = useNavigation<any>();
    const [username, setUsername] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    fetchusername().then((user) => {
        if (user) {
            setUsername(user);  
        }})
    fetchUserEmail().then((email) => {
        if (email) {
            setUserEmail(email);
        }})
    

    return (

            <View style={styles.content}>
                <View style={styles.headerContent}>
                    <View style={styles.imageUser}>
                        <Image source={userIcon} resizeMode="contain" style={{height: 50}}/>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: 15, fontFamily: 'Poppins_500Medium'}}>{username}</Text>
                        <Text style={{ fontSize: 12, color: '#555', fontFamily: 'Poppins_200ExtraLight' }}>{userEmail}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.exitContent} onPress={() => logOut(navigation)}>
                    <MaterialIcons name="exit-to-app" size={24} color="red" />
                    <Text style={styles.exitText}>Sair</Text>
                </TouchableOpacity>
                <View style={styles.dividerCard}/>
                <View style={styles.countMedicaments}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{ammount}</Text>
                    <Text style={{ fontSize: 16, color: '#555' }}>Medicamentos</Text>
                </View>
            </View>

    );
}

export default HeaderProfile
const styles = StyleSheet.create({
    content: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: Colors.light.backgroundBoxProfile,
        marginHorizontal: 20,
        borderRadius: 20,
        marginTop: 20,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageUser: {
        width: 70,
        height: 70,
        borderRadius: 999,
        backgroundColor: Colors.light.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    exitContent: {
        position: 'absolute',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        top: 17,
        right: 20,
    },
    exitText: {
        fontSize: 12,
        color: Colors.text.primary,
        fontFamily: 'Poppins_500Medium',
        marginTop: 5
    },
    dividerCard: {
        width: '100%',
        height: 1,
        backgroundColor: Colors.light.separatorCard,
        marginTop: 15,
      },
      countMedicaments: {
        marginTop: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }
})