import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Children, useEffect, useState } from "react";
import { SplashScreen } from "expo-router";
import Signin from "@/pages/Signin";
import Signup from "@/pages/Signup";
import AddMedicine from "@/pages/AddMedicine";
import MedicationList from "@/pages/MedicationList";
import MedicationDetails from "@/pages/MedicationDetails";
import DrugInteraction from "@/pages/DrugInteraction";
import LearnMore from "@/pages/LearnMore";
import Profile from "@/pages/Profile";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "@/constants/Colors";

export const HomeNav = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const TabNav = () => (
    <Tab.Navigator  screenOptions={({route}) => ({
      animation: "shift" ,
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: "medkit" | "medkit-outline" | "list" | "list-outline" | "add-circle" | "add-circle-outline" | "person" | "person-outline" | "home";
        switch (route.name) {
          case "Interações":
            iconName = focused ? "medkit" : "medkit-outline";
            color = focused ? Colors.light.primary : Colors.light.backgroundGreyBlack;
            break;
          case "Lista":
            iconName = focused ? "list" : "list-outline";
            color = focused ? Colors.light.primary : Colors.light.backgroundGreyBlack;
            break;
          case "Adicionar":
            iconName = focused ? "add-circle" : "add-circle-outline";
            color = focused ? Colors.light.primary : Colors.light.backgroundGreyBlack;
            break;
          case "Meu perfil":
            iconName = focused ? "person" : "person-outline";
            color = focused ? Colors.light.primary : Colors.light.backgroundGreyBlack;
            break;
          default:
            iconName = "home";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({ children, focused, color }) => (
          <Text
            style={{
              fontSize: 10,
              color: focused
                ? Colors.light.primary
                : Colors.light.backgroundGreyBlack,
              fontWeight: focused ? "600" : "normal",
              fontFamily: "Poppins_500Medium",
              textAlign: "center",
            }}
          >
            {children}
          </Text>
        ),
        tabBarStyle: styles.tabBarStyle,
        tabBarItemStyle: styles.tabBarItemStyle,
        tabBarHideOnKeyboard: true,
        tabBarButton(props) {
          return (
            <TouchableOpacity
              {...props}
              delayLongPress={props.delayLongPress ?? undefined}
            >
              {props.children}
            </TouchableOpacity>
          );
        },
        
    })}>
      <Tab.Screen
        name="Interações"
        component={DrugInteraction}
      />
      <Tab.Screen
        name="Lista"
        component={MedicationList}
      />
      <Stack.Screen
        name="Adicionar"
        component={AddMedicine}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Meu perfil"
        component={Profile}
      />

    </Tab.Navigator>
  );

  return (
    <Stack.Navigator screenOptions={{ animation: "fade" }}>
      <Stack.Screen
        name="TabNav"
        component={TabNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddMedicine"
        component={AddMedicine}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignOut"
        component={LoginNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LearnMore"
        component={LearnMore}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MedicationDetails"
        component={MedicationDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export const LoginNav = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ animation: "slide_from_right" }}>
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
  return <>{isLoggedIn ? <HomeNav /> : <LoginNav />}</>;
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    backgroundColor: Colors.light.backgroundBoxProfile,
    position: "absolute",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginHorizontal: 20,
    borderTopWidth: 0,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
  },
  tabBarItemStyle: {
    paddingVertical: 9,
    borderRadius: 999,
  }
})