import { Link } from 'react-router'
import { HabitCard } from '../components/HabitCard'
import { habits } from '../data/habits'

export function HabitsPage() {
  // 1. Если привычек нет вообще (длина массива равна 0)
  if (habits.length === 0) {
    return (
      <section>
        <h1>Мои привычки</h1>
        <Link to="/habits/new">Добавить привычку</Link>
        <p>Привычек пока нет.</p>
      </section>
    )
  }

  // 2. Иначе (если привычки есть) — показываем их
  return (
    <section>
      <h1>Мои привычки</h1>
      <Link to="/habits/new">Добавить привычку</Link>

      <div className="task-list">
        {habits.map((habit) => (
          <HabitCard key={habit.id} habit={habit} />
        ))}
      </div>
    </section>
  )
}