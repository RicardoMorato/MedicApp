import { Dimensions, StyleSheet } from "react-native";
import colors from "@/global/colors";
import { Colors } from "@/constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  button: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 2,
    alignItems: "center",
    width: "90%",
    elevation: 3,
  },
  buttonText: {
    color: "#419DFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    width: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 12
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: "#595959",
    textAlign: "center"
  },
  highlight: {
    color: "#477FAB",
    fontWeight: "bold",
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
  headerDivider: {
    position: "absolute",
    top: 75,
    left: 0,
    right: 0,
    width: "100%",
    height: 2,
    backgroundColor: colors.textPrimary,
  },
  navButton: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 64,
    borderBottomWidth: 2,
    borderBottomColor: Colors.dark.tint,
  },
  interactionContainer: {
    backgroundColor: "#477FAB",
    padding: 20,
    borderRadius: 3,
    alignSelf: "center",
    width: "90%",
    height: "40%",
    elevation: 3,
    gap: 12
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: Colors.dark.text,
    textAlign: "center",
  },
  dropdownWrapper: {
    backgroundColor: "#fff",
    color: "#777777",
    position: "relative",
    width: "100%",
    borderRadius: 0,
  },
  dropdown: {
    backgroundColor: "#fff",
    maxHeight: 100,
    overflowY: "scroll",
    position: "absolute",
    top: 35,
    width: "100%",
    zIndex: 1000,
    borderRadius: 0,
  },
   disclaimer: {
    marginTop: 20,
    fontSize: 16,
    color: "#595959",
    textAlign: "center",
  },
  dropdownText: {
    color: "#777777",
  },
  confirmButton: {
    padding: 16,
    borderRadius: 4,
    backgroundColor: colors.primary,
    color: Colors.light.whiteText,
    fontFamily: "Poppins_700Bold",
  },
  confirmText: {
    color: Colors.light.whiteText,
    fontWeight: 600,
  },
});

export default styles;
