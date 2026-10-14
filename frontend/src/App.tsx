import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import './App.css'
import { HabitsPage } from './pages/HabitsPage'
import { HabitDetailsPage } from './pages/HabitDetailsPage'
import { NewHabitPage } from './pages/NewHabitPage'
import { NotFoundPage } from './pages/NotFoundPage'

const appTitle: string = 'Habit Tracker'

export function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {/* Шапка сайта — отображается ВСЕГДА на всех страницах */}
        <header>
          <h1>{appTitle}</h1>
          <p>Ежедневные привычки, отметки выполнения и личный прогресс.</p>
        </header>

        {/* Контент, который меняется в зависимости от адреса (URL) */}
        <main className="container">
          <Routes>
            {/* Автоматический перенаправитель с главными адреса / на /habits */}
            <Route path="/" element={<Navigate to="/habits" replace />} />
            
            {/* Страница списка всех привычек */}
            <Route path="/habits" element={<HabitsPage />} />
            
            {/* Страница создания новой привычки */}
            <Route path="/habits/new" element={<NewHabitPage />} />
            
            {/* Страница подробностей конкретной привычки (по :id) */}
            <Route path="/habits/:id" element={<HabitDetailsPage />} />
            
            {/* Если ввели несуществующий адрес (404) */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App