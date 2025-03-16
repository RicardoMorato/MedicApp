import api from "./api";
import { Alert } from "react-native";
import  AsyncStorage  from "@react-native-async-storage/async-storage"

type FormData = {
  Nome: string
  Email: string
  Senha: string
}

type FormDataLogin = {
  Email: string
  Senha: string
}

export const onSubmit = async (
  data: FormData, 
  navigation: any,
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true)
    const response = await api.post('/users/signup', {
      name: data.Nome,
      email: data.Email,
      password: data.Senha
    })

    if (response.status === 200) {
      Alert.alert('Cadastro realizado com sucesso', '\nFaça login para continuar.')
      
      setTimeout(() => {
        setLoading(false)
        navigation.replace('Signin') 
      }, 1500)
    }
    
  } catch (error: any) {
    Alert.alert('Erro', error.response?.data?.detail || 'Erro ao realizar cadastro. Tente novamente.');
  }
}

export const login = async (
  data: FormDataLogin, 
  navigation: any, 
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true)
    const response = await api.post('/users/login', {
      email: data.Email,
      password: data.Senha
    })

    if (response.status === 200) {
      AsyncStorage.setItem('userToken', response.data.token)
      AsyncStorage.setItem('isLoggedIn', JSON.stringify(true)) 
      setTimeout(() => {
        setLoading(false)
        Alert.alert('Sucesso', 'Login realizado com sucesso!')
        navigation.replace('MainHome') 
      }, 1000)// Usando replace em vez de navigate 
      // por que ao tentar voltar quando estiver no home, 
      // nao voltar para a tela de login, apenas se sair da conta
    } 
  } catch (error: any) {
    Alert.alert('Erro', error.response?.data?.detail || 'Erro ao realizar login. Tente novamente.');
  }
}

export const logOut = async (navigation: any) => {
  await AsyncStorage.removeItem('userToken')
  await AsyncStorage.removeItem('isLoggedIn')
  Alert.alert('Você saiu!', 'Faça login novamente para acessar sua conta.')
  navigation.replace('SignOut') 

}