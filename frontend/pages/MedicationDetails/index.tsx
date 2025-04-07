import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import FontLoader from "@/components/FontLoader";
import { Platform } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "expo-router";

function MedicationDetails({ route }: any) {
  const { medicamento, concentracao, data_inclusao, detentor, farmaco, forma_farmaceutica, registro } = route.params
  const navigation = useNavigation()
  return (
    <>
    <View style={styles.containerHeader}>
      <TouchableOpacity style={{position: "absolute", left: 20}} onPress={navigation.goBack}>
        <Ionicons name="arrow-back-outline" size={30} color={Colors.light.backgroundGreyBlack}  />
      </TouchableOpacity >
      <Text style={styles.headerText}> Detalhes do Medicamento</Text>
    </View>
    <FontLoader>
    <View style={styles.container}>
      <Text style={styles.title}>{medicamento}</Text>
    <ScrollView showsVerticalScrollIndicator={true}>  
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Fármaco:</Text>
        <Text style={styles.value}>{farmaco}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Concentração:</Text>
        <Text style={styles.value}>{concentracao}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Forma Farmacêutica:</Text>
        <Text style={styles.value}>{forma_farmaceutica}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Detentor:</Text>
        <Text style={styles.value}>{detentor}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Registro:</Text>
        <Text style={styles.value}>{registro}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Data de Inclusão:</Text>
        <Text style={styles.value}>{data_inclusao}</Text>
      </View>
    </ScrollView>
    </View>
    </FontLoader>
    </>
  );
}

const styles = StyleSheet.create({
  containerHeader: { 
    marginTop: Platform.OS === "ios" ? "15%" : 30,
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center",

  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
    color: Colors.light.primary,
    marginBottom: 15,
    textAlign: "center",
  },
  infoContainer: {
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: "#ccc",
  },
  label: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    color: "#fff",
    backgroundColor: Colors.light.primary,
    borderRadius: 8,
    padding: 9,
  },
  value: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: Colors.light.primary,
    marginLeft: 10,
    marginTop: 10,
  },
  headerText: {
      color: Colors.light.backgroundGreyBlack,
      fontSize: 20,
      fontFamily: "Poppins_800ExtraBold",
      textAlign: "center",
    }
});

export default MedicationDetails;