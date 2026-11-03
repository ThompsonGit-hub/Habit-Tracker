import { Link, useParams, useNavigate } from 'react-router'
import type { Habit } from '../types/habit'

type HabitDetailsPageProps = {
  habits: Habit[];
  onDelete: (id: string) => void;
}

export function HabitDetailsPage({ habits, onDelete }: HabitDetailsPageProps) {
  const { id } = useParams()
  const navigate = useNavigate()

  const habit = habits.find((item) => item.id === id)


  if (!habit) {
    return (
      <section>
        <h1>Привычка не найдена</h1>
        <p>К сожалению, привычки с таким адресом не существует.</p>
        <Link to="/habits">Вернуться к списку привычек</Link>
      </section>
    )
  }

  const frequencyLabel = {
    daily: 'Ежедневно',
    weekly: 'Еженедельно',
    monthly: 'Ежемесячно'
  }[habit.frequency]

  const formattedDate = new Date(habit.createdAt).toLocaleDateString('ru-RU')

  function handleDelete() {
    if (!habit) return;
    if (window.confirm(`Удалить привычку «${habit.title}»?`)) {
      onDelete(habit.id)
      navigate('/habits', { replace: true })
    }
  }

  return (
    <section>
      <h1>{habit.title}</h1>
      <p>Описание: {habit.description}</p>
      <p>Категория: {habit.category}</p>
      <p>Регулярность: {frequencyLabel}</p>
      <p>Текущая серия: {habit.streak} дней</p>
      <p>Цель: {habit.targetDays} дней подряд</p>
      <p>Дата создания: {formattedDate}</p>

      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <Link to="/habits">Вернуться к списку</Link>
        <Link to={`/habits/${habit.id}/edit`}>Редактировать</Link>
        <button type="button" onClick={handleDelete} style={{ color: 'red' }}>
          Удалить
        </button>
      </div>
    </section>
  )
}