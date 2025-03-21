import React from 'react'
import { View } from 'react-native'
import SearchBar from './SearchBar/SearchBar'
import { styles } from './styles/style'

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  return (
      <View style={styles.header}>
          <View style={styles.separator}></View>
          <SearchBar search={searchQuery} setSearch={(text) => setSearchQuery(text)} />
      </View>
  )
}

export default Header