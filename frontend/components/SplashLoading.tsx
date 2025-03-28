import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Colors } from '../constants/Colors';
function SplashLoading() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={Colors.light.primary} />
    </View>
  )
}

export default SplashLoading