import { studentGroup } from './assignment'
import type { Assignment } from './assignment'

export const assignments: Assignment[] = [
  {
    id: 1,
    title: 'Разработка страницы интернет-магазина',
    description: 'Создайте страницу каталога с карточками товаров.',
    group: studentGroup,
    submissionDeadline: '2026-11-10T23:59:00+03:00',
    reviewDeadline: '2026-11-13T23:59:00+03:00',
    fileName: null,
  },
  {
    id: 2,
    title: 'Форма обратной связи',
    description: 'Подготовьте форму с полями имени, почты и сообщения.',
    group: studentGroup,
    submissionDeadline: '2026-11-15T23:59:00+03:00',
    reviewDeadline: '2026-11-18T23:59:00+03:00',
    fileName: 'assignment-2.zip',
  },
  {
    id: 3,
    title: 'Адаптивная страница профиля',
    description: 'Создайте страницу профиля для компьютера и телефона.',
    group: studentGroup,
    submissionDeadline: '2026-11-20T23:59:00+03:00',
    reviewDeadline: '2026-11-24T23:59:00+03:00',
    fileName: 'assignment-3.pdf',
  },
]
