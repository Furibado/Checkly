import { Typography } from '@mui/material'
import { useParams } from 'react-router'
import PageFrame from '../shared/ui/PageFrame'
import ReviewDetails from '../entities/review/ReviewDetails'
import type { Assignment } from '../entities/assignment/assignment'
import type { DemoReview } from '../entities/review/reviewData'

function MyReviewDetailsPage(
  { assignments, reviews }: { assignments: Assignment[]; reviews: DemoReview[] },
) {
  const { reviewId } = useParams()

  const review = reviews.find(
    (item) => item.id === Number(reviewId) && item.completed,
  )
  const assignment = assignments.find((item) => item.id === review?.assignmentId)

  return (
    <PageFrame
      title={review
        ? `Моя проверка работы №${review.workNumber}`
        : 'Проверка не найдена'}
      backTo="/my-reviews"
      backLabel="К моим проверкам"
    >
      {review ? (
        <>
          <Typography>{assignment?.title ?? 'Задание не найдено'}</Typography>
          <Typography>Отправлено: {review.reviewedAt}</Typography>

          <ReviewDetails
            author="Мой отзыв"
            strengths={review.strengths}
            remarks={review.remarks}
            recommendations={review.recommendations}
            scores={review.scores}
          />
        </>
      ) : (
        <Typography>Выберите выполненную проверку из списка.</Typography>
      )}
    </PageFrame>
  )
}

export default MyReviewDetailsPage
