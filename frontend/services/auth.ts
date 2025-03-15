import api from "./api";
import { Alert } from "react-native";

type FormData = {
  Nome: string
  Email: string
  Senha: string
}

type FormDataLogin = {
  Email: string
  Senha: string
}

export const onSubmit = async (data: FormData, navigation: any) => {
  try {
    const response = await api.post('/users/signup', {
      name: data.Nome,
      email: data.Email,
      password: data.Senha
    })

    if (response.status === 200) {
      Alert.alert('Cadastro realizado com sucesso', '\nFaça login para continuar.')
      setTimeout(() =>
        navigation.navigate('Signin'), 1500)
    }
  } catch (error: any) {
    Alert.alert('Erro', error.response?.data?.detail || 'Erro ao realizar cadastro. Tente novamente.');
  }
}

export const login = async (data: FormDataLogin, navigation: any) => {
  try {
    const response = await api.post('/users/login', {
      email: data.Email,
      password: data.Senha
    })

    if (response.status === 200) {
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      setTimeout(() =>
        navigation.navigate('Home'), 1000);
    } 
  } catch (error: any) {
    Alert.alert('Erro', error.response?.data?.detail || 'Erro ao realizar login. Tente novamente.');
  }
}
