import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";
import { addMedicine } from "@/services/addmedicine";
import { utilDecodeToken } from "@/utils/utilDecodeToken";
import { MedicineData } from "../../interfaces/MedicineData";
import arrow from "../../assets/images/stash--arrows-switch-duotone.png";

const AddMedicine = () => {
  const navigation = useNavigation();
  const [medicineName, setMedicineName] = useState("");
  const [activeIngredient, setActiveIngredient] = useState("");
  const [concentration, setConcentration] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddMedicine = async () => {
    if (!medicineName || !activeIngredient || !concentration) {
      Alert.alert("Por favor, preencha todos os campos.");
    } else {
      setMedicineName("");
      setActiveIngredient("");
      setConcentration("");

      const user_id = await utilDecodeToken();
      
      const data: MedicineData = {
        name: medicineName,
        activeIngredient: activeIngredient,
        concentration: concentration,
      }      
      addMedicine(data, user_id, setLoading);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -150}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
          <Text style={styles.headerText}>Adicionar medicamento</Text>
        </TouchableOpacity>
        <View style={styles.headerDivider}></View>

        <Text style={styles.subtitle}>Olá (nome do usuário), aqui você pode adicionar os seus próprios medicamentos</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nome do medicamento"
            placeholderTextColor="#AAA"
            value={medicineName}
            onChangeText={setMedicineName}
          />
          <TextInput
            style={styles.input}
            placeholder="Princípio ativo"
            placeholderTextColor="#AAA"
            value={activeIngredient}
            onChangeText={setActiveIngredient}
          />
          <TextInput
            style={styles.input}
            placeholder="Concentração"
            placeholderTextColor="#AAA"
            value={concentration}
            onChangeText={setConcentration}
          />
        </View>
        
        <TouchableOpacity style={styles.button} onPress={handleAddMedicine}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Adicionar medicamento</Text>
          )}
          <Image source={arrow} resizeMode="contain" style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddMedicine;