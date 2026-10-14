import { Link } from 'react-router'

export function NewHabitPage() {
  return (
    <section>
      <h1>Создание новой привычки</h1>
      <p>Здесь в следующей лабораторной будет форма с полями ввода.</p>
      <Link to="/habits">Вернуться к списку</Link>
    </section>
  )
}