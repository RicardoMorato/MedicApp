import { Colors } from "@/constants/Colors";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Portal, Provider } from "react-native-paper";
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
  const greenIcon = "@/assets/icons/greenFlag.png";
  const warningIcon = "@/assets/icons/warning.png";
  const icon = result ? require(warningIcon) : require(greenIcon);

  function closeModal(e: any, i: number) {
    if (i < 1) return;

    e.stopPropagation();
    closeCallback();
  }
  return (
    <Portal>
      <TouchableOpacity
        onPress={(e: any) => closeModal(e, 1)}
        style={{
          paddingVertical: 50,
          gap: 12,
          backgroundColor: Colors.dark.background,
          height: "100%",
          borderRadius: 12,
          alignItems: "center",
          position: "fixed",
          zIndex: 10,
          top: 0,
          justifyContent: "center",
          cursor: "pointer",
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={(e: any) => closeModal(e, 0)}
          style={{
            padding: 50,
            paddingHorizontal: 12,
            gap: 12,
            backgroundColor: Colors.dark.lightBg,
            borderRadius: 12,
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text
            style={{
              color: result ? Colors.light.atention : Colors.light.green,
              fontSize: 60,
              fontFamily: "Poppins_300Light",
              borderRadius: 4,
              fontWeight: 600,
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            {!result ? "Tudo certo" : "Atenção!"}
          </Text>
          <Image source={icon} style={{ width: 100, height: 100 }} />

          <View>
            {result ? (
              <Text
                style={{
                  color: Colors.light.whiteText,
                  fontSize: 20,
                  fontFamily: "Poppins_300Light",
                  textAlign: "center",
                  wordWrap: "break-all",
                }}
              >
                Os medicamentos{" "}
                <Text style={{ color: Colors.dark.warning }}>{drugA} </Text> e{" "}
                <Text style={{ color: Colors.dark.warning }}>{drugB}</Text>.
                possuem interação severa. Consulte seu médico antes de usá-los
                juntos.
              </Text>
            ) : (
              <Text
                style={{
                  color: Colors.light.whiteText,
                  fontSize: 20,
                  fontFamily: "Poppins_300Light",
                  textAlign: "center",
                  wordWrap: "break-all",
                }}
              >
                Não foram detectadas interações entre{" "}
                <Text style={{ color: Colors.dark.green }}>{drugA} </Text> e{" "}
                <Text style={{ color: Colors.dark.green }}>{drugB}</Text>. Esses
                medicamentos são compatíveis.
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Portal>
  );
}
