import {
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useParams } from 'react-router'
import PageFrame from '../components/PageFrame'
import { assignments } from '../data/assignments'
import { reviews, rubric } from '../data/reviewData'

function ReviewPage() {
  const { reviewId } = useParams()

  const review = reviews.find(
    (item) => item.id === Number(reviewId) && !item.completed,
  )

  if (!review) {
    return (
      <PageFrame
        title="Проверка недоступна"
        backTo="/reviews"
        backLabel="К проверкам"
      >
        <Typography>
          Проверка не найдена или уже завершена.
        </Typography>
      </PageFrame>
    )
  }

  const assignment = assignments.find(
    (item) => item.id === review.assignmentId,
  )

  return (
    <PageFrame
      title={`Проверка работы №${review.workNumber}`}
      backTo="/reviews"
      backLabel="К проверкам"
    >
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography component="h2" variant="h6">
            {assignment?.title ?? 'Задание'}
          </Typography>

          <Typography>{assignment?.description}</Typography>

          <Typography>
            Проверить до: {review.deadline}
          </Typography>

          <Typography sx={{ overflowWrap: 'anywhere' }}>
            Вложение: submission-{review.workNumber}.zip
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Имя автора скрыто. Вложение демонстрационное,
            скачивание пока не подключено.
          </Typography>
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Typography component="h2" variant="h6">
            Отзыв по шаблону
          </Typography>

          <TextField
            label="Что получилось хорошо"
            multiline
            minRows={3}
            fullWidth
          />

          <TextField
            label="Замечания"
            multiline
            minRows={3}
            fullWidth
          />

          <TextField
            label="Рекомендации"
            multiline
            minRows={3}
            fullWidth
          />

          <Typography component="h2" variant="h6">
            Оценка по критериям
          </Typography>

          {rubric.map((criterion) => (
            <TextField
              key={criterion}
              select
              label={criterion}
              defaultValue=""
              fullWidth
            >
              {[0, 1, 2, 3, 4, 5].map((score) => (
                <MenuItem key={score} value={score}>
                  {score}
                </MenuItem>
              ))}
            </TextField>
          ))}

          <Typography variant="body2" color="text.secondary">
            Максимум — 15 баллов. Расчёт суммы, валидация
            и сохранение будут добавлены на этапе интерактивных форм.
          </Typography>

          <Button type="button" variant="contained" disabled>
            Отправить отзыв
          </Button>
        </Stack>
      </Paper>
    </PageFrame>
  )
}

export default ReviewPage