export const rubric = [
  'Полнота выполнения требований',
  'Корректность работы интерфейса',
  'Удобство и оформление',
]

export interface DemoReview {
  id: number
  assignmentId: number
  workNumber: number
  deadline: string
  completed: boolean
  reviewedAt: string
  strengths: string
  remarks: string
  recommendations: string
  scores: number[]
}

export const reviews: DemoReview[] = [
  {
    id: 101,
    assignmentId: 1,
    workNumber: 104,
    deadline: '13 ноября, 23:59',
    completed: false,
    reviewedAt: '',
    strengths: '',
    remarks: '',
    recommendations: '',
    scores: [],
  },
  {
    id: 102,
    assignmentId: 2,
    workNumber: 108,
    deadline: '18 ноября, 23:59',
    completed: true,
    reviewedAt: '16 ноября, 18:30',
    strengths: 'Поля формы подписаны, интерфейс понятный.',
    remarks: 'Сообщения об ошибках недостаточно заметны.',
    recommendations: 'Добавить более явное выделение ошибок.',
    scores: [5, 4, 3],
  },
]

export const receivedReviews = [
  {
    id: 201,
    assignmentId: 2,
    reviewer: 'Рецензент №1',
    strengths: 'Все обязательные поля присутствуют.',
    remarks: 'На узком экране не хватает отступов.',
    recommendations: 'Проверить форму на мобильном устройстве.',
    scores: [5, 4, 4],
  },
  {
    id: 202,
    assignmentId: 2,
    reviewer: 'Рецензент №2',
    strengths: 'Форма выглядит аккуратно и понятно.',
    remarks: 'Подсказки к полям можно сделать подробнее.',
    recommendations: 'Добавить примеры заполнения.',
    scores: [5, 4, 5],
  },
]