import { checkDrugInteraction } from "@/services/drugs.service";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import styles from "./style";
import InteractionResultPopover from "@/components/InteractionResultPopover";
import { drugs } from "@/data";
import { Provider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export default function DrugInteraction() {
  const navigation = useNavigation<any>();
  const [drugA, setDrugA] = useState<string | null>(null);
  const [drugB, setDrugB] = useState<string | null>(null);
  const [interactionResult, setInteractionResult] = useState<boolean | null>(null);

  function parseDrugsToSelect(drugs: any[]) {
    const parsedDrugs: { key: number; value: string }[] = [];
    drugs.forEach((drug) =>
      parsedDrugs.push({ key: drug.id, value: drug.name })
    );
    return parsedDrugs;
  }

  useEffect(() => {}, []);

  async function checkDrugsInteraction() {
    if (!drugA || !drugB) {
      Alert.alert("Por favor, selecione ambos os medicamentos.");
      return;
    }
    const result = await checkDrugInteraction([drugA, drugB]);
    setInteractionResult(result);
  }

  return (
    <Provider>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
          <Text style={styles.headerText}>Verificar interações</Text>
        </TouchableOpacity>
        <View style={styles.headerDivider}></View>
        <View style={styles.content}>
          {interactionResult != null && drugA !== null && drugB !== null && (
            <InteractionResultPopover
              drugA={drugA}
              drugB={drugB}
              result={interactionResult ?? true}
              closeCallback={() => setInteractionResult(null)}
            />
          )}
          <Text style={styles.subtitle}>
            Verifique se você pode tomar dois medicamentos <Text style={styles.highlight}>simultaneamente</Text>.
          </Text>
          <View style={styles.interactionContainer}>
            <SelectList
              placeholder="Selecione o primeiro medicamento"
              searchPlaceholder="Buscar"
              setSelected={setDrugA}
              data={parseDrugsToSelect(drugs)}
              save="value"
              boxStyles={styles.dropdownWrapper}
              inputStyles={styles.dropdownText}
              dropdownStyles={styles.dropdown}
            />

            <SelectList
              placeholder="Selecione o segundo medicamento"
              searchPlaceholder="Buscar"
              setSelected={setDrugB}
              data={parseDrugsToSelect(drugs)}
              save="value"
              boxStyles={styles.dropdownWrapper}
              inputStyles={styles.dropdownText}
              dropdownStyles={styles.dropdown}
            />
          </View>
          <TouchableOpacity onPress={checkDrugsInteraction} style={styles.button}>
            <Text style={styles.buttonText}>Verificar Interação</Text>
          </TouchableOpacity>
          <Text style={styles.disclaimer}>
            Este aplicativo avalia interações medicamentosas, mas não substitui a consulta médica. Sempre busque orientação de um profissional de saúde.
          </Text>
        </View>
      </View>
    </Provider>
  );
}
