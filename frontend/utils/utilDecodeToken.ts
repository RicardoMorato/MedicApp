import { CustomJwtPayload } from "@/interfaces/GetPayload";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

export async function utilDecodeToken() {
  const token = await AsyncStorage.getItem("userToken") || ""
  const IdDecoded = jwtDecode(token)
  return IdDecoded.sub
}
export async function utilDecodeTokenName() {
  const token = await AsyncStorage.getItem("userToken") || ""
  const name = jwtDecode<CustomJwtPayload>(token).name
  return name
}

export async function utilDecodeTokenEmail() {
  const token = await AsyncStorage.getItem("userToken") || ""
  const email = jwtDecode<CustomJwtPayload>(token).email
  return email
}
export async function utilDecodeTokenExp() {
  const token = await AsyncStorage.getItem("userToken") || ""
  const exp = jwtDecode<CustomJwtPayload>(token).exp
  return exp
}
