import type { Habit } from '../types/habit'

export const habits: Habit[] = [
  {
    id: 'h1',
    title: 'Утренняя зарядка',
    description: 'Делать 15 минут разминку и растяжку сразу после пробуждения.',
    category: 'Спорт',
    frequency: 'daily',
    targetDays: 30,
    streak: 12,
    createdAt: '2026-09-01'
  },
  {
    id: 'h2',
    title: 'Чтение книг',
    description: 'Читать минимум 20 страниц художественной или научной литературы.',
    category: 'Развитие',
    frequency: 'daily',
    targetDays: 21,
    streak: 5,
    createdAt: '2026-09-05'
  },
  {
    id: 'h3',
    title: 'Водный баланс (2л)',
    description: 'Поддерживать дневную норму гидратации, выпивать 8 стаканов воды.',
    category: 'Здоровье',
    frequency: 'daily',
    targetDays: 30,
    streak: 18,
    createdAt: '2026-09-01'
  },
  {
    id: 'h4',
    title: 'Изучение английского',
    description: 'Учить 10 новых слов и проходить 1 урок в приложении.',
    category: 'Учёба',
    frequency: 'daily',
    targetDays: 60,
    streak: 45,
    createdAt: '2026-08-15'
  },
  {
    id: 'h5',
    title: 'Прогулка на свежем воздухе',
    description: 'Гулять не менее 45 минут вечером без телефона.',
    category: 'Продуктивность',
    frequency: 'daily',
    targetDays: 14,
    streak: 3,
    createdAt: '2026-09-10'
  }
]