import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    scrollContainer: {
      flex: 1,
      backgroundColor: '#F3F3F3',
    },
    container: {
      flex: 1,
      backgroundColor: '#F3F3F3',
      borderRadius: 10,
  
    },
    sectionMain: {
      flexDirection: 'column',
      flex: 1,
      paddingRight: 5
    },
    header: {
      alignItems: 'center',
      backgroundColor: '#fff',
      justifyContent: 'center',
      paddingBottom: 20,
      boxShadow: '1px 2px 6px rgba(0, 0, 0, 0.25)'
  
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
      color: '#595959'
    },
    separator: {
      backgroundColor: '#BBBBBB',
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
      backgroundColor: '#007BFF',
      width: 50,
      height: 50,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sectionHeaderText: {
      fontSize: 22,
      color: '#fff',
      fontWeight: 'bold',
    },
    sectionHeaderTextSide: {
      fontSize: 28,
      color: 'black',
      fontWeight: 'bold',
    },
    card: {
      backgroundColor: '#fff',
      padding: 20,
      marginVertical: 10,
      borderRadius: 10,
      marginHorizontal: 35,
      boxShadow: '1px 2px 6px rgba(0, 0, 0, 0.25)'
    },
    TitleDosageSectionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dosageBg: {
      backgroundColor: "#ECF5FC",
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
      color: '#595959',
      fontWeight: 'bold',
    },
    dividerCard: {
      height: 1,
      backgroundColor: '#E0E0E0',
      marginTop: 15,
    },
    itemDosage: {
      marginTop: 5,
      fontSize: 15,
      color: '#419DFF',
    },
    linkToDetails: {
        marginTop: 5,
        width: 100
    },
    details: {
        fontSize: 15,
        color: '#419DFF',
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
        color: '#595959',
        textAlign: 'center',
    }
  
  });
