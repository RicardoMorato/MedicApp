import { utilDecodeTokenEmail, utilDecodeTokenName } from "./utilDecodeToken";

export const fetchusername = async () => {
  const user = await utilDecodeTokenName()
  return user
};

export const fetchUserEmail = async () => {
  const email = await utilDecodeTokenEmail()
  return email
}