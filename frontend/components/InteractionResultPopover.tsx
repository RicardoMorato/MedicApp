import { Dimensions, StyleSheet, Pressable, View, Text, Image } from "react-native";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Portal } from "react-native-paper";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 40,
    left: 20,
  },
  headerText: {
    color: "#000",
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
    backgroundColor: "#000",
  },
  modalContainer: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    position: "absolute",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  modalContent: {
    padding: 40,
    paddingHorizontal: 6,
    gap: 12,
    backgroundColor: "#477FAB",
    borderRadius: 25,
    alignItems: "center",
    width: "90%",
    elevation: 4,
  },
  resultText: {
    fontSize: 60,
    fontFamily: "Poppins_300Light",
    borderRadius: 4,
    fontWeight: "600",
    textAlign: "center",
    fontStyle: "italic",

  },
  resultDescription: {
    fontSize: 20,
    fontFamily: "Poppins_300Light",
    textAlign: "center",
    color: Colors.light.whiteText,
  },
  drugName: {
    color: "#FFA50A",
  },
  drugNamePositive: {
    color: "#0BFF1B",
  },
  imageIcon: {
    width: 100,
    height: 100,
    color: "#0BFF1B",
  },
});

export default function InteractionResultPopover({
  result,
  drugA,
  drugB,
  closeCallback,
}: {
  result: boolean;
  drugA: string;
  drugB: string;
  closeCallback: () => void;
}) {
  const greenIcon = "@/assets/icons/checkIcon.png";
  const warningIcon = "@/assets/icons/warning.png";
  const icon = result ? require(warningIcon) : require(greenIcon);

  function closeModal(e: any, i: number) {
    if (i < 1) return;
    e.stopPropagation();
    closeCallback();
  }

  return (
    <Portal>
      <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={() => closeCallback()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
          <Text style={styles.headerText}>Verificar interações</Text>
        </Pressable>
        <View style={styles.headerDivider}></View>
        <Pressable
          onPress={(e: any) => closeModal(e, 1)}
          style={styles.modalContainer}
        >
          <Pressable
            onPress={(e: any) => closeModal(e, 0)}
            style={styles.modalContent}
          >
            <Text
              style={[
                styles.resultText,
                { color: result ? "#FFA50A" : "#0BFF1B" },
              ]}
            >
              {!result ? "Tudo certo!" : "Atenção!"}
            </Text>
            <Image source={icon} style={styles.imageIcon} />
            <View>
              {result ? (
                <Text style={styles.resultDescription}>
                  Os fármacos{" "}
                  <Text style={styles.drugName}>{drugA} </Text> e{" "}
                  <Text style={styles.drugName}>{drugB}</Text> possuem interação
                  entre si. Consulte seu médico antes de cogitar usá-los juntos.
                </Text>
              ) : (
                <Text style={styles.resultDescription}>
                  Não foram detectadas interações entre{" "}
                  <Text style={styles.drugNamePositive}>{drugA} </Text> e{" "}
                  <Text style={styles.drugNamePositive}>{drugB}</Text>. Esses
                  fármacos são compatíveis.
                </Text>
              )}
            </View>
          </Pressable>
        </Pressable>
      </View>
    </Portal>
  );
}
