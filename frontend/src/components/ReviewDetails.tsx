import {
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { rubric } from '../data/reviewData'

interface ReviewDetailsProps {
  author: string
  strengths: string
  remarks: string
  recommendations: string
  scores: number[]
}

function ReviewDetails({
  author,
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

        <Typography>
          Что получилось хорошо: {strengths}
        </Typography>

        <Typography>
          Замечания: {remarks}
        </Typography>

        <Typography>
          Рекомендации: {recommendations}
        </Typography>

        <Divider />

        {rubric.map((criterion, index) => (
          <Typography key={criterion}>
            {criterion}: {scores[index] ?? 0}/5
          </Typography>
        ))}

        <Typography sx={{ fontWeight: 700 }}>
          Итог: {total}/15
        </Typography>
      </Stack>
    </Paper>
  )
}

export default ReviewDetails