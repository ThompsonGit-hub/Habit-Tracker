import { Link } from 'react-router'
import type { Habit } from '../types/habit'
import { useTags } from '../hooks/useTags'

type HabitCardProps = {
  habit: Habit
}

export function HabitCard({ habit }: HabitCardProps) {
  const { load } = useTags()

  const categoryName =
  load.status === 'loading'
    ? 'Загрузка…'
    : load.status === 'success'
      ? load.data.find((tag) => tag.id === habit.category)?.name ?? habit.category
      : habit.category

  const frequencyLabel = {
    daily: 'Ежедневно',
    weekly: 'Еженедельно',
    monthly: 'Ежемесячно'
  }[habit.frequency]

  return (
    <article className="task-card">
      <h2>
        <Link to={`/habits/${habit.id}`}>{habit.title}</Link>
      </h2>
      <p>{habit.description}</p>
      <p>Категория: <strong>{categoryName}</strong></p>
      <p>Регулярность: {frequencyLabel} | Серия: {habit.streak} / {habit.targetDays} дн.</p>
    </article>
  )
}