import { Colors } from '@/constants/Colors'
import React from 'react'
import { View, Text } from 'react-native'


const LearnMore = () => {
  return (
    
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{fontSize: 30, color: Colors.text.warning}}>Saiba Mais</Text>
      <Text style={{textAlign: 'center', padding: 40, fontSize: 20, fontFamily: "Poppins_300Light"}}>Aqui vão ser listadas todas as informações sobre as interações medicamentosas dos medicamentos</Text>
    </View>
  )
}

export default LearnMore