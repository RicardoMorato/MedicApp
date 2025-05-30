import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 2,
    alignItems: "center",
    width: "90%",
    boxShadow: "1px 2px 6px rgba(0, 0, 0, 0.25)",
  },
  buttonText: {
    color: "#419DFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    width: "95%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 15,
    marginBottom: "20%",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: "#595959",
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
    paddingHorizontal: 20,
  },
  highlight: {
    color: "#477FAB",
    fontFamily: "Poppins_600SemiBold",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 40,
    left: 20,
  },
  headerText: {
    color: "#595959",
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
    backgroundColor: "#595959",
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
    paddingHorizontal: 30,
    borderRadius: 3,
    alignSelf: "center",
    justifyContent: "center",
    width: "90%",
    minHeight: height * 0.28,
    elevation: 3,
    gap: 12,
    alignItems: "center",
  },
  medicamentsImageContainer: {
    marginTop: 5,
    alignItems: "center",
  },

  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: Colors.dark.text,
    textAlign: "center",
    marginBottom: 20,
  },

  disclaimer: {
    marginTop: 20,
    fontSize: 12.5,
    color: "#595959",
    textAlign: "justify",
    fontFamily: "Poppins_500Medium",
    width: "83%",
  },
  dropdownText: {
    color: "#595959",
  },
  sectionButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    boxShadow: "1px 2px 6px rgba(0, 0, 0, 0.25)",
  },
  contentDropdown: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    paddingLeft: 10,
    fontSize: 14,
    color: "gray",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: Colors.light.text,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default styles;
