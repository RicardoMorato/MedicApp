import colors from "@/global/colors";
import { checkDrugInteraction } from "@/services/drugs.service";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import styles from "./style";
import InteractionResultPopover from "@/components/InteractionResultPopover";
import { drugs } from "@/data";
import { Colors } from "@/constants/Colors";

export default function DrugInteraction() {
  const navigation = useNavigation<any>();
  const [drugA, setDrugA] = useState<string | null>(null);
  const [drugB, setDrugB] = useState<string | null>(null);
  const [interactionResult, setInteractionResult] = useState<boolean | null>(
    null
  );

  function parseDrugsToSelect(drugs: any[]) {
    const parsedDrugs: { key: number; value: string }[] = [];
    drugs.forEach((drug) =>
      parsedDrugs.push({ key: drug.id, value: drug.name })
    );
    return parsedDrugs;
  }

  useEffect(() => {}, []);

  async function checkDrugsInteraction() {
    if (!drugA || !drugB) return;
    const result = await checkDrugInteraction([drugA, drugB]);
    setInteractionResult(result);
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ padding: 12 }}
        onPress={() => navigation.navigate("MainHome")}
      >
        <Text
          style={{ color: Colors.light.tint, fontSize: 24, fontWeight: 700 }}
        >
          Verificar Interações
        </Text>
      </TouchableOpacity>
      <View style={styles.content}>
        {interactionResult != null && drugA && drugB && (
          <InteractionResultPopover
            drugA={drugA}
            drugB={drugB}
            result={interactionResult}
          />
        )}
        <View style={styles.interactionContainer}>
          <Text style={styles.title}>
            Verifique se você pode tomar dois medicamentos simultâneamente.
          </Text>

          <SelectList
            placeholder="Selecione um medicamento"
            setSelected={setDrugA}
            data={parseDrugsToSelect(drugs)}
            save="value"
            boxStyles={styles.dropdownWrapper}
            inputStyles={styles.dropdownText}
            dropdownStyles={styles.dropdown}
          />

          <SelectList
            placeholder="Selecione um medicamento"
            setSelected={setDrugB}
            data={parseDrugsToSelect(drugs)}
            save="value"
            boxStyles={styles.dropdownWrapper}
            inputStyles={styles.dropdownText}
            dropdownStyles={styles.dropdown}
          />

          <TouchableOpacity
            onPress={checkDrugsInteraction}
            style={styles.confirmButton}
          >
            <Text style={styles.confirmText}>Verificar Interação</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
