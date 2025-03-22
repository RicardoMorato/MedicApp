import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";
import { logOut } from "@/services/auth";
<<<<<<< HEAD
import { useNavigation } from 'expo-router';
import colors from '@/global/colors';

=======
import { useNavigation } from "expo-router";
>>>>>>> 138b450 (FEAT: adicionando a tela de interacao medicamentosa)

function Home() {
  const navigation = useNavigation<any>();
  return (
    <>
      <View style={styles.container}>
        <View style={styles.notiIcon}>
          <Text>NotiIcon</Text>
        </View>
        <View style={styles.home}>
          <View style={styles.header}>
            <View>
              <Text style={styles.logo}>MedicApp</Text>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: "red",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                }}
                onPress={() => logOut(navigation)}
              >
                <Text>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("DrugInteraction")}
          >
            <Text>Interações Medicamentosas</Text>
          </TouchableOpacity>
        </View>
      </View>
<<<<<<< HEAD
    </View>
    <View style={styles.horizontalLine} />
     <View style={{top: 20, display: 'flex', gap: 20, width: '100%', alignItems: 'center' }}>
        <Text onPress={() => navigation.navigate('AddMedicine')} style={{color: colors.secondary, textDecorationLine: 'underline', fontFamily: 'Poppins_300Light'}}>Adicionar medicamento</Text>
        <Text onPress={() => navigation.navigate('MedicationList')} style={{color: colors.secondary, textDecorationLine: 'underline', fontFamily: 'Poppins_300Light'}}>ir para lista de medicamentos</Text>
      </View>
=======
      <View style={styles.horizontalLine} />
>>>>>>> 138b450 (FEAT: adicionando a tela de interacao medicamentosa)
    </>
  );
}

export default Home;
