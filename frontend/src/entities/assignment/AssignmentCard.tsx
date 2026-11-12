import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router'
import { formatDeadline } from './assignment'
import type { Assignment } from './assignment'

interface AssignmentCardProps {
  assignment: Assignment
}

function AssignmentCard({ assignment }: AssignmentCardProps) {
  return (
    <Card
      component="article"
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minWidth: 0,
        borderRadius: 3,
      }}
    >
      <CardContent
        sx={{
          p: 3,
          flexGrow: 1,
        }}
      >
        <Chip
          label={assignment.fileName ? 'Сдана' : 'Не сдана'}
          color={assignment.fileName ? 'success' : 'default'}
          size="small"
          sx={{ mb: 2 }}
        />

        <Typography
          component="h2"
          variant="h6"
          sx={{
            mb: 1,
            fontWeight: 600,
            overflowWrap: 'anywhere',
          }}
        >
          {assignment.title}
        </Typography>

        <Typography
          sx={{
            mb: 3,
            color: 'text.secondary',
            overflowWrap: 'anywhere',
          }}
        >
          {assignment.description}
        </Typography>

        <Typography variant="body2">
          Сдать до: {formatDeadline(assignment.submissionDeadline)}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          px: 3,
          pb: 3,
          pt: 0,
        }}
      >
        <Button
          component={RouterLink}
          to={`/assignments/${assignment.id}`}
          variant="contained"
          sx={{ textTransform: 'none' }}
        >
          Открыть задание
        </Button>
      </CardActions>
    </Card>
  )
}

export default AssignmentCard
