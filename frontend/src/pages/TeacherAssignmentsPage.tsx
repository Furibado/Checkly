import { Button, Chip, Paper, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router'
import { formatDeadline } from '../entities/assignment/assignment'
import type { Assignment } from '../entities/assignment/assignment'
import PageFrame from '../shared/ui/PageFrame'

export default function TeacherAssignmentsPage({ assignments }: { assignments: Assignment[] }) {
  return (
    <PageFrame title="Мои задания">
      <Button
        component={RouterLink}
        to="/teacher/assignments/new"
        variant="contained"
        sx={{ alignSelf: 'flex-start' }}
      >
        Создать задание
      </Button>
      {assignments.length === 0 && <Typography>У вас пока нет опубликованных заданий.</Typography>}
      {[...assignments].reverse().map((assignment) => (
        <Paper key={assignment.id} variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}>
          <Stack spacing={1} sx={{ alignItems: 'flex-start' }}>
            <Chip label={assignment.group} size="small" />
            <Typography component="h2" variant="h6" sx={{ overflowWrap: 'anywhere' }}>
              {assignment.title}
            </Typography>
            <Typography sx={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
              {assignment.description}
            </Typography>
            <Typography variant="body2">Сдать до: {formatDeadline(assignment.submissionDeadline)}</Typography>
            <Typography variant="body2">Проверить до: {formatDeadline(assignment.reviewDeadline)}</Typography>
          </Stack>
        </Paper>
      ))}
    </PageFrame>
  )
}
