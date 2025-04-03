import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";
import { addMedicine } from "@/services/addmedicine";
import { utilDecodeToken, utilDecodeTokenName } from "@/utils/utilDecodeToken";
import { MedicineData } from "../../interfaces/MedicineData";
import { Colors } from "@/constants/Colors";
import { SplashScreen } from "expo-router";
import { Poppins_300Light, useFonts } from "@expo-google-fonts/poppins";
import iconButton from "../../assets/icons/iconAdd.png";
import { fetchusername } from "@/utils/fetchUserData";


const AddMedicine = () => {
  const navigation = useNavigation();
  const [medicineName, setMedicineName] = useState("");
  const [activeIngredient, setActiveIngredient] = useState("");
  const [concentration, setConcentration] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setusername] = useState("");
  const [loaded, error] = useFonts({
    'Poppins_300Light': Poppins_300Light
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  
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
    fetchusername().then((user) => {
          if (user) {
            setusername(user);
          } else {
            setusername("Usuário");
          }
        })

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -130}
    >
      <View style={styles.container}>
        <View style={styles.backButton}>
        <TouchableOpacity  onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#595959" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Adicionar medicamento</Text>
        </View>
        <View style={styles.headerDivider}></View>

        <Text style={styles.subtitle}>Olá {username}, aqui você pode adicionar os seus próprios medicamentos!</Text>

        <View style={styles.form}>
          <View style={styles.headerForm}>
            <Text style={styles.titleForm}>Adicionar medicamento</Text>
          </View>
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
            <ActivityIndicator color={Colors.light.primary} />
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <Text style={styles.buttonText}>Adicionar</Text>
              <Image source={iconButton} resizeMode="contain" style={{ width: 25, height: 25 }} />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddMedicine;