import api from "./api";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type MedicineData = {
  name: string;
  activeIngredient: string;
  isGeneric: boolean;
  brand?: string;
};

export const addMedicine = async (
  data: MedicineData,
  userId: string,
  setLoading: (loading: boolean) => void,
  navigation: any
) => {
  try {
    setLoading(true);
    const token = await AsyncStorage.getItem("userToken");

    const response = await api.post(
      `/users/${userId}/drugs/`,
      {
        name: data.name,
        principio_ativo: data.activeIngredient,
        is_generic: data.isGeneric,
        brand: data.brand || ""
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.status === 201) {
      Alert.alert("Sucesso", "Medicamento cadastrado com sucesso!");
    }
  } catch (error: any) {
    Alert.alert(
      "Erro",
      error.response?.data?.detail || "Erro ao adicionar medicamento. Tente novamente."
    );
  } finally {
    setLoading(false);
  }
};
