import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from "./style";
import { logOut } from "@/services/auth";
import { useNavigation } from 'expo-router';
import colors from '@/global/colors';


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
     <View style={{top: 20, display: 'flex', gap: 20, width: '100%', alignItems: 'center' }}>
        <Text onPress={() => navigation.navigate('AddMedicine')} style={{color: colors.secondary, textDecorationLine: 'underline', fontFamily: 'Poppins_300Light'}}>Adicionar medicamento</Text>
        <Text onPress={() => navigation.navigate('MedicationList')} style={{color: colors.secondary, textDecorationLine: 'underline', fontFamily: 'Poppins_300Light'}}>ir para lista de medicamentos</Text>
      </View>
    </>
  )
}

export default Home