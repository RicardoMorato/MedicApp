import React from "react";
import { NavigationContainer } from "@react-navigation/native"
import Routes from "../_layout"
import { initializeMirage } from "../../services/miragejs"

//  função principal de configuração de rotas
initializeMirage()
export default function App(){
  
  return (
    <NavigationContainer>
      <Routes/>
    </NavigationContainer>
  )
}