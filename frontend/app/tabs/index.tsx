import React from "react";
import { NavigationContainer } from "@react-navigation/native"
import Routes from "../_layout"

//  função principal de configuração de rotas
export default function App(){
  
  return (
    <NavigationContainer>
      <Routes/>
    </NavigationContainer>
  )
}