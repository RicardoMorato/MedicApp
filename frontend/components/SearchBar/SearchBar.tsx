import { Colors } from '@/constants/Colors';
import React from 'react';
import { View, TextInput, StyleSheet, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

interface SearchBarProps {
  search: string;
  setSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch }) => {
  const [isFocused, setIsFocused] = React.useState(false)
  const colorSearch = isFocused ? Colors.light.primary : Colors.light.separator
  return (
    <View style={isFocused ?
      [styles.container, 
      {borderWidth: 1,
      borderColor: Colors.light.primary, 
      backgroundColor: Colors.light.background}] 
      : 
      styles.container}>
      <Icon style={[styles.searchIcon, { color: colorSearch }]} name="search" size={30} />
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={(text) => setSearch(text)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Buscar medicamento..."
        placeholderTextColor="#999"
        editable
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 10,
    width: '83%',
    flexDirection: 'row',
    backgroundColor: Colors.light.backgroundGrey,
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: 'absolute',
    alignItems: 'center',
    boxShadow: Colors.light.boxShadow,
    zIndex: 999,


  },

  searchIcon: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    // Removed dynamic color assignment from styles
    marginRight: 10
  },
  input: {
    alignSelf: 'stretch',
    fontSize: 16,
    flex: 1,
  },
});

export default SearchBar;