import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";
import { addMedicine } from "@/services/addmedicine";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { MedicineData } from "../../interfaces/MedicineData";

const AddMedicine = () => {
  
  const navigation = useNavigation();
  const [medicineName, setMedicineName] = useState("");
  const [activeIngredient, setActiveIngredient] = useState("");
  const [isGeneric, setIsGeneric] = useState<boolean | null>(null);
  const [brandName, setBrandName] = useState("");
  const [loading, setLoading] = useState(false)  

  const handleAddMedicine = async () => {
    if (!medicineName || !activeIngredient || isGeneric === null || (!isGeneric && !brandName)) {
      Alert.alert("Por favor, preencha todos os campos.");
    } else {
      setMedicineName("");
      setActiveIngredient("");
      setIsGeneric(null);
      setBrandName("");

      const token = await AsyncStorage.getItem("userToken") || "";
      const user_id = jwtDecode(token).sub
    
      const data: MedicineData = {
        name: medicineName,
        activeIngredient: activeIngredient,
        isGeneric: isGeneric,
        brand: isGeneric ? "" : brandName,
      };
      
      addMedicine(data, user_id, setLoading);
    }
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
        <Text style={styles.headerText}>Adicionar medicamento</Text>
      </TouchableOpacity>
      <View style={styles.headerDivider}></View>


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

        <Text style={styles.label}>O medicamento é genérico?</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity onPress={() => setIsGeneric(true)} style={styles.radioButton}>
            <View style={isGeneric === true ? styles.radioSelected : styles.radio} />
            <Text style={styles.radioText}>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsGeneric(false)} style={styles.radioButton}>
            <View style={isGeneric === false ? styles.radioSelected : styles.radio} />
            <Text style={styles.radioText}>Não</Text>
          </TouchableOpacity>
        </View>

        {!isGeneric && isGeneric !== null && (
          <TextInput
            style={styles.input}
            placeholder="Digite aqui a marca..."
            placeholderTextColor="#AAA"
            value={brandName}
            onChangeText={setBrandName}
          />
        )}


        <TouchableOpacity style={styles.button} onPress={handleAddMedicine}>
          {loading 
          ? <ActivityIndicator color="#fff"/>
          : <Text style={styles.buttonText}>Adicionar</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddMedicine;
