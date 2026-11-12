import { useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { Link as RouterLink, useParams } from 'react-router'
import PageFrame from '../shared/ui/PageFrame'
import { rubric } from '../entities/review/reviewData'
import { formatDeadline } from '../entities/assignment/assignment'
import type { Assignment } from '../entities/assignment/assignment'
import SubmissionForm from '../features/submit-assignment/SubmissionForm'

interface AssignmentDetailsPageProps {
  assignments: Assignment[]
  onSubmit: (id: number, fileName: string) => boolean
}

function AssignmentDetailsPage({ assignments, onSubmit }: AssignmentDetailsPageProps) {
  const { assignmentId } = useParams()
  const [submittedAssignmentId, setSubmittedAssignmentId] = useState<number>()

  const assignment = assignments.find(
    (item) => item.id === Number(assignmentId),
  )

  if (!assignment) {
    return (
      <PageFrame
        title="Задание не найдено"
        backTo="/assignments"
        backLabel="К заданиям"
      >
        <Typography>
          Проверьте адрес или выберите задание из списка.
        </Typography>
      </PageFrame>
    )
  }

  return (
    <PageFrame
      title={assignment.title}
      backTo="/assignments"
      backLabel="К заданиям"
    >
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography component="h2" variant="h6">
            Описание и требования
          </Typography>

          <Typography sx={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
            {assignment.description}
          </Typography>

          <Typography>
            Приложите один файл в формате ZIP или PDF.
          </Typography>

          <Typography sx={{ fontWeight: 600 }}>
            Сдать до: {formatDeadline(assignment.submissionDeadline)}
          </Typography>
          <Typography>
            Проверить до: {formatDeadline(assignment.reviewDeadline)}
          </Typography>
        </Stack>
      </Paper>

      <Accordion disableGutters>
        <AccordionSummary expandIcon={<span>⌄</span>}>
          <Typography>Критерии оценивания</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Stack spacing={1}>
            {rubric.map((criterion) => (
              <Typography key={criterion}>
                {criterion} — от 0 до 5 баллов
              </Typography>
            ))}

            <Typography sx={{ fontWeight: 600 }}>
              Максимум: {rubric.length * 5} баллов
            </Typography>
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
          <Typography component="h2" variant="h6">
            Моя работа
          </Typography>

          <Chip
            label={assignment.fileName ? 'Сдана' : 'Не сдана'}
            color={assignment.fileName ? 'success' : 'default'}
          />

          {assignment.fileName ? (
            <>
              {submittedAssignmentId === assignment.id && (
                <Alert severity="success" role="status" className="submission-confirmation">
                  Работа сдана.
                </Alert>
              )}
              <Typography sx={{ overflowWrap: 'anywhere' }}>
                Файл: {assignment.fileName}
              </Typography>

              <Button
                component={RouterLink}
                to={`/results/${assignment.id}`}
                variant="outlined"
              >
                Посмотреть результаты
              </Button>
            </>
          ) : (
            <SubmissionForm
              key={assignment.id}
              onSubmit={(fileName) => {
                const saved = onSubmit(assignment.id, fileName)
                if (saved) setSubmittedAssignmentId(assignment.id)
                return saved
              }}
            />
          )}
        </Stack>
      </Paper>
    </PageFrame>
  )
}

export default AssignmentDetailsPage
