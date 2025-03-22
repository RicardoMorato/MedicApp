import { Colors } from "@/constants/Colors";
import { View, Text } from "react-native";

export default function InteractionResultPopover({
  result,
  drugA,
  drugB,
}: {
  result: boolean;
  drugA: string;
  drugB: string;
}) {
  return (
    <View
      style={{
        padding: 16,
        gap: 12,
        backgroundColor: Colors.light.tint,
        marginBottom: 12,
        borderRadius: 12,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: Colors.light.whiteText,
          backgroundColor: result ? Colors.light.atention : Colors.light.green,
          fontSize: 20,
          fontFamily: "Poppins_700Bold",
          borderRadius: 4,
          padding: 8,
          textAlign: "center",
        }}
      >
        {!result ? "Tudo certo" : "Atenção!"}
      </Text>
      <Text style={{ color: Colors.light.whiteText }}>
        {!result
          ? ` Não foram detectadas interações entre ${drugA} e ${drugB}. Esses medicamentos são compatíveis.`
          : ` Os medicamentos ${drugA} e ${drugB} possuem interação severa. Consulte seu médico antes de usá-los juntos.`}
      </Text>
    </View>
  );
}
