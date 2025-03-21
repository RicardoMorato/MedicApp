import colors from "@/global/colors";
import { checkDrugInteraction } from "@/services/drugs.service";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

const drugs = [
  { id: 1, value: "dipirona" },
  { id: 5, value: "tilenol" },
  { id: 2, value: "histamin" },
  { id: 3, value: "dipirona" },
  { id: 4, value: "dipirona" },
];

export default function DrugInteraction() {
  const navigation = useNavigation<any>();
  const [drugA, setDrugA] = useState<any>();
  const [drugB, setDrugB] = useState<any>();

  useEffect(() => {}, []);

  async function checkDrugsInteraction() {
    const result = await checkDrugInteraction([drugA, drugB]);
    console.log(result);
  }
  return (
    <>
      <View
        style={{
          backgroundColor: colors.darkBg,
        }}
      >
        <View
          style={{
            backgroundColor: colors.lightGray,
          }}
        >
          <Text>
            Verifique se você pode tomar dois medicamentos simultâneamente.
          </Text>

          <SelectList
            placeholder="Selecione um medicamento"
            setSelected={(id: number) => setDrugA(id)}
            data={drugs}
            save="value"
          />

          <Text>e</Text>

          <SelectList
            placeholder="Selecione um medicamento"
            setSelected={(id: number) => setDrugB(id)}
            data={drugs}
            save="value"
          />

          <Button onPress={checkDrugsInteraction} title="Verificar interação" />
        </View>
      </View>
    </>
  );
}
