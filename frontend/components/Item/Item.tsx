import { Text, View, TouchableOpacity, Animated, Easing } from 'react-native';
import React, { useState } from 'react';
import { styles } from '../styles/style';
import { useNavigation } from '@react-navigation/native';
import { Medication } from '@/interfaces/Medication';

export interface ItemProps {
  item: Medication;
}

export const Item: React.FC<ItemProps> = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const navigation = useNavigation<any>();

  const toggleExpand = () => {
    setExpanded(!expanded);
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
      easing: Easing.elastic(.5),
    }).start();
  };

  const lengthDescription = item.data_inclusao.length;
  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: lengthDescription > 43 ? [0, 100] : [0, 80],
  });

  return (
    <TouchableOpacity onPress={toggleExpand}>
      <View style={styles.card}>
        <View style={styles.TitleDosageSectionRow}>
          <Text style={styles.itemName}>{item.medicamento}</Text>
          <View style={styles.dosageBg}>
            <Text style={styles.itemDosage}>{item.concentracao.split(' ')[0]}</Text>
          </View>
        </View>
        <Text style={styles.itemDosage}>{item.farmaco}</Text>
        <Animated.View style={{ height, overflow: 'hidden' }}>
          <View style={styles.dividerCard} />
          <Text style={styles.itemDescription}>{item.data_inclusao}</Text>
          <TouchableOpacity
            style={styles.linkToDetails}
            onPress={() => navigation.navigate('MedicationDetails')}
          >
            <Text style={styles.details}>Ver detalhes</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};
