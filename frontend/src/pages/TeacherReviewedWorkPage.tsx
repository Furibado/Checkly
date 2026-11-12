import { Chip, Paper, Stack, Typography } from '@mui/material'
import { useParams } from 'react-router'
import ReviewDetails from '../entities/review/ReviewDetails'
import type { TeacherReviewedWork } from '../entities/review/teacherReviewedWorks'
import PageFrame from '../shared/ui/PageFrame'

export default function TeacherReviewedWorkPage({ works }: { works: TeacherReviewedWork[] }) {
  const { workId } = useParams()
  const work = works.find((item) => item.id === workId)

  return (
    <PageFrame
      title={work?.assignment.title ?? 'Проверенная работа не найдена'}
      backTo="/teacher/reviews"
      backLabel="К проверенным работам"
    >
      {work ? (
        <>
          <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}>
            <Stack spacing={1.5} sx={{ alignItems: 'flex-start', overflowWrap: 'anywhere' }}>
              <Chip label={work.assignment.group} size="small" />
              <Typography>Автор: {work.authorName}</Typography>
              <Typography>Файл: {work.fileName}</Typography>
            </Stack>
          </Paper>
          {work.reviews.map((review) => (
            <ReviewDetails
              key={review.id}
              author={`Рецензент: ${review.reviewerName}`}
              reviewedAt={review.reviewedAt}
              strengths={review.strengths}
              remarks={review.remarks}
              recommendations={review.recommendations}
              scores={review.scores}
            />
          ))}
        </>
      ) : (
        <Typography>Выберите работу из списка завершённых проверок.</Typography>
      )}
    </PageFrame>
  )
}
