import {
  Button,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router'
import PageFrame from '../components/PageFrame'
import { assignments } from '../data/assignments'
import { receivedReviews } from '../data/reviewData'

function ResultsPage() {
  const submittedAssignments = assignments.filter(
    (assignment) => assignment.submitted,
  )

  return (
    <PageFrame
      title="Результаты моих работ"
      backTo="/assignments"
      backLabel="К заданиям"
    >
      {submittedAssignments.length === 0 && (
        <Typography>У вас пока нет сданных работ.</Typography>
      )}

      {submittedAssignments.map((assignment) => {
        const count = receivedReviews.filter(
          (review) => review.assignmentId === assignment.id,
        ).length

        return (
          <Paper key={assignment.id} variant="outlined" sx={{ p: 3 }}>
            <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
              <Typography component="h2" variant="h6">
                {assignment.title}
              </Typography>

              <Typography sx={{ overflowWrap: 'anywhere' }}>
                Мой файл: assignment-{assignment.id}.zip
              </Typography>

              <Typography>
                {count > 0
                  ? `Получено отзывов: ${count}`
                  : 'Ожидает проверки'}
              </Typography>

              <Button
                component={RouterLink}
                to={`/results/${assignment.id}`}
                variant="outlined"
              >
                Посмотреть результаты
              </Button>
            </Stack>
          </Paper>
        )
      })}
    </PageFrame>
  )
}

export default ResultsPage