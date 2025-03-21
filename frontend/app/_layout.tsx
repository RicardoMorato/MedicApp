import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { SplashScreen, useNavigation } from "expo-router";

import Signin from "@/pages/Signin";
import Signup from "@/pages/Signup";
import Home from "@/pages/Home";
import AddMedicine from "@/pages/AddMedicine";
import MedicationList from "@/pages/MedicationList";
import MedicationDetails from "@/pages/MedicationDetails";
import DrugInteraction from "@/pages/DrugInteraction";

export const HomeNav = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainHome"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DrugInteraction"
        component={DrugInteraction}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignOut"
        component={LoginNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddMedicine"
        component={AddMedicine}
        options={{ headerShown: false }}
      />
        <Stack.Screen
        name="MedicationList"
        component={MedicationList}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="MedicationDetails"
        component={MedicationDetails}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export const LoginNav = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeNav"
        component={HomeNav}
        options={{ headerShown: false }}
      />
     
    </Stack.Navigator>
  );
};

export default function Routes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  async function getData() {
    const data = await AsyncStorage.getItem("isLoggedIn");
    console.log(data, "at app.jsx");
    setIsLoggedIn(data ? true : false);
  }
  useEffect(() => {
    getData();
    setTimeout(() => {
      SplashScreen.hide();
    }, 900);
  }, [isLoggedIn]);
  return <>{!isLoggedIn ? <HomeNav /> : <LoginNav />}</>;
}
