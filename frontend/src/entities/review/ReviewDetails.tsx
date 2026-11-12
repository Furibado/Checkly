import {
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { rubric } from './reviewData'

interface ReviewDetailsProps {
  author: string
  reviewedAt?: string
  strengths: string
  remarks: string
  recommendations: string
  scores: number[]
}

function ReviewDetails({
  author,
  reviewedAt,
  strengths,
  remarks,
  recommendations,
  scores,
}: ReviewDetailsProps) {
  const total = scores.reduce((sum, score) => sum + score, 0)

  return (
    <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}>
      <Stack spacing={2}>
        <Typography component="h2" variant="h6">
          {author}
        </Typography>

        {reviewedAt && <Typography color="text.secondary">Проверено: {reviewedAt}</Typography>}

        <Typography sx={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
          Что получилось хорошо: {strengths}
        </Typography>

        <Typography sx={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
          Замечания: {remarks}
        </Typography>

        <Typography sx={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
          Рекомендации: {recommendations}
        </Typography>

        <Divider />

        {rubric.map((criterion, index) => (
          <Typography key={criterion}>
            {criterion}: {scores[index] ?? 0}/5
          </Typography>
        ))}

        <Typography sx={{ fontWeight: 700 }}>
          Итог: {total}/{rubric.length * 5}
        </Typography>
      </Stack>
    </Paper>
  )
}

export default ReviewDetails
