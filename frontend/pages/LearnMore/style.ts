import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    headerText: {
      position: "absolute",
      top: 45,
      color: "#595959",
      fontSize: 22,
      fontWeight: "800",
      marginLeft: 10,
    },
    headerDivider: {
      position: "absolute",
      top: 75,
      left: 0,
      right: 0,
      width: "100%",
      height: 2,
      backgroundColor: "#595959",
    },
    container: {
      flex: 1,
      backgroundColor: '#EFEFEF',
      alignItems: "center",
      justifyContent: "center",
      padding: 0,
    },
    content: {
      backgroundColor: '#FEF9C3',
      borderRadius: 15,
      borderColor: "#FFA50A",
      borderWidth: 1,
      width: "85%",
      paddingVertical: 32,
      paddingHorizontal: 16,
    },
    medicineBlock: {
      marginBottom: 10,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    severity: {
      fontSize: 14,
      marginBottom: 10,
      color: "#6C788E"
    },
    effectTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      lineHeight: 25,
      textAlign: "justify",
    },
    effectText: {
      fontWeight: "normal",
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 25,
    },
    infoTitle: {
      fontSize: 16,
      color: "#6C788E"
    },
    infoText: {
      fontSize: 14,
      fontWeight: "bold"
    },
    buttonContainer: {
      marginTop: 20,
      paddingHorizontal: 16,
      paddingBottom: 20,
      width: "90%",
      alignItems: "center",
    },
    button: {
      padding: 12,
      borderRadius: 2,
      alignItems: "center",
      width: "90%",
      boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.15)',
      borderColor: "#FFA50A",
      borderWidth: 1,
      alignSelf: "center",
      marginTop: 32
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFA50A',
    },
  });

  export default styles;