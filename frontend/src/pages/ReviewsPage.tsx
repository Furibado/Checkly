import {
  Button,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router'
import PageFrame from '../components/PageFrame'
import { assignments } from '../data/assignments'
import { reviews } from '../data/reviewData'

function ReviewsPage() {
  const pendingReviews = reviews.filter((review) => !review.completed)

  return (
    <PageFrame
      title="Проверки"
      backTo="/assignments"
      backLabel="К заданиям"
    >
      <Typography color="text.secondary">
        Работы, назначенные вам для проверки. Имена авторов скрыты.
      </Typography>

      {pendingReviews.length === 0 && (
        <Typography>Нет работ, ожидающих проверки.</Typography>
      )}

      {pendingReviews.map((review) => {
        const assignment = assignments.find(
          (item) => item.id === review.assignmentId,
        )

        return (
          <Paper key={review.id} variant="outlined" sx={{ p: 3 }}>
            <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
              <Typography component="h2" variant="h6">
                Работа №{review.workNumber}
              </Typography>

              <Typography>
                {assignment?.title ?? 'Задание не найдено'}
              </Typography>

              <Typography>
                Проверить до: {review.deadline}
              </Typography>

              <Button
                component={RouterLink}
                to={`/reviews/${review.id}`}
                variant="contained"
              >
                Проверить
              </Button>
            </Stack>
          </Paper>
        )
      })}
    </PageFrame>
  )
}

export default ReviewsPage