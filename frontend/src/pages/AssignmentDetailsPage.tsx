import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { Link as RouterLink, useParams } from 'react-router'
import PageFrame from '../components/PageFrame'
import { assignments } from '../data/assignments'
import { rubric } from '../data/reviewData'

function AssignmentDetailsPage() {
  const { assignmentId } = useParams()

  const assignment = assignments.find(
    (item) => item.id === Number(assignmentId),
  )

  if (!assignment) {
    return (
      <PageFrame
        title="Задание не найдено"
        backTo="/assignments"
        backLabel="К заданиям"
      >
        <Typography>
          Проверьте адрес или выберите задание из списка.
        </Typography>
      </PageFrame>
    )
  }

  return (
    <PageFrame
      title={assignment.title}
      backTo="/assignments"
      backLabel="К заданиям"
    >
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography component="h2" variant="h6">
            Описание и требования
          </Typography>

          <Typography>{assignment.description}</Typography>

          <Typography>
            Подготовьте решение по теме задания. Интерфейс должен
            быть читаемым и корректно отображаться на узком экране.
            Работу приложите одним архивом.
          </Typography>

          <Typography sx={{ fontWeight: 600 }}>
            Сдать до: {assignment.deadline}
          </Typography>
        </Stack>
      </Paper>

      <Accordion disableGutters>
        <AccordionSummary expandIcon={<span>⌄</span>}>
          <Typography>Критерии оценивания</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Stack spacing={1}>
            {rubric.map((criterion) => (
              <Typography key={criterion}>
                {criterion} — от 0 до 5 баллов
              </Typography>
            ))}

            <Typography sx={{ fontWeight: 600 }}>
              Максимум: 15 баллов
            </Typography>
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
          <Typography component="h2" variant="h6">
            Моя работа
          </Typography>

          <Chip
            label={assignment.submitted ? 'Сдана' : 'Не сдана'}
            color={assignment.submitted ? 'success' : 'default'}
          />

          {assignment.submitted ? (
            <>
              <Typography sx={{ overflowWrap: 'anywhere' }}>
                Файл: assignment-{assignment.id}.zip
              </Typography>

              <Button
                component={RouterLink}
                to={`/results/${assignment.id}`}
                variant="outlined"
              >
                Посмотреть результаты
              </Button>
            </>
          ) : (
            <>
              <Typography component="label" variant="body2">
                Файл работы
                <input
                  type="file"
                  accept=".zip,.pdf"
                  style={{ display: 'block', marginTop: 8, maxWidth: '100%' }}
                />
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Выбор файла доступен только для демонстрации.
                Файл никуда не отправляется.
              </Typography>

              <Button type="button" variant="contained" disabled>
                Отправить работу
              </Button>
            </>
          )}
        </Stack>
      </Paper>
    </PageFrame>
  )
}

export default AssignmentDetailsPage