import { useEffect, useState } from 'react'
import { clearDemoData, loadDemoData, saveDemoData } from './demoData'
import type { DemoData } from './demoData'

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; data: DemoData }

export function useDemoData() {
  const [state, setState] = useState<LoadState>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    // Имитируем асинхронное чтение до подключения API.
    const timer = window.setTimeout(() => {
      try {
        setState({ status: 'ready', data: loadDemoData() })
      } catch {
        setState({ status: 'error', message: 'Не удалось загрузить демонстрационные данные.' })
      }
    }, 250)
    return () => window.clearTimeout(timer)
  }, [attempt])

  function retry() {
    setState({ status: 'loading' })
    setAttempt((current) => current + 1)
  }

  function resetDemo() {
    try {
      clearDemoData()
      retry()
    } catch {
      setState({ status: 'error', message: 'Не удалось сбросить данные. Проверьте доступ браузера к хранилищу.' })
    }
  }

  function save(data: DemoData) {
    try {
      saveDemoData(data)
      setState({ status: 'ready', data })
      return true
    } catch {
      return false
    }
  }

  return { state, retry, resetDemo, save }
}
