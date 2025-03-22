import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  notiIcon: {
    paddingBottom: 10,
    alignItems: "flex-end",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  home: {},
  logo: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#333",
  },
  horizontalLine: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export default styles;
