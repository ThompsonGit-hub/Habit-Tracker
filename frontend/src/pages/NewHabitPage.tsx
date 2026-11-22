import { useNavigate, Link } from 'react-router'
import { HabitForm } from '../components/HabitForm'
import type { HabitDraft } from '../types/habit'
type NewHabitPageProps = {
  onCreate: (draft: HabitDraft) => string;
}

const emptyHabit: HabitDraft = {
  title: '',
  description: '',
  category: '',
  frequency: 'daily',
  targetDays: 7,
  streak: 0,
  createdAt: new Date().toISOString(),
}

export function NewHabitPage({ onCreate }: NewHabitPageProps) {
  const navigate = useNavigate()

  function handleSave(draft: HabitDraft) {
    const id = onCreate(draft)
    navigate(`/habits/${id}`) 
  }

  function handleCancel() {
    navigate('/habits') 
  }

  return (
    <section>
      <h1>Создание новой привычки</h1>
      <Link to="/habits">Вернуться к списку</Link>
      
      <HabitForm
        initialValues={emptyHabit}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </section>
  )
}