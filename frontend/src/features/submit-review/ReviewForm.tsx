import { useState } from 'react'
import type { FormEvent } from 'react'
import { Alert, Button, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material'
import { rubric } from '../../entities/review/reviewData'
import type { ReviewFeedback } from '../../entities/review/reviewData'

const feedbackFields = [
  { name: 'strengths', label: 'Что получилось хорошо' },
  { name: 'remarks', label: 'Замечания' },
  { name: 'recommendations', label: 'Рекомендации' },
] as const

interface ReviewFormProps {
  onSubmit: (feedback: ReviewFeedback) => boolean
}

export default function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [feedback, setFeedback] = useState({ strengths: '', remarks: '', recommendations: '' })
  const [scores, setScores] = useState(() => rubric.map(() => ''))
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)
  const [saveError, setSaveError] = useState(false)

  const total = scores.reduce((sum, score) => sum + Number(score), 0)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAttemptedSubmit(true)
    setSaveError(false)
    if (feedbackFields.some(({ name }) => !feedback[name].trim()) || scores.includes('')) {
      return
    }
    const saved = onSubmit({
      strengths: feedback.strengths.trim(),
      remarks: feedback.remarks.trim(),
      recommendations: feedback.recommendations.trim(),
      scores: scores.map(Number),
    })
    setSaveError(!saved)
  }

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Stack
        component="form"
        noValidate
        onSubmit={handleSubmit}
        spacing={3}
      >
        <Typography component="h2" variant="h6">
          Отзыв по шаблону
        </Typography>

        {feedbackFields.map(({ name, label }) => {
          const missing = attemptedSubmit && !feedback[name].trim()
          return (
            <TextField
              key={name}
              label={label}
              value={feedback[name]}
              onChange={(event) => setFeedback({ ...feedback, [name]: event.target.value })}
              error={missing}
              helperText={missing ? 'Заполните это поле.' : undefined}
              slotProps={{ htmlInput: { maxLength: 5000 } }}
              required
              multiline
              minRows={3}
              fullWidth
            />
          )
        })}

        <Typography component="h2" variant="h6">
          Оценка по критериям
        </Typography>

        {rubric.map((criterion, index) => (
          <TextField
            key={criterion}
            select
            label={criterion}
            value={scores[index]}
            onChange={(event) => setScores((current) => current.map(
              (score, scoreIndex) => scoreIndex === index ? String(event.target.value) : score,
            ))}
            error={attemptedSubmit && scores[index] === ''}
            helperText={attemptedSubmit && scores[index] === '' ? 'Выберите балл.' : undefined}
            required
            fullWidth
          >
            {[0, 1, 2, 3, 4, 5].map((score) => (
              <MenuItem key={score} value={String(score)}>
                {score}
              </MenuItem>
            ))}
          </TextField>
        ))}

        <Typography variant="body2" role="status">
          Итог: {total}/{rubric.length * 5}
        </Typography>

        {saveError && <Alert severity="error">Не удалось сохранить отзыв. Попробуйте ещё раз.</Alert>}

        <Button type="submit" variant="contained">
          Отправить отзыв
        </Button>
      </Stack>
    </Paper>
  )
}
