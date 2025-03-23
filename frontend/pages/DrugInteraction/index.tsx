import { checkDrugInteraction } from "@/services/drugs.service";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import styles from "./style";
import InteractionResultPopover from "@/components/InteractionResultPopover";
import { drugs } from "@/data";
import { Colors } from "@/constants/Colors";
import { Provider } from "react-native-paper";

export default function DrugInteraction() {
  const navigation = useNavigation<any>();
  const [drugA, setDrugA] = useState<string | null>("null");
  const [drugB, setDrugB] = useState<string | null>("null");
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
    <Provider>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("MainHome")}
        >
          <Image source={require("@/assets/icons/backArrow.png")} />
          <Text
            style={{
              color: Colors.dark.text,
              fontFamily: "Poppins_700Bold",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            Verificar Interações
          </Text>
        </TouchableOpacity>
        <View style={styles.content}>
          {interactionResult != null && drugA && drugB && (
            <InteractionResultPopover
              drugA={drugA}
              drugB={drugB}
              result={interactionResult ?? true}
              closeCallback={() => setInteractionResult(null)}
            />
          )}
          <View style={styles.interactionContainer}>
            <Text style={styles.title}>
              Verifique se você pode tomar dois medicamentos simultâneamente.
            </Text>

            <SelectList
              placeholder="Selecione um medicamento"
              searchPlaceholder="Buscar"
              setSelected={setDrugA}
              data={parseDrugsToSelect(drugs)}
              save="value"
              boxStyles={styles.dropdownWrapper}
              inputStyles={styles.dropdownText}
              dropdownStyles={styles.dropdown}
            />

            <Image source={require("@/assets/icons/Cycle.png")} />

            <SelectList
              placeholder="Selecione um medicamento"
              searchPlaceholder="Buscar"
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
              <Image source={require("@/assets/icons/smallCycle.png")} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Provider>
  );
}
