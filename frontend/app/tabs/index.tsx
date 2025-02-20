import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native"
import Routes from "../_layout"

//  função principal de configuração de rotas
export default function App(){
  
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content"
      backgroundColor="#fff"
      />
      <Routes/>
    </NavigationContainer>
  )
}