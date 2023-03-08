import { Alert, ScrollView, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { BackBotton } from "../components/BackBotton";
import dayjs from "dayjs";
import { ProgressBar } from "../components/ProgressBar";
import { CheckBox } from "../components/CheckBox";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { api } from "../lib/axios";
import { generationProgress } from "../utils/generationProgress";
import { HabitEnpty } from "../components/HabitEnpty";

interface Params {
  date: string;
}

interface DayInfoProps {
  completeHabit: string[];
  possibleHabit: {
    id: string;
    title: string;
  }[];
}

export function Habit() {
  const [loading, setLoading] = useState(true);
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null);
  const [completeHabits, setCompleteHabits] = useState<string[]>([]);

  const route = useRoute();
  const { date } = route.params as Params;

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

  const habitProgress = dayInfo?.possibleHabit.length
    ? generationProgress(dayInfo.possibleHabit.length, completeHabits.length)
    : 0;

  async function fetchHabits() {
    try {
      setLoading(true);

      const response = await api.get("day", { params: { date } });
      setDayInfo(response.data);
      setCompleteHabits(response.data.completeHabit);
      console.log(dayInfo?.possibleHabit);
    } catch (error) {
      console.error(error);
      Alert.alert("Ops...", "Não foi possivel carregar o status");
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleHabit(habitId: string) {
    if (completeHabits.includes(habitId)) {
      setCompleteHabits((prevState) =>
        prevState.filter((habit) => habit !== habitId)
      );
    } else {
      setCompleteHabits((prevStats) => [...prevStats, habitId]);
    }
  }

  useEffect(() => {
    fetchHabits();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <BackBotton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className=" text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={habitProgress} />

        <View className="mt-6">
          {dayInfo?.possibleHabit.length ? (
            dayInfo?.possibleHabit.map((habit) => (
              <CheckBox
                key={habit.id}
                title={habit.title}
                checked={completeHabits.includes(habit.id)}
                onPress={() => handleToggleHabit(habit.id)}
              />
            ))
          ) : (
            <HabitEnpty />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
