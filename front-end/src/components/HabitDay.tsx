import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import { ProgressBar } from "./ProgressBar";
import dayjs from "dayjs";
import { HabitList } from "./HabitList";
import { useState } from "react";

interface HabitDayProps {
  date: Date;
  defaultComplete?: number;
  amount?: number;
}

export function HabitDay({
  amount = 0,
  defaultComplete = 0,
  date,
}: HabitDayProps) {
  const [complete, setComplete] = useState(defaultComplete);

  const completePercentage =
    amount > 0 ? Math.round((complete / amount) * 100) : 0;

  const dayAndMonth = dayjs(date).format("DD/MM");
  const dayOfWeek = dayjs(date).format("dddd");

  function handleCompletedChanged(complete: number) {
    setComplete(complete);
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx("w-10 h-10  border-2  rounded-lg transition-colors", {
          "bg-zinc-900 border-zinc-800": completePercentage === 0,
          "bg-violet-900 border-violet-700":
            completePercentage > 0 && completePercentage < 20,
          "bg-violet-800 border-violet-600":
            completePercentage >= 20 && completePercentage < 40,
          "bg-violet-700 border-violet-500":
            completePercentage >= 40 && completePercentage < 60,
          "bg-violet-600 border-violet-500":
            completePercentage >= 60 && completePercentage < 80,
          "bg-violet-500 border-violet-400":
            completePercentage >= 80 && completePercentage < 90,
          "bg-violet-400 border-violet-200": completePercentage >= 90,
        })}
      />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            {dayAndMonth}
          </span>
          <ProgressBar progress={completePercentage} />

          <HabitList date={date} onCompletedChange={handleCompletedChanged} />

          <Popover.Arrow height={10} width={18} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
