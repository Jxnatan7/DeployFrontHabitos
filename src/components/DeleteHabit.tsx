import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./mobileDesign.css"
import { HabitsListForDelete } from "./HabitListForDelete";


interface HabitDayProps {
  date: Date
  defaultCompleted?: number
  amount?: number
}

export default function DeleteHabitForm({ defaultCompleted = 0, amount = 0, date }: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultCompleted)

  async function deleteHabits(event: FormEvent) {
    event.preventDefault()

    // await api.delete(`/habits/${habitId}`)

    toast.success("Hábito deletado com sucesso!")
  }

  function handleDeleteChanged(completed: number) {
    setCompleted(completed)
  }

  // async function mostrarListaDeHabitos() {
  //   await api.get("day", {
  //     data: 
  //   })
  // }

  return (
    <form onSubmit={deleteHabits} className="w-full flex flex-col mt-6 newHabitFormMobile">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual hábito você deseja excluir?
      </label>

      {
        
      }
      <HabitsListForDelete date={date} onCompletedChanged={handleDeleteChanged} />
      
    </form>
  )
}