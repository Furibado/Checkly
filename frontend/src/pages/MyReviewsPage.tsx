import {
  Button,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router'
import PageFrame from '../shared/ui/PageFrame'
import type { Assignment } from '../entities/assignment/assignment'
import { rubric } from '../entities/review/reviewData'
import type { DemoReview } from '../entities/review/reviewData'

function MyReviewsPage({ assignments, reviews }: { assignments: Assignment[]; reviews: DemoReview[] }) {
  const completedReviews = reviews.filter((review) => review.completed)

  return (
    <PageFrame
      title="Мои проверки"
      backTo="/reviews"
      backLabel="К проверкам"
    >
      <Typography color="text.secondary">
        История отправленных вами отзывов.
      </Typography>

      {completedReviews.length === 0 && (
        <Typography>Вы ещё не выполнили ни одной проверки.</Typography>
      )}

      {completedReviews.map((review) => {
        const assignment = assignments.find(
          (item) => item.id === review.assignmentId,
        )
        const total = review.scores.reduce((sum, score) => sum + score, 0)

        return (
          <Paper key={review.id} variant="outlined" sx={{ p: 3 }}>
            <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
              <Typography component="h2" variant="h6">
                Работа №{review.workNumber}
              </Typography>

              <Typography>{assignment?.title ?? 'Задание не найдено'}</Typography>

              <Typography>Проверено: {review.reviewedAt}</Typography>

              <Typography>Моя оценка: {total}/{rubric.length * 5}</Typography>

              <Button
                component={RouterLink}
                to={`/my-reviews/${review.id}`}
                variant="outlined"
              >
                Посмотреть проверку
              </Button>
            </Stack>
          </Paper>
        )
      })}
    </PageFrame>
  )
}

export default MyReviewsPage
