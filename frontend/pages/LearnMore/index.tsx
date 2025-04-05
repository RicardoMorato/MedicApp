import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SplashScreen } from "expo-router";
import alerticon from "@/assets/icons/Group.png";
import styles from "./style";
import backicon from "@/assets/icons/famicons_arrow-back-outline.png";
import { useNavigation } from "@react-navigation/native";
import {
  useFonts,
  Poppins_300Light,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { Poly_400Regular } from "@expo-google-fonts/poly";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface DrugInteraction {
  efffect: string;
  interactionStartTime: string;
  intensity: string;
  possibility: string;
  pharma1: string;
  pharma2: string;
}
const LearnMore = () => {
  const [interaction, setInteraction] = useState<DrugInteraction | null>(null);
  const navigation = useNavigation<any>();
  const [loaded, error] = useFonts({
    Poppins_300Light: Poppins_300Light,
    Poppins_600SemiBold: Poppins_600SemiBold,
    Poppins_500Medium: Poppins_500Medium,
    Poppins_700Bold: Poppins_700Bold,
    Poppins_800ExtraBold: Poppins_800ExtraBold,
    Poly_400Regular: Poly_400Regular,
  });
  useEffect(() => {
    AsyncStorage.getItem("interaction").then((result) => {
      if (!result) return;
      const data = JSON.parse(result);

      const interactionData: DrugInteraction = {
        efffect: data["efeito"],
        interactionStartTime: data["inicio_interacao"],
        intensity: data["gravidade_interacao"],
        possibility: data["probabilidade_ocorrencia"],
        pharma1: data["principio_ativo1"],
        pharma2: data["principio_ativo2"],
      };
      setInteraction(interactionData);
    });
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}> Saiba mais sobre as interações</Text>
      <View style={styles.headerDivider}></View>

      <View style={styles.content}>
        <View style={styles.medicineBlock}>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Image source={alerticon}></Image>
            <Text style={styles.title}>
              {interaction?.pharma1} + {interaction?.pharma2}
            </Text>
          </View>
          <Text style={styles.severity}>
            Gravidade: {interaction?.intensity}
          </Text>
        </View>

        <Text style={styles.effectTitle}>
          Efeito da interação:{" "}
          <Text style={styles.effectText}>{interaction?.efffect}</Text>
        </Text>

        <View style={styles.infoRow}>
          <View>
            <Text style={styles.infoTitle}>Início do efeito</Text>
            <Text style={styles.infoText}>
              {interaction?.interactionStartTime}
            </Text>
          </View>
          <View>
            <Text style={styles.infoTitle}>Probabilidade</Text>
            <Text style={styles.infoText}>{interaction?.possibility}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Image source={backicon}></Image>
            <Text style={styles.buttonText}>Voltar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LearnMore;
