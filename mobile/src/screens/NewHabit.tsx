import { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { BackBotton } from "../components/BackBotton";
import { CheckBox } from "../components/CheckBox";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

const availableWeekDays = [
  "Domingo",
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
  "Sábado",
];

export function NewHabit() {
  const [weekDays, setWeekDays] = useState<number[]>([]);

  function handleWeekDays(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays((prevState) =>
        prevState.filter((weekDay) => weekDay !== weekDayIndex)
      );
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex]);
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackBotton />
        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar Habito
        </Text>
        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprometimento
        </Text>
        <TextInput
          placeholder="Exercitar, Ler, ..."
          placeholderTextColor={colors.zinc[400]}
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white focus:border-2 focus:border-green-600"
        />
        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          Qual a recorrencia
        </Text>
        {availableWeekDays.map((weekDay, index) => (
          <CheckBox
            title={weekDay}
            key={weekDay}
            onPress={() => handleWeekDays(index)}
            checked={weekDays.includes(index)}
          />
        ))}
        <TouchableOpacity
          activeOpacity={0.7}
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
        >
          <Feather name="check" size={20} color={colors.white} />
          <Text className="font-semibold text-base text-white ml-2">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
