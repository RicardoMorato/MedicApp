import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

export async function utilDecodeToken() {
  const token = await AsyncStorage.getItem("userToken") || ""
  const IdDecoded = jwtDecode(token)
  return IdDecoded.sub
}
