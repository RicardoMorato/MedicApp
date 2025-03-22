import { Dimensions, StyleSheet } from "react-native";
import colors from "@/global/colors";
import { Colors } from "@/constants/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "flex-start",
    padding: 24,
  },
  content: {
    justifyContent: "center",
    padding: 12,
    height: "100%",
  },
  interactionContainer: {
    backgroundColor: Colors.light.tint,
    padding: 24,
    borderRadius: 4,
    gap: 24,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: Colors.light.whiteText,
    marginBottom: 20,
  },
  dropdownWrapper: {
    backgroundColor: "#fff",
    color: "#777777",
    position: "relative",
  },
  dropdown: {
    backgroundColor: "#fff",
    maxHeight: 100,
    overflowY: "scroll",
  },
  dropdownText: {
    color: "#777777",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: Dimensions.get("window").height / 8,
  },
  confirmButton: {
    padding: 10,
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
