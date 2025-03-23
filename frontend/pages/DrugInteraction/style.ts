import { Dimensions, StyleSheet } from "react-native";
import colors from "@/global/colors";
import { Colors } from "@/constants/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.bg,
    flex: 1,
    justifyContent: "flex-start",
  },
  content: {
    height: "100%",
    justifyContent: "center",
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
    backgroundColor: Colors.dark.lightBg,
    padding: 24,
    paddingVertical: 64,
    borderRadius: 24,
    gap: 24,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    transform: [{ translateY: -50 }],
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
    width: 236,
    borderRadius: 0,
  },
  dropdown: {
    backgroundColor: "#fff",
    maxHeight: 100,
    overflowY: "scroll",
    position: "absolute",
    top: 40,
    width: 236,
    zIndex: 1000,
  },
  dropdownText: {
    color: "#777777",
  },
  confirmButton: {
    padding: 10,
    borderRadius: 4,
    backgroundColor: colors.primary,
    color: Colors.light.whiteText,
    fontFamily: "Poppins_700Bold",
    flexDirection: "row",
    gap: 8,
  },
  confirmText: {
    color: Colors.light.whiteText,
    fontWeight: 600,
  },
});

export default styles;
