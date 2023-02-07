import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../lib/Axios";

interface HabitDayProp {
  date: Date;
  onCompletedChange: (complete: number) => void;
}

interface habitInfo {
  possibleHabit: Array<{
    id: string;
    title: string;
    created_at: string;
  }>;
  completeHabit: string[];
}

export function HabitList({ date, onCompletedChange }: HabitDayProp) {
  const [habitInfo, setHabitInfo] = useState<habitInfo>();

  useEffect(() => {
    api
      .get("day", {
        params: {
          date: date.toISOString(),
        },
      })
      .then((response) => {
        setHabitInfo(response.data);
      });
  }, []);

  async function handleToggleHabit(habitId: string) {
    const isHabitAlreadyComplete = habitInfo!.completeHabit.includes(habitId);
    await api.patch(`habits/${habitId}/toggle`);

    let completeHabit: string[] = [];

    if (isHabitAlreadyComplete) {
      completeHabit = habitInfo!.completeHabit.filter((id) => id !== habitId);
    } else {
      completeHabit = [...habitInfo!.completeHabit, habitId];
    }

    setHabitInfo({
      possibleHabit: habitInfo!.possibleHabit,
      completeHabit,
    });

    onCompletedChange(completeHabit.length);
  }

  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());
  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitInfo?.possibleHabit.map((habit) => {
        return (
          <Checkbox.Root
            key={habit.id}
            onCheckedChange={() => handleToggleHabit(habit.id)}
            checked={habitInfo.completeHabit.includes(habit.id)}
            disabled={isDateInPast}
            className="flex items-center gap-3 group"
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span className="group-data-[state=checked]:line-through text-xl font-semibold text-white leading-tight">
              {habit.title}
            </span>
          </Checkbox.Root>
        );
      })}
    </div>
  );
}
