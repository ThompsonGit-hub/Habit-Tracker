import { useState, useEffect } from 'react'
import type { Tag } from '../types/tag'
import { getTags } from '../services/tags'

export type TagsLoad =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: Tag[] }

export function useTags() {
  const [load, setLoad] = useState<TagsLoad>({ status: 'loading' })
  const [reloadTrigger, setReloadTrigger] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    setLoad({ status: 'loading' })

    getTags(controller.signal)
      .then((data) => {
        if (active) setLoad({ status: 'success', data })
      })
      .catch((error: unknown) => {
      if (!active) return
        const message = error instanceof TypeError
          ? 'Не удалось загрузить теги. Проверьте подключение к интернету.'
          : error instanceof Error
            ? error.message
            : 'Не удалось загрузить справочник.'
        setLoad({ status: 'error', message })
      })

    return () => {
      active = false
      controller.abort()
    }
  }, [reloadTrigger])

  function retry() {
    setLoad({ status: 'loading' })
    setReloadTrigger((current) => current + 1)
  }

  return { load, retry }
}