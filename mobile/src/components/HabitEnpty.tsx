import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";

export function HabitEnpty() {
  const { navigate } = useNavigation();

  return (
    <Text className="text-zinc-400 text-base">
      Você ainda não tem nenhum Habito{" "}
      <Text
        className="text-violet-400 text-base underline active:text-violet-600"
        onPress={() => navigate("newHabit")}
      >
        Cria um novo habito
      </Text>
    </Text>
  );
}
