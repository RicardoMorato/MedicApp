import { StyleSheet } from "react-native";
import colors from "@/global/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 0,
    justifyContent: "center",
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
  form: {
    backgroundColor: "#3F6684",
    padding: 20,
    borderRadius: 10,
    alignSelf: "center",
    width: "90%",
  },
  input: {
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 5,
    marginBottom: 15,
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
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.background,
  },
});

export default styles;