import { Button, Container, Typography } from '@mui/material'
import { Link as RouterLink, useParams } from 'react-router'

interface PlaceholderPageProps {
  title: string
}

function PlaceholderPage({ title }: PlaceholderPageProps) {
  const { assignmentId } = useParams()

  return (
    <Container component="main" maxWidth="lg" sx={{ py: 5 }}>
      <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
        {title}
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {assignmentId
          ? `Вы открыли задание №${assignmentId}. Экран находится в разработке.`
          : 'Этот экран находится в разработке.'}
      </Typography>

      <Button
        component={RouterLink}
        to="/assignments"
        variant="outlined"
        sx={{ textTransform: 'none' }}
      >
        К заданиям
      </Button>
    </Container>
  )
}

export default PlaceholderPage