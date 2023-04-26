import * as Checkbox from '@radix-ui/react-checkbox';
import { Trash } from 'phosphor-react';
import { useEffect, useState } from 'react';
import api from '../lib/axios';

interface HabitLisProps {
  date: Date
  onCompletedChanged: (completed: number) => void
}

interface HabitsInfo {
  possibleHabits: {
    id: string;
    title: string;
    created_at: string
  }[]
  completedHabits: string[]
}

export function HabitsListForDelete({ date, onCompletedChanged }: HabitLisProps) {

  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()
  
  useEffect(() => {
    api.get('day', {
      params:{
        date: date.toISOString()
      }
    }).then(response => {
      setHabitsInfo(response.data)
    })
  },[])

  async function handleToggleHabit(habitId: string) {
    const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId)
  
    await api.delete(`/habits/${habitId}`)


    let completedHabits: string[] = []

    if(isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId]
    }

    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits
    })

    onCompletedChanged(completedHabits.length)
  }

  return (
    <div className='mt-6 flex flex-col gap-3'>
      {habitsInfo?.possibleHabits.map(habit => {
        return (
          <Checkbox.Root
            key={habit.id}
            onCheckedChange={() => handleToggleHabit(habit.id)}
            checked={habitsInfo.completedHabits.includes(habit.id)}
            className='flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed'
          >
            <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-rose-500 group-data-[state=checked]:border-green-50 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-backgroundNlw'>
              <Checkbox.Indicator>
                <Trash size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
              {habit.title}
            </span>
          </Checkbox.Root>
        )
      })}
      
    </div>
  )
}

