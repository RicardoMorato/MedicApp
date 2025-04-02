import React from 'react';
import { View, Text, TouchableOpacity, Image} from 'react-native';
import alerticon from "@/assets/icons/Group.png"
import styles from './style';
import backicon from "@/assets/icons/famicons_arrow-back-outline.png"

const LearnMore = () => {
  return (
    <View style={styles.container}>

      <Text style={styles.headerText}>Saiba mais sobre as interações</Text>
      <View style={styles.headerDivider}></View>

      <View style={styles.content}>
        <View style={styles.medicineBlock}>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Image source = {alerticon}></Image>
            <Text style={styles.title}>Medicamento X + Medicamento Y</Text>
          </View>
          <Text style={styles.severity}>Gravidade: Leve</Text>
        </View>
        
        <Text style={styles.effectTitle}>Efeito da interação: <Text style={styles.effectText}>
          Os efeitos anti-hipertensivos do Beta-Bloqueador podem ser diminuídos pelos Salicilatos. 
          Além disso, os efeitos terapêuticos do Beta-Bloqueador na fração de ejeção do ventrículo esquerdo em 
          pacientes com insuficiência cardíaca crônica também podem ser diminuídos.
        </Text></Text>
        
        <View style={styles.infoRow}>
          <View>
            <Text style={styles.infoTitle}>Início do efeito</Text>
            <Text style={styles.infoText}>Primeiras 24 horas</Text>
          </View>
          <View>
            <Text style={styles.infoTitle}>Probabilidade</Text>
            <Text style={styles.infoText}>Suspeita</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Image source={backicon}></Image>
            <Text style={styles.buttonText}>Voltar</Text>
          </View>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default LearnMore;