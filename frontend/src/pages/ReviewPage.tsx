import {
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import PageFrame from '../shared/ui/PageFrame'
import { formatDeadline } from '../entities/assignment/assignment'
import ReviewForm from '../features/submit-review/ReviewForm'
import type { DemoReview, ReviewFeedback } from '../entities/review/reviewData'
import type { Assignment } from '../entities/assignment/assignment'

interface ReviewPageProps {
  assignments: Assignment[]
  reviews: DemoReview[]
  onSubmit: (id: number, feedback: ReviewFeedback) => boolean
}

function ReviewPage({ assignments, reviews, onSubmit }: ReviewPageProps) {
  const { reviewId } = useParams()
  const navigate = useNavigate()

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

          {assignment && (
            <Typography>Проверить до: {formatDeadline(assignment.reviewDeadline)}</Typography>
          )}

          <Typography sx={{ overflowWrap: 'anywhere' }}>
            Вложение: submission-{review.workNumber}.zip
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Имя автора скрыто. Вложение демонстрационное,
            скачивание пока не подключено.
          </Typography>
        </Stack>
      </Paper>

      <ReviewForm
        key={review.id}
        onSubmit={(feedback) => {
          const saved = onSubmit(review.id, feedback)
          if (saved) navigate('/my-reviews', { replace: true })
          return saved
        }}
      />
    </PageFrame>
  )
}

export default ReviewPage
