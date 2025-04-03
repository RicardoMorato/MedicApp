import { Colors } from '@/constants/Colors'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

function HeaderTittle({title}: {title: string}) {
  return (
    <>
    <Text style={styles.headerText}> {title}</Text>
      <View style={styles.headerDivider}></View>
      </>

  )
}

export default HeaderTittle

const styles = StyleSheet.create({
    headerText: {
        marginTop: 30,
        color: Colors.light.backgroundGreyBlack,
        fontSize: 20,
        marginLeft: 10,
        fontFamily: "Poppins_800ExtraBold",
        textAlign: "center"
    },
      headerDivider: {
        left: 0,
        right: 0,
        width: "100%",
        height: 1,
        backgroundColor: Colors.light.backgroundGreyBlack,
        boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.35)',
      },
})