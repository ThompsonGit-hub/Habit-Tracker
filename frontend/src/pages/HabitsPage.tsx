import { Link } from 'react-router'
import { HabitCard } from '../components/HabitCard'
import { habits } from '../data/habits'

export function HabitsPage() {
  //Если привычек нет вообще
  if (habits.length === 0) {
    return (
      <section>
        <h1>Мои привычки</h1>
        <Link to="/habits/new">Добавить привычку</Link>
        <p>Привычек пока нет.</p>
      </section>
    )
  }

  //если привычки есть
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