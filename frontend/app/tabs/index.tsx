import React from "react";
import { StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native"
import Routes from "../_layout"
import { green } from "react-native-reanimated/lib/typescript/Colors";


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