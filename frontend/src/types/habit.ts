// Union Types (объединения строк): переменная может принимать ТОЛЬКО эти значения
export type HabitCategory = 'Здоровье' | 'Спорт' | 'Учёба' | 'Продуктивность' | 'Развитие'
export type HabitFrequency = 'daily' | 'weekly' | 'monthly'

// Основной тип Привычки
export type Habit = {
  id: string             // Уникальный текстовый ID (например, 'h1')
  title: string          // Название (например, 'Утренняя зарядка')
  description: string    // Подробное описание
  category: HabitCategory// Категория из списка выше
  frequency: HabitFrequency // Регулярность
  targetDays: number     // Цель: сколько дней подряд планируем выполнять
  streak: number         // Текущая серия (сколько дней выполняем прямо сейчас)
  createdAt: string      // Дата создания в формате YYYY-MM-DD
}