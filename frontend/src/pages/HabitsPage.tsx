import { useState } from 'react'
import { Link } from 'react-router'
import { HabitCard } from '../components/HabitCard'
import { useTags } from '../hooks/useTags'
import type { Habit } from '../types/habit'

type HabitsPageProps = {
  habits: Habit[];
}

export function HabitsPage({ habits }: HabitsPageProps) {
  const { load } = useTags()
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const categories = Array.from(
    new Set(habits.map((habit) => habit.category).filter(Boolean))
  )

  const getCategoryLabel = (categoryId: string): string => {
    if (load.status === 'success') {
      return load.data.find((tag) => tag.id === categoryId)?.name ?? categoryId
    }
    if (load.status === 'loading') {
      return 'Загрузка…'
    }
    return categoryId
  }

  const visibleHabits = habits.filter((habit) => {
    if (categoryFilter === 'all') return true
    return habit.category === categoryFilter
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

  return (
    <section>
      <h1>Мои привычки</h1>
      <Link to="/habits/new">Добавить привычку</Link>

      <div style={{ margin: '15px 0', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <label htmlFor="category-filter">Фильтр:</label>
        <select
          id="category-filter"
          value={categoryFilter}
          onChange={(e) => {
            const value = e.target.value
            if (value === 'all' || categories.includes(value)) {
              setCategoryFilter(value)
            }
          }}
        >
          <option value="all">Все</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {getCategoryLabel(category)}
            </option>
          ))}
        </select>

        <button type="button" onClick={() => setCategoryFilter('all')}>
          Сбросить фильтр
        </button>

        {load.status === 'loading' && <span>Загрузка категорий…</span>}
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