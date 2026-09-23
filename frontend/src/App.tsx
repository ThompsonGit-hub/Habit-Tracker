import './App.css'

const appTitle: string = 'Habit Tracker'

export default function App() {
  return (
    <div className="app">
      <header>
        <h1>{appTitle}</h1>
        <p>Ежедневные привычки, отметки выполнения и личный прогресс.</p>
      </header>

      <section>
        <h2>Мои привычки</h2>
        <p>Здесь появится список ваших привычек и отметки за день.</p>
      </section>
    </div>
  )
}