import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    headerText: {
      position: "absolute",
      top: 65,
      color: "#595959",
      fontSize: 20,
      marginLeft: 10,
      fontFamily: "Poppins_800ExtraBold"
    },
    headerDivider: {
      position: "absolute",
      top: 95,
      left: 0,
      right: 0,
      width: "100%",
      height: 1,
      backgroundColor: "#595959",
      boxShadow: '2px 3px 4px rgba(0, 0, 0, 0.35)',
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
      marginBottom: 5,
      fontFamily: "Poppins_700Bold"
    },
    severity: {
      fontSize: 14,
      marginBottom: 10,
      color: "#6C788E",
      fontFamily: "Poppins_500Medium"
    },
    effectTitle: {
      fontSize: 16,
      lineHeight: 25,
      textAlign: "justify",
      fontFamily: "Poppins_700Bold",
    },
    effectText: {
      fontWeight: "normal",
      fontFamily: "Poppins_300Light"
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 25,
    },
    infoTitle: {
      fontSize: 16,
      color: "#6C788E",
      fontFamily: "Poly_400Regular"
    },
    infoText: {
      fontSize: 14,
      fontFamily: "Poppins_600SemiBold"
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
      marginTop: 32,
      fontFamily: "Poppins_500Medium"
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFA50A',
    },
  });

  export default styles;