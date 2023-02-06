import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";

export function NewHabitForm() {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  function createNewHabit(event: FormEvent) {
    event.preventDefault();
    console.log(title, weekDays);
  }

  function handlerToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const newWeekdaysRemove = weekDays.filter((day) => day !== weekDay);
      setWeekDays(newWeekdaysRemove);
    } else {
      const newWeekdaysAdd = [...weekDays, weekDay];
      setWeekDays(newWeekdaysAdd);
    }
  }

  const AvalableWeekDays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sabado",
  ];

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight ">
        Qual Seu Comprometimento
      </label>
      <input
        type="text"
        id="title"
        placeholder="ex.: Exercitar, Beber Agua, ..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        autoFocus
        onChange={(event) => setTitle(event.target.value)}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Recorrencia
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {AvalableWeekDays.map((weekDays, index) => (
          <Checkbox.Root
            key={weekDays}
            className="flex items-center gap-3 group"
            onCheckedChange={() => handlerToggleWeekDay(index)}
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span className="text-white leading-tight">{weekDays}</span>
          </Checkbox.Root>
        ))}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}
