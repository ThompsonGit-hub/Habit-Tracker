import { Outlet } from 'react-router'

const appTitle: string = 'Habit Tracker'

export function AppLayout() {
  return (
    <div className="app">
      <header>
        <h1>{appTitle}</h1>
        <p>Ежедневные привычки, отметки выполнения и личный прогресс. Данные хранятся только в памяти сессии. После обновления страницы состояние сбросится до демонстрационных записей</p>
      </header>

      <main className="container">
        <Outlet />
      </main>
    </div>
  )
}