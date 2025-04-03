import HeaderProfile from '@/components/HeaderProfile'
import React from 'react'
import { Text, View } from 'react-native'
import { styles } from './style'
import FontLoader from '../../components/FontLoader';
import HeaderTittle from '@/components/HeaderTittle'
import AddedDrugsList from '@/components/AddedDrugs'

function Profile() {

  return (
    <>
      <FontLoader>
        <View style={styles.container}>
        <HeaderTittle title="Meu perfil"/>
        <HeaderProfile />
        <AddedDrugsList/>
        </View>
      </FontLoader>
    </>
  )
}

export default Profile