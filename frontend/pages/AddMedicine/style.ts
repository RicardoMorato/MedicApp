import { StyleSheet } from "react-native";
import colors from "@/global/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    padding: 20,
    justifyContent: "center",
  }, 
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    position: "absolute",
    top: 40,
    left: 20,
  },
  headerText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
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
    backgroundColor: colors.background,
    marginRight: 5,
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

export default styles