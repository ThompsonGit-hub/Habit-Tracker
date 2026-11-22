# Habit Tracker

**Автор:** [Хоменко Владимир], группа [24ИВ]
**Тема:** Ежедневные привычки и личный прогресс

## Стек
- React + TypeScript + Vite
- Node.js v24.21.0

## Запуск проекта
```bash
cd frontend
npm install
npm run dev
## Проверка сборки
Остановите dev через Ctrl+C. Выполните в frontend:
```bash
npm run build
npm run preview

ЛР 4 — Загрузка справочника по HTTP

Реализована загрузка справочника тегов из ${import.meta.env.BASE_URL}demo/tags.json через src/services/tags.ts (getTags, parseTags) и хук src/hooks/useTags.ts (useTags) с проверкой response.ok, рантайм-валидацией элементов и уникальности id, отменой запросов через AbortController при размонтировании или перезапуске, а также сохранением черновика формы при ошибках и повторных попытках.