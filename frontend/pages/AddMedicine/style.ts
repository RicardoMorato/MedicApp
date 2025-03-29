import { StyleSheet, Dimensions} from "react-native";
import colors from "@/global/colors";


const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    gap: 26,
  }, 
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 40,
    left: 20,
  },
  headerText: {
    color: colors.textPrimary,
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
  headerDivider: {
    position: "absolute",
    top: 75,
    left: 0,
    right: 0,
    width: "100%",
    height: 2,
    backgroundColor: colors.textPrimary,
  },
  subtitle: {
    fontSize: 18,
    color: "#595959",
    marginBottom: 30,
    paddingHorizontal: 20,
    fontFamily: "Poppins_500Medium",
    textAlign: "justify",
  },
  form: {
    backgroundColor: "#477FAB",
    paddingTop: 40,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 40,
    borderRadius: 15,
    alignSelf: "center",
    width: "80%",
    gap: 16,
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
    boxShadow: '2px 3px 4px 2px rgba(0, 0, 0, 0.2)',
    width: "85%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#419DFF",
  },
});

export default styles;