import {
  checkDrugInteraction,
  getInteractionDrugsList,
} from "@/services/drugs.service";
import { SplashScreen, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import styles from "./style";
import InteractionResultPopover from "@/components/InteractionResultPopover";
import { Provider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import MedicationImage from "../../assets/icons/medicaments.png";
import arrowImage from "../../assets/icons/arrows-interaction.png";
import {
  useFonts,
  Poppins_300Light,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { Dropdown } from "react-native-element-dropdown";
import { Colors } from "@/constants/Colors";
import HeaderTittle from "@/components/HeaderTittle";
import FontLoader from "@/components/FontLoader";

export default function DrugInteractionScreen() {
  const navigation = useNavigation<any>();
  const [drugA, setDrugA] = useState<string | null>(null);
  const [drugB, setDrugB] = useState<string | null>(null);
  const [interactionResult, setInteractionResult] = useState<boolean | null>(
    null
  );
  const [drugsList, setDrugsList] = useState<any[]>([]);
  const [isFocusDrugA, setIsFocusDrugA] = useState(false);
  const [isFocusDrugB, setIsFocusDrugB] = useState(false);
  const [loaded, error] = useFonts({
    Poppins_300Light: Poppins_300Light,
    Poppins_600SemiBold: Poppins_600SemiBold,
    Poppins_500Medium: Poppins_500Medium,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    getInteractionDrugsList().then((result) => setDrugsList(result));
  }, []);

  if (!loaded && !error) {
    return null;
  }

  function parseDrugsToSelect(drugs: any[]) {
    const parsedDrugs: { key: number; value: string }[] = [];
    drugs.forEach((drug) =>
      parsedDrugs.push({ key: drug.id, value: drug.name })
    );
    return parsedDrugs;
  }

  async function checkDrugsInteraction() {
    if (!drugA || !drugB) {
      Alert.alert("", "Por favor, selecione ambos os medicamentos.");
      return;
    }
    const result = await checkDrugInteraction([drugA, drugB]);
    setInteractionResult(result);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS == "ios" ? 0 : -150}
    >
      <FontLoader>
        <HeaderTittle title="Verificar Interações" />
        <Provider>
          <View style={styles.container}>
            <View style={styles.content}>
              {interactionResult != null &&
                drugA !== null &&
                drugB !== null && (
                  <InteractionResultPopover
                    drugA={drugA}
                    drugB={drugB}
                    result={interactionResult ?? true}
                    closeCallback={() => setInteractionResult(null)}
                  />
                )}
              <Text style={styles.subtitle}>
                Verifique se você pode tomar dois medicamentos{" "}
                <Text style={styles.highlight}>simultaneamente</Text>.
              </Text>
              <View style={styles.interactionContainer}>
                <View
                  style={styles.contentDropdown}
                  testID="dropdown-drugA-container"
                >
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocusDrugA && {
                        borderColor: Colors.light.primary,
                        borderWidth: 1,
                      },
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={parseDrugsToSelect(drugsList)}
                    search
                    autoScroll={false}
                    maxHeight={300}
                    labelField="value"
                    valueField="value"
                    placeholder={
                      !isFocusDrugA ? "Selecione o primeiro medicamento" : "..."
                    }
                    searchPlaceholder="Pesquisar medicamento..."
                    value={drugA}
                    onFocus={() => setIsFocusDrugA(true)}
                    onBlur={() => setIsFocusDrugA(false)}
                    onChange={(item) => {
                      setDrugA(item.value);
                      setIsFocusDrugA(false);
                    }}
                  />
                </View>
                <View
                  style={{
                    backgroundColor: "#fff",
                    width: "100%",
                    borderRadius: 10,
                  }}
                  testID="dropdown-drugB-container"
                >
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocusDrugB && {
                        borderColor: Colors.light.primary,
                        borderWidth: 1,
                      },
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={parseDrugsToSelect(drugsList)}
                    search
                    autoScroll={false}
                    maxHeight={300}
                    labelField="value"
                    valueField="value"
                    placeholder={
                      !isFocusDrugB ? "Selecione o segundo medicamento" : "..."
                    }
                    searchPlaceholder="Pesquisar medicamento..."
                    value={drugB}
                    onFocus={() => setIsFocusDrugB(true)}
                    onBlur={() => setIsFocusDrugB(false)}
                    onChange={(item) => {
                      setDrugB(item.value);
                      setIsFocusDrugB(false);
                    }}
                  />
                </View>

                <View style={styles.medicamentsImageContainer}>
                  <Image
                    source={MedicationImage}
                    resizeMode="contain"
                    style={{ height: 60, borderRadius: 50, width: 60 }}
                  ></Image>
                </View>
              </View>

              <TouchableOpacity
                onPress={checkDrugsInteraction}
                style={styles.button}
              >
                <View style={styles.sectionButton}>
                  <Text style={styles.buttonText}>Verificar Interação</Text>
                  <Image
                    source={arrowImage}
                    resizeMode="contain"
                    style={{ height: 32, width: 32 }}
                  ></Image>
                </View>
              </TouchableOpacity>
              <Text style={styles.disclaimer}>
                Este aplicativo avalia interações medicamentosas, mas não
                substitui a consulta médica. Sempre busque orientação de um
                profissional de saúde.
              </Text>
            </View>
          </View>
        </Provider>
      </FontLoader>
    </KeyboardAvoidingView>
  );
}
