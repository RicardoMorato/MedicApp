import React from 'react'
import { Text, View } from 'react-native'
import { ItemPropsUser } from '@/interfaces/ItemProps'
import { styles } from '../styles/style'
const UserDrugsList:  React.FC<ItemPropsUser> = ({ item }) => {
  return (
          <View style={styles.cardUser}>
            <View style={styles.TitleDosageSectionRow}>
              <Text style={[styles.itemName, { flexShrink: 1 }]} >
                {item.name}
              </Text>
              <View style={styles.dosageBg}>
                <Text style={styles.itemDosage} numberOfLines={1}>{item.concentracao}</Text>
              </View>
            </View>
            <Text style={styles.farmaco}>{item.principio_ativo}</Text>
          </View>
  )
}

export default UserDrugsList