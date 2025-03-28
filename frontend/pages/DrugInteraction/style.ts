import { Dimensions, StyleSheet } from "react-native";
import colors from "@/global/colors";
import { Colors } from "@/constants/Colors";

const { height } = Dimensions.get("window");

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
    boxShadow: '1px 2px 6px rgba(0, 0, 0, 0.25)'
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
    alignItems: 'center',
  },
  
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: Colors.dark.text,
    textAlign: "center",
    marginBottom: 20,
  },
  dropdownWrapper: {
    backgroundColor: "#fff",
    color: "#777777",
    position: "relative",
    width: "100%",
    borderRadius: 5,
    paddingVertical: 15,
    boxShadow: '1px 2px 6px rgba(0, 0, 0, 0.25)'
  },
  dropdown: {
    backgroundColor: "#fff",
    maxHeight: height * 0.127,
    overflow: "scroll",
    position: "absolute",
    top: 35,
    width: "100%",
    zIndex: 2,
    borderRadius: 0,
  },
  disclaimer: {
    marginTop: 20,
    fontSize: 12.5,
    color: "#595959",
    textAlign: "justify",
    fontFamily: "Poppins_500Medium",
    width: "83%"
  },
  dropdownText: {
    color: "#595959",
  },
  sectionButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  }
});

export default styles;
