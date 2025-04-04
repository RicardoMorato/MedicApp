import { StyleSheet} from "react-native";
import colors from "@/global/colors";
import { Colors } from "@/constants/Colors";



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    alignItems: "center",
    gap: 20,
  }, 

  headerText: {
    color: Colors.light.backgroundGreyBlack,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },  
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 18,
    color: Colors.light.backgroundGreyBlack,
    letterSpacing: 1,
    minWidth: "65%",
    maxWidth: "80%",
    marginBottom: 30,
    fontFamily: "Poppins_500Medium",
    textAlign: "justify",
  },
  form: {
    backgroundColor: "#477FAB",
    paddingTop: 20,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 40,
    borderRadius: 5,
    alignSelf: "center",
    width: "80%",
    gap: 16,
  },
  headerForm: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 8,
    alignItems: "center",
    gap: 5,
  },
  titleForm: {
    color: Colors.light.whiteText, 
    fontSize: 18,
    fontFamily: 'Poppins_500Medium',
  },
  input: {
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 5,
    color: colors.textPrimary,
  },
  label: {
    color: colors.background,
    fontSize: 16,
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.background,
    marginRight: 5,
  },
  radioSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    marginRight: 5,
    borderColor: colors.background,
    borderWidth: 3,
  },
  radioText: {
    color: colors.background,
  },
  button: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 5,
    boxShadow: Colors.light.boxShadow,
    width: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: .5,
    borderColor: "#419DFF",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#477FAB",
  },
});

export default styles;