import { Typography } from '@mui/material'
import { useParams } from 'react-router'
import PageFrame from '../components/PageFrame'
import ReviewDetails from '../components/ReviewDetails'
import { reviews } from '../data/reviewData'

function MyReviewDetailsPage() {
  const { reviewId } = useParams()

  const review = reviews.find(
    (item) => item.id === Number(reviewId) && item.completed,
  )

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