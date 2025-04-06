import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MedicamentsListedUser } from '@/components/MedicamentsListUser'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Colors } from "@/constants/Colors";
import { MedicationUser } from '@/interfaces/Medication'
import api from '@/services/api';
import { utilDecodeToken } from '@/utils/utilDecodeToken';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderProfile from '@/components/HeaderProfile';

function PageContent() {

  return (
    <>
      <HeaderProfile amount={amount} />
      <View style={styles.contentTitle}>
        <MaterialCommunityIcons
          name="pill"
          size={28}
          color={Colors.light.primary}
        />
        <Text style={styles.title}>Meus medicamentos adicionados</Text>
      </View>
      <View style={styles.content}>
        <MedicamentsListedUser medications={medications} />
      </View>
    </>
  );
}

export default PageContent;

const styles = StyleSheet.create({
  content: {
    height: 400,
    paddingVertical: 20,
    paddingHorizontal: 5,
    backgroundColor: Colors.light.backgroundBoxProfile,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  contentTitle: {
    flexDirection: "row",
    gap: 5,
    marginTop: 30,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 19,
    color: Colors.light.text,
  },
});
