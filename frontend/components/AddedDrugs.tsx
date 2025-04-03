import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MedicamentsListedUser } from '@/components/MedicamentsListUser'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Colors } from "@/constants/Colors";


function AddedDrugsList() {
    return (
        <>
    <View style={styles.contentTitle}>
        <MaterialCommunityIcons name="pill" size={28} color={Colors.light.primary} />
        <Text style={styles.title}>Meus medicamentos adicionados</Text>
    </View>
    <View style={styles.content}>
          <MedicamentsListedUser medications={[]} />
    </View>
    </>
    )
}

export default AddedDrugsList

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
        flexDirection: 'row',
        gap: 5,
        marginTop: 30,
        marginBottom: 15,
        marginHorizontal: 20,
    },
    title: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 19,
        color: Colors.light.text,
    }
})