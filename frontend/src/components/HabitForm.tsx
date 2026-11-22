import { useState } from 'react'
import type { FormEvent } from 'react'
import type { HabitDraft } from '../types/habit'
import { useTags } from '../hooks/useTags'

type HabitFormProps = {
  initialValues: HabitDraft;
  onSave: (draft: HabitDraft) => void;
  onCancel: () => void;
}

export function HabitForm({ initialValues, onSave, onCancel }: HabitFormProps) {
  const [draft, setDraft] = useState<HabitDraft>(() => ({ ...initialValues }))
  const [error, setError] = useState('')

const { load, retry } = useTags()


const tags = load.status === 'success' ? load.data : []
const selectedTagExists = tags.some((tag) => tag.id === draft.category)
const hasUnknownTag = load.status === 'success' && tags.length > 0 && draft.category !== '' && !selectedTagExists
const canSave = load.status === 'success' && selectedTagExists

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!canSave) {
      setError('Дождитесь справочника и выберите доступный тег.')
      return
    }

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

        {load.status === 'loading' && (
          <p style={{ fontSize: '12px', color: '#666' }}>Загружаем теги…</p>
        )}

        {load.status === 'error' && (
          <div>
            <p style={{ fontSize: '12px', color: 'red' }}>{load.message}</p>
            <button type="button" onClick={retry}>Повторить</button>
          </div>
        )}

        {load.status === 'success' && load.data.length === 0 && (
          <div>
            <p style={{ fontSize: '12px', color: 'orange' }}>Тегов пока нет. Сохранение недоступно.</p>
            <button type="button" onClick={retry}>Повторить</button>
          </div>
        )}

        {hasUnknownTag && (
          <p style={{ fontSize: '12px', color: 'orange' }}>
            Ранее выбранный тег недоступен. Пожалуйста, выберите доступный вариант.
          </p>
        )}

        <select
          id="category"
          value={draft.category}
          onChange={(e) => {
            setDraft({ ...draft, category: e.target.value })
          }}
          disabled={load.status !== 'success' || tags.length === 0}
        >
          <option value="">Выберите категорию</option>
          {draft.category !== '' && !selectedTagExists && (
          <option value={draft.category} disabled>
          Текущий код: {draft.category} — выберите доступный тег
          </option>
          )}
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
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
        <button type="submit" disabled={!canSave}>Сохранить</button>
        <button type="button" onClick={onCancel}>Отмена</button>
      </div>
    </form>
  )
}