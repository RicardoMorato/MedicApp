import React from 'react'
import { View, Text } from 'react-native'
import styles from "./style";


function Home() {
  return (
    <>
    <View style={styles.container}>
      <View style={styles.notiIcon}>
        <Text>NotiIcon</Text>
      </View>
      <View style={styles.home}>

        <View >
          <Text style={styles.logo}>MedicApp</Text>
        </View>
        <View>
          <Text>Menu</Text>
        </View>

      </View>
    </View>
    <View style={styles.horizontalLine} />
    </>
  )
}

export default Home