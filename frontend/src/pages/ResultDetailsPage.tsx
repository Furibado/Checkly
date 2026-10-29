import { Typography } from '@mui/material'
import { useParams } from 'react-router'
import PageFrame from '../components/PageFrame'
import ReviewDetails from '../components/ReviewDetails'
import { assignments } from '../data/assignments'
import { receivedReviews } from '../data/reviewData'

function ResultDetailsPage() {
  const { assignmentId } = useParams()

  const assignment = assignments.find(
    (item) => item.id === Number(assignmentId) && item.submitted,
  )

  const feedback = receivedReviews.filter(
    (review) => review.assignmentId === assignment?.id,
  )

  return (
    <PageFrame
      title={assignment
        ? `Результаты: ${assignment.title}`
        : 'Работа не найдена'}
      backTo="/results"
      backLabel="К результатам"
    >
      {!assignment ? (
        <Typography>Выберите сданную работу из списка.</Typography>
      ) : (
        <>
          <Typography sx={{ overflowWrap: 'anywhere' }}>
            Файл: assignment-{assignment.id}.zip
          </Typography>

          {feedback.length === 0 && (
            <Typography>
              Пока нет отзывов. Работа ожидает проверки.
            </Typography>
          )}

          {feedback.map((review) => (
            <ReviewDetails
              key={review.id}
              author={review.reviewer}
              strengths={review.strengths}
              remarks={review.remarks}
              recommendations={review.recommendations}
              scores={review.scores}
            />
          ))}
        </>
      )}
    </PageFrame>
  )
}

export default ResultDetailsPage