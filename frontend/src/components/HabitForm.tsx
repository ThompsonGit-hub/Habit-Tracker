import { useState } from 'react'
import type { FormEvent } from 'react'
import type { HabitCategory, HabitDraft } from '../types/habit'

type HabitFormProps = {
  initialValues: HabitDraft;
  onSave: (draft: HabitDraft) => void;
  onCancel: () => void;
}

export function HabitForm({ initialValues, onSave, onCancel }: HabitFormProps) {
  const [draft, setDraft] = useState<HabitDraft>(() => ({ ...initialValues }))
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const title = draft.title.trim()

    if (title.length < 3 || title.length > 100) {
      setError('Название должно содержать от 3 до 100 символов.')
      return
    }

    if (!draft.description.trim()) {
      setError('Укажите описание привычки.')
      return
    }

    if (draft.targetDays < 1 || draft.targetDays > 365) {
      setError('Цель должна составлять от 1 до 365 дней подряд.')
      return
    }

    setError('')
    onSave({ ...draft, title })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <label htmlFor="title">Название</label>
        <input
          id="title"
          type="text"
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Описание</label>
        <textarea
          id="description"
          value={draft.description}
          onChange={(e) => setDraft({ ...draft, description: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="category">Категория</label>
        <select
            id="category"
            value={draft.category}
            onChange={(e) => {
            const cat = e.target.value as HabitCategory
            setDraft({ ...draft, category: cat })
            }}
        >
            <option value="Здоровье">Здоровье</option>
            <option value="Спорт">Спорт</option>
            <option value="Учёба">Учёба</option>
            <option value="Продуктивность">Продуктивность</option>
            <option value="Развитие">Развитие</option>
        </select>
        </div>

      <div>
        <label htmlFor="frequency">Регулярность</label>
        <select
          id="frequency"
          value={draft.frequency}
          onChange={(e) => {
            const freq = e.target.value
            if (freq === 'daily' || freq === 'weekly' || freq === 'monthly') {
              setDraft({ ...draft, frequency: freq })
            }
          }}
        >
          <option value="daily">Ежедневно</option>
          <option value="weekly">Еженедельно</option>
          <option value="monthly">Ежемесячно</option>
        </select>
      </div>

      <div>
        <label htmlFor="targetDays">Цель (дней)</label>
        <input
          id="targetDays"
          type="number"
          value={draft.targetDays}
          onChange={(e) => setDraft({ ...draft, targetDays: Number(e.target.value) })}
          required
        />
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button type="submit">Сохранить</button>
        <button type="button" onClick={onCancel}>Отмена</button>
      </div>
    </form>
  )
}