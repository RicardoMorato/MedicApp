import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from "./style";
import { logOut } from "@/services/auth";
import { useNavigation } from 'expo-router';


function Home() {
  const navigation = useNavigation<any>();
  return (
    <>
    <View style={styles.container}>
      <View style={styles.notiIcon}>
        <Text>NotiIcon</Text>
      </View>
      <View style={styles.home}>

        <View >
          <Text style={styles.logo}>MedicApp</Text>
        </View>
        <View>
        <TouchableOpacity style={{
          backgroundColor: "red", 
          paddingVertical:10, 
          paddingHorizontal: 20
          }} onPress={() => logOut(navigation)}><Text>Sair</Text></TouchableOpacity>
        </View>

      </View>
    </View>
    <View style={styles.horizontalLine} />
    </>
  )
}

export default Home