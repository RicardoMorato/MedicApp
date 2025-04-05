import axios from "axios";
import api from "./api";
import API_URL from "@/config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function checkDrugInteraction(drugs: string[]) {
  try {
    const response = await api.post("/interactions", {
      name_1: drugs[0],
      name_2: drugs[1],
    });

    await AsyncStorage.setItem(
      "interaction",
      JSON.stringify(response.data["interação"])
    );
  } catch (error) {
    console.log(error);
    return false;
  }

  return true;
}

export async function getInteractionDrugsList() {
  const drugs = await api.get("/pharma/");
  return drugs.data.map((drug: any, i: number) => ({
    id: i,
    name: drug.pharma_name,
  }));
}
