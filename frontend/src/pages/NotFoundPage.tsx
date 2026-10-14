import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <section>
      <h1>404 — Страница не найдена</h1>
      <p>Упс! Похоже, вы забрели не туда.</p>
      <Link to="/habits">На главную страницу привычек</Link>
    </section>
  )
}