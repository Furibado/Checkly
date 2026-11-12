import { Button, Chip, Paper, Stack, Typography } from '@mui/material'
import { Link } from 'react-router'
import type { TeacherReviewedWork } from '../entities/review/teacherReviewedWorks'
import PageFrame from '../shared/ui/PageFrame'

export default function TeacherReviewedWorksPage({ works }: { works: TeacherReviewedWork[] }) {
  return (
    <PageFrame title="Проверенные работы">
      {works.length === 0 && <Typography>Пока нет работ с завершёнными проверками.</Typography>}
      {works.map((work) => (
        <Paper key={work.id} variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}>
          <Stack spacing={1.5} sx={{ alignItems: 'flex-start', overflowWrap: 'anywhere' }}>
            <Chip label={work.assignment.group} size="small" />
            <Typography component="h2" variant="h6">{work.assignment.title}</Typography>
            <Typography>Автор: {work.authorName}</Typography>
            <Typography>Файл: {work.fileName}</Typography>
            <Typography>
              Проверили: {work.reviews.map((review) => review.reviewerName).join(', ')}
            </Typography>
            <Button component={Link} to={`/teacher/reviews/${work.id}`} variant="outlined">
              Посмотреть отзывы
            </Button>
          </Stack>
        </Paper>
      ))}
    </PageFrame>
  )
}
