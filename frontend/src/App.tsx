import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import './App.css'
import type { Habit, HabitDraft } from './types/habit'
import { habits as initialHabits } from './data/habits'
import { AppLayout } from './components/AppLayout'
import { HabitsPage } from './pages/HabitsPage'
import { NewHabitPage } from './pages/NewHabitPage'
import { HabitDetailsPage } from './pages/HabitDetailsPage'
import { EditHabitPage } from './pages/EditHabitPage'
import { NotFoundPage } from './pages/NotFoundPage'

export function App() {
  const [habits, setHabits] = useState<Habit[]>(() =>
    initialHabits.map((habit) => ({ ...habit }))
  )

  function createHabit(draft: HabitDraft): string {
    const id = crypto.randomUUID()
    setHabits((current) => [...current, { ...draft, id }])
    return id
  }

  function updateHabit(id: string, draft: HabitDraft): void {
    setHabits((current) =>
      current.map((habit) => (habit.id === id ? { ...draft, id: habit.id } : habit))
    )
  }

  function deleteHabit(id: string): void {
    setHabits((current) => current.filter((habit) => habit.id !== id))
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/habits" replace />} />
        <Route path="/habits" element={<HabitsPage habits={habits} />} />
        <Route path="/habits/new" element={<NewHabitPage onCreate={createHabit} />} />
        <Route path="/habits/:id" element={<HabitDetailsPage habits={habits} onDelete={deleteHabit} />} />
        <Route path="/habits/:id/edit" element={<EditHabitPage habits={habits} onUpdate={updateHabit} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App