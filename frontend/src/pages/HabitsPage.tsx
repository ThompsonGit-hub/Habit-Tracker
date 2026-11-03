import { useState } from 'react'
import { Link } from 'react-router'
import { HabitCard } from '../components/HabitCard'
import type { Habit } from '../types/habit'

type HabitsPageProps = {
  habits: Habit[];
}

export function HabitsPage({ habits }: HabitsPageProps) {
  const [frequencyFilter, setFrequencyFilter] = useState<string>('all')

  const visibleHabits = habits.filter((habit) => {
    if (frequencyFilter === 'all') return true
    return habit.frequency === frequencyFilter
  })


  if (habits.length === 0) {
    return (
      <section>
        <h1>Мои привычки</h1>
        <Link to="/habits/new">Добавить привычку</Link>
        <p>Привычек пока нет.</p>
      </section>
    )
  }

  // Если записи есть
  return (
    <section>
      <h1>Мои привычки</h1>
      <Link to="/habits/new">Добавить привычку</Link>

      <div style={{ margin: '15px 0', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <label htmlFor="frequency-filter">Фильтр:</label>
        <select
          id="frequency-filter"
          value={frequencyFilter}
          onChange={(e) => {
            const value = e.target.value
            if (value === 'all' || value === 'daily' || value === 'weekly' || value === 'monthly') {
              setFrequencyFilter(value)
            }
          }}
        >
          <option value="all">Все</option>
          <option value="daily">Ежедневно</option>
          <option value="weekly">Еженедельно</option>
          <option value="monthly">Ежемесячно</option>
        </select>

        <button type="button" onClick={() => setFrequencyFilter('all')}>
          Сбросить фильтр
        </button>
      </div>

      {visibleHabits.length === 0 ? (
        <p>По вашему запросу ничего не найдено.</p>
      ) : (
        <div className="task-list">
          {visibleHabits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} />
          ))}
        </div>
      )}
    </section>
  )
}