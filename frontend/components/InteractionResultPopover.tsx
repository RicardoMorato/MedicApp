import { StyleSheet, Pressable, View, Text, Image, Animated, Easing, Touchable, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import { Portal } from "react-native-paper";
import closeIcon from "@/assets/icons/closeIcon.png";
import { useState } from "react";
import { useNavigation } from "expo-router";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999, 
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 40,
    left: 20,
  },
  headerText: {
    color: Colors.text.primary,
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
    backgroundColor: Colors.divider.primary,
  },
  modalContainer: {
    backgroundColor: Colors.overlay.background,
    position: "absolute",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  modalContent: {
    padding: 30,
    paddingHorizontal: 6,
    gap: 5,
    backgroundColor: Colors.modal.background,
    borderRadius: 25,
    alignItems: "center",
    width: "90%",
    boxShadow: Colors.shadow.primary,
  },
  resultText: {
    fontSize: 60,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
    fontStyle: "italic",
  },
  resultDescription: {
    fontSize: 20,
    fontFamily: "Poppins_300Light",
    textAlign: "center",
    color: Colors.text.white,
  },
  drugName: {
    color: Colors.text.warning,
  },
  drugNamePositive: {
    color: Colors.text.success,
  },
  imageIcon: {
    width: 127,
    height: 127,
    color: Colors.text.success,
  },
  LearnMore: {
    fontSize: 20,
    color: Colors.text.warning,
    textDecorationColor: Colors.text.warning,
    textDecorationLine: "underline",
    fontFamily: "Poppins_500Medium",
  }
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

  const [fadeAnim] = useState(new Animated.Value(0))
  const [backgroundFadeAnim] = useState(new Animated.Value(0))
  
  const navigation = useNavigation<any>();

  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 200,
    useNativeDriver: true,
    easing: Easing.inOut(Easing.ease),
  }).start()

  Animated.timing(backgroundFadeAnim, {
    toValue: 0.2,
    duration: 500,
    useNativeDriver: true,
    easing: Easing.inOut(Easing.ease),
  }).start()


  const handleClose = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start(() => closeCallback())

    Animated.timing(backgroundFadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  };

  return (
    <Portal>
      <Animated.View
        style={[
          styles.modalContainer,
          { backgroundColor: backgroundFadeAnim.interpolate({
              inputRange: [0, 0.8],
              outputRange: ["rgba(0, 0, 0, 0)", Colors.overlay.fade],
            }),
          },
        ]}
      />
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Pressable
              style={{
                position: "absolute",
                top: 10,
                right: 10,
              }}
              onPress={handleClose}
            >
              <Image source={closeIcon} />
            </Pressable>
            <Text
              style={[
                styles.resultText,
                { color: result ? Colors.text.warning : Colors.text.success },
              ]}
            >
              {!result ? "Tudo certo!" : "Atenção!"}
            </Text>
            <Image source={icon} style={styles.imageIcon} />
            <View>
              {result ? (
                <Text style={styles.resultDescription}>
                  Os medicamentos{" "}
                  <Text style={styles.drugName}>{drugA} </Text> e{" "}
                  <Text style={styles.drugName}>{drugB}</Text> possuem interação
                  entre si. Consulte seu médico antes de cogitar usá-los juntos.
                </Text>
              ) : (
                <Text style={styles.resultDescription}>
                  Não foram detectadas interações entre{" "}
                  <Text style={styles.drugNamePositive}>{drugA} </Text> e{" "}
                  <Text style={styles.drugNamePositive}>{drugB}</Text>. Esses
                  medicamentos são compatíveis.
                </Text>
              )}
            </View>
          </View>
          {result && (
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity onPress={() => navigation.navigate('LearnMore')}>
              <Text style={styles.LearnMore}>Saiba Mais</Text>
              </TouchableOpacity>
            </View>)}
        </View>
      </Animated.View>
    </Portal>
  );
}
