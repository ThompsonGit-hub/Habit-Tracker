import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import './App.css'
import { AppLayout } from './components/AppLayout'
import { HabitsPage } from './pages/HabitsPage'
import { HabitDetailsPage } from './pages/HabitDetailsPage'
import { NewHabitPage } from './pages/NewHabitPage'
import { NotFoundPage } from './pages/NotFoundPage'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/habits" replace />} />
          <Route path="/habits" element={<HabitsPage />} />
          <Route path="/habits/new" element={<NewHabitPage />} />
          <Route path="/habits/:id" element={<HabitDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App