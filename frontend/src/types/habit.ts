export type HabitFrequency = 'daily' | 'weekly' | 'monthly'

// Основной тип Привычки
export type Habit = {
  id: string             
  title: string          
  description: string    
  category: string
  frequency: HabitFrequency 
  targetDays: number     
  streak: number         
  createdAt: string      
}

export type HabitDraft = Omit<Habit, 'id'>