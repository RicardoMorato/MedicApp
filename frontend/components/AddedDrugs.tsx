import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AxiosError } from "axios";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { MedicamentsListedUser } from "@/components/MedicamentsListUser";
import { Colors } from "@/constants/Colors";
import { MedicationUser } from "@/interfaces/Medication";
import api from "@/services/api";
import { utilDecodeToken } from "@/utils/utilDecodeToken";
import HeaderProfile from "@/components/HeaderProfile";

function PageContent() {
  const isFocused = useIsFocused();

  const [medications, setMedications] = useState<MedicationUser[]>([]);
  const [amount, setAmount] = useState<number>(0);

  async function fetchMedications() {
    const userId = await utilDecodeToken();
    const token = (await AsyncStorage.getItem("userToken")) || "";

    try {
      const response = await api.get(`/user/${userId}/medications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMedications(response.data);
      setAmount(response.data.length);
    } catch (err: any) {
      const error = err as AxiosError;

      console.error(
        "Erro ao buscar medicamentos:",
        error.response?.data || error
      );
    }
  }
  useEffect(() => {
    fetchMedications();
  }, [isFocused]);

  return (
    <>
      <HeaderProfile amount={amount} />
      <View style={styles.contentTitle}>
        <MaterialCommunityIcons
          name="pill"
          size={28}
          color={Colors.light.primary}
        />
        <Text style={styles.title}>Meus medicamentos adicionados</Text>
      </View>
      <View style={styles.content}>
        <MedicamentsListedUser medications={medications} />
      </View>
    </>
  );
}

export default PageContent;

const styles = StyleSheet.create({
  content: {
    height: 400,
    paddingVertical: 20,
    paddingHorizontal: 5,
    backgroundColor: Colors.light.backgroundBoxProfile,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  contentTitle: {
    flexDirection: "row",
    gap: 5,
    marginTop: 30,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 19,
    color: Colors.light.text,
  },
});
