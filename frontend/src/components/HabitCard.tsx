import { Link } from 'react-router'
import type { Habit } from '../types/habit'

// Описываем тип входных пропсов для компонента
type HabitCardProps = {
  habit: Habit
}

export function HabitCard({ habit }: HabitCardProps) {
  // Словарь для перевода технических значений frequency на понятный русский язык
  const frequencyLabel = {
    daily: 'Ежедневно',
    weekly: 'Еженедельно',
    monthly: 'Ежемесячно'
  }[habit.frequency]

  return (
    <article className="task-card">
      <h2>
        {/* При клике на заголовок переходим на страницу подробностей по уникальному ID */}
        <Link to={`/habits/${habit.id}`}>{habit.title}</Link>
      </h2>
      <p>{habit.description}</p>
      <p>Категория: <strong>{habit.category}</strong></p>
      <p>Регулярность: {frequencyLabel} | Серия: {habit.streak} / {habit.targetDays} дн.</p>
    </article>
  )
}