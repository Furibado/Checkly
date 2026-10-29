import type { Assignment } from '../types/assignment'

export const assignments: Assignment[] = [
  {
    id: 1,
    title: 'Разработка страницы интернет-магазина',
    description: 'Создайте страницу каталога с карточками товаров.',
    deadline: '10 ноября, 23:59',
    submitted: false,
  },
  {
    id: 2,
    title: 'Форма обратной связи',
    description: 'Подготовьте форму с полями имени, почты и сообщения.',
    deadline: '15 ноября, 23:59',
    submitted: true,
  },
  {
    id: 3,
    title: 'Адаптивная страница профиля',
    description: 'Создайте страницу профиля для компьютера и телефона.',
    deadline: '20 ноября, 23:59',
    submitted: false,
  },
]