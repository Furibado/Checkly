import {
  Box,
  Container,
  Typography,
} from '@mui/material'
import AssignmentCard from '../components/AssignmentCard'
import { assignments } from '../data/assignments'

function AssignmentsPage() {
  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{ py: { xs: 3, md: 5 } }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography
          component="h1"
          variant="h4"
          sx={{
            mb: 1,
            fontWeight: 700,
          }}
        >
          Задания
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          Здесь отображаются задания, которые необходимо выполнить.
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 1,
            color: 'text.secondary',
          }}
        >
          Демонстрационные данные. Всего заданий: {assignments.length}.
        </Typography>
      </Box>

      {assignments.length === 0 ? (
        <Box
          sx={{
            p: 3,
            border: 1,
            borderColor: 'divider',
            borderRadius: 3,
            bgcolor: 'background.paper',
          }}
        >
          <Typography>
            Пока нет доступных заданий.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'minmax(0, 1fr)',
              md: 'repeat(2, minmax(0, 1fr))',
              lg: 'repeat(3, minmax(0, 1fr))',
            },
            gap: 3,
          }}
        >
          {assignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
            />
          ))}
        </Box>
      )}
    </Container>
  )
}

export default AssignmentsPage