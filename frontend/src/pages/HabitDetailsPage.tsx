import { Link, useParams } from 'react-router'
import { habits } from '../data/habits'

export function HabitDetailsPage() {
  const { id } = useParams()
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

  // Словарь
  const frequencyLabel = {
    daily: 'Ежедневно',
    weekly: 'Еженедельно',
    monthly: 'Ежемесячно'
  }[habit.frequency]
//Перевожу в привычный формат дату создания привычки, чтобы отображать её в формате ДД.ММ.ГГГГ
  const formattedDate = new Date(habit.createdAt).toLocaleDateString('ru-RU')
  
  return (
    <section>
      <h1>{habit.title}</h1>
      <p>Описание: {habit.description}</p>
      <p>Категория: {habit.category}</p>
      <p>Регулярность: {frequencyLabel}</p>
      <p>Текущая серия: {habit.streak} дней</p>
      <p>Цель: {habit.targetDays} дней подряд</p>
      <p>Дата создания: {formattedDate}</p>

      <br />
      <Link to="/habits">Вернуться к списку привычек</Link>
    </section>
  )
}