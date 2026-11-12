import { Button, Paper, Stack, Typography } from '@mui/material'
import { Link } from 'react-router'
import PageFrame from '../shared/ui/PageFrame'

const sections = [
  {
    title: 'Студент',
    description: 'Открыть задания, сдать работу и посмотреть проверки и результаты.',
    action: 'Открыть раздел студента',
    to: '/assignments',
  },
  {
    title: 'Преподаватель',
    description: 'Опубликовать задание для группы и посмотреть проверенные работы.',
    action: 'Открыть кабинет преподавателя',
    to: '/teacher/assignments',
  },
]

export default function HomePage() {
  return (
    <PageFrame title="Разделы Checkly">
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        {sections.map(({ title, description, action, to }) => (
          <Paper key={to} variant="outlined" sx={{ p: 3, flex: 1, minWidth: 0 }}>
            <Stack spacing={2} sx={{ alignItems: 'flex-start', height: '100%' }}>
              <Typography component="h2" variant="h6">{title}</Typography>
              <Typography sx={{ flexGrow: 1 }}>{description}</Typography>
              <Button component={Link} to={to} variant="contained" sx={{ textAlign: 'left' }}>
                {action}
              </Button>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </PageFrame>
  )
}
