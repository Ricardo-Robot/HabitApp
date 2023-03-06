import clsx from "clsx";
import dayjs from "dayjs";
import {
  TouchableOpacity,
  Dimensions,
  TouchableOpacityProps,
} from "react-native";

import { generationProgress } from "../utils/generationProgress";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE =
  Dimensions.get("screen").width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5);

interface props extends TouchableOpacityProps {
  amountHabits?: number;
  amountCompleted?: number;
  date: Date;
}

export function HabitDay({
  amountHabits = 0,
  amountCompleted = 0,
  date,
  ...rest
}: props) {
  const amountPercentage =
    amountHabits > 0 ? generationProgress(amountHabits, amountCompleted) : 0;
  const today = dayjs().startOf("day").toDate();
  const isCurrentDay = dayjs(date).isSame(today);

  return (
    <TouchableOpacity
      className={clsx("rounded-lg border-2 m-1", {
        ["bg-zinc-900 border-zinc-800"]: amountPercentage === 0,
        ["bg-violet-900 border-violet-700"]:
          amountPercentage > 0 && amountPercentage < 20,
        ["bg-violet-800 border-violet-600"]:
          amountPercentage >= 20 && amountPercentage < 40,
        ["bg-violet-700 border-violet-500"]:
          amountPercentage >= 40 && amountPercentage < 60,
        ["bg-violet-600 border-violet-500"]:
          amountPercentage >= 60 && amountPercentage < 80,
        ["bg-violet-500 border-violet-400"]:
          amountPercentage >= 80 && amountPercentage < 90,
        ["bg-violet-400 border-violet-200"]: amountPercentage >= 90,
        ["border-green-600 border-4"]: isCurrentDay,
      })}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.7}
      {...rest}
    />
  );
}
