import { useParams, useNavigate, Link } from 'react-router'
import { HabitForm } from '../components/HabitForm'
import type { Habit, HabitDraft } from '../types/habit'

type EditHabitPageProps = {
  habits: Habit[];
  onUpdate: (id: string, draft: HabitDraft) => void;
}

export function EditHabitPage({ habits, onUpdate }: EditHabitPageProps) {
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

  const initialValues: HabitDraft = {
    title: habit.title,
    description: habit.description,
    category: habit.category,
    frequency: habit.frequency,
    targetDays: habit.targetDays,
    streak: habit.streak,
    createdAt: habit.createdAt,
  }

  function handleSave(draft: HabitDraft) {
    if (!habit) return;
    onUpdate(habit.id, draft)
    navigate(`/habits/${habit.id}`) 
  }

  function handleCancel() {
    if (!habit) return;
    navigate(`/habits/${habit.id}`) 
  }

  return (
    <section>
      <h1>Редактирование привычки: {habit.title}</h1>
      <Link to={`/habits/${habit.id}`}>Назад к карточке</Link>

      <HabitForm
        key={habit.id}
        initialValues={initialValues}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </section>
  )
}