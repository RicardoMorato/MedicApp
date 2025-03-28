import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

interface SearchBarProps {
  search: string;
  setSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch }) => {


  return (
    <View style={styles.container}>
      <Icon style={styles.searchIcon} name="search" size={30} color="#000" />
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Buscar medicamento..."
        placeholderTextColor="#999"
        editable
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
  },
  searchIcon: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    color: '#BBBBBB',
    marginRight: 10
  },
  input: {
    alignSelf: 'stretch',
    fontSize: 16,
    flex: 1,
  },
});

export default SearchBar;