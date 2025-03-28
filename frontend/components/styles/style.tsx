import { Colors } from '../../constants/Colors';
import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    scrollContainer: {
      flex: 1,
      backgroundColor: Colors.light.backgroundGrey,
    },
    container: {
      flex: 1,
      backgroundColor: Colors.light.backgroundGrey,
      borderRadius: 10,
  
    },
    sectionMain: {
      flexDirection: 'column',
      flex: 1,
      paddingRight: 5
    },
    header: {
      alignItems: 'center',
      backgroundColor: Colors.light.background,
      justifyContent: 'center',
      paddingBottom: 20,
      boxShadow: Colors.light.boxShadow,
  
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
      borderRadius: 50,
      width:60,
      alignItems: 'center',
    },
    itemName: {
      fontSize: 20,
      fontWeight: 'bold',
      alignItems: "center"
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
      fontSize: 15,
      color: Colors.light.primary,
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
