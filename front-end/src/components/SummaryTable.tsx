import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/Axios";
import { generationDatesFromYearBeginning } from "../utils/generation-dates-from-year-beginning";
import { HabitDay } from "./HabitDay";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const SummaryDate = generationDatesFromYearBeginning();

const minSummaryDateSize = 18 * 7; // 18 semanas
const amountOfDayToFill = minSummaryDateSize - SummaryDate.length;

type summary = Array<{
  id: string;
  date: string;
  amount: number;
  complete: number;
}>;

export function SummaryTable() {
  const [summary, setSummary] = useState<summary>([]);

  useEffect(() => {
    api.get("/summary").then((response) => {
      setSummary(response.data);
    });
  }, []);

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, index) => (
          <div
            key={index}
            className="text-zinc-400 text-xl h-10 w-10 flex items-center justify-center"
          >
            {weekDay}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {SummaryDate.map((date) => {
          const dayInSummary = summary.find((day) => {
            return dayjs(date).isSame(day.date, "day");
          });

          return (
            <HabitDay
              date={date}
              amount={dayInSummary?.amount}
              complete={dayInSummary?.complete}
              key={date.toString()}
            />
          );
        })}

        {amountOfDayToFill > 0 &&
          Array.from({ length: amountOfDayToFill }).map((_, i) => (
            <div
              key={i}
              className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
            ></div>
          ))}
      </div>
    </div>
  );
}
