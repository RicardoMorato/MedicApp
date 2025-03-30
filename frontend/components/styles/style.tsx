import { Colors } from '../../constants/Colors';
import { Dimensions, StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    scrollContainer: {
      flex: 1,
      backgroundColor: Colors.light.backgroundGrey,
    },
    container: {
      flex: 1,
      borderRadius: 10,
  
    },
    sectionMain: {
      flexDirection: 'column',
      flex: 1,
    },
    header: {
      alignItems: 'center',
      justifyContent: 'center',  
      height: Dimensions.get('window').height / 17,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      alignItems: 'center',
      justifyContent: 'center'
    },
    description: {
      fontSize: 18,
      textAlign: 'center',
      color: Colors.light.backgroundGreyBlack,
    },
    separator: {
      backgroundColor: Colors.light.separator,
      marginBottom: 15,
      height: 1,
      width: '100%',
    },
    containerSectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 30,
      marginBottom: 10,
      marginHorizontal: 30,
      gap: 10,
      
    },
    sectionHeader: {
      backgroundColor: Colors.light.primary,
      width: 50,
      height: 50,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sectionHeaderText: {
      fontSize: 22,
      color: Colors.light.background,
      fontWeight: 'bold',
    },
    sectionHeaderTextSide: {
      fontSize: 28,
      color: 'black',
      fontWeight: 'bold',
    },
    card: {
      backgroundColor: Colors.light.background,
      padding: 20,
      marginVertical: 10,
      borderRadius: 10,
      marginHorizontal: 35,
      boxShadow: Colors.light.boxShadow,
    },
    TitleDosageSectionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dosageBg: {
      backgroundColor: Colors.light.backgroundDosage,
      paddingHorizontal: 10,
      borderRadius: 50,
      minWidth: 50,
      maxWidth:100,
      alignItems: 'center',
    },
    itemName: {
      fontSize: 20,
      fontWeight: 'bold',
      alignItems: "center"
    },
    farmaco:{
      fontSize: 15,
      marginTop: 5,
      color: Colors.light.primary,
    },
    itemDescription: {
      marginTop: 15,
      fontSize: 16,
      color: Colors.light.backgroundGreyBlack,
      fontWeight: 'bold',
    },
    dividerCard: {
      height: 1,
      backgroundColor: Colors.light.separatorCard,
      marginTop: 15,
    },
    itemDosage: {
      marginTop: 5,
      fontSize: 12,
      color: Colors.light.primary,
    },
    itemDosageOverflow:{
      backgroundColor: Colors.light.backgroundDosage,
      paddingHorizontal: 10,
      borderRadius: 50,
      minWidth: 50,
      maxWidth:150,
      alignItems: 'center',
    },
    linkToDetails: {
        marginTop: 5,
        width: 100
    },
    details: {
        fontSize: 15,
        color: Colors.light.primary,
        fontWeight: 'bold',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 50,
    },
    emptyStateText: {
        fontSize: 18,
        color: Colors.light.backgroundGreyBlack,
        textAlign: 'center',
    }
  
  });
