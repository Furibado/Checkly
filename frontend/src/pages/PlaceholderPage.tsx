import { Button, Container, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router'

interface PlaceholderPageProps {
  title: string
}

function PlaceholderPage({ title }: PlaceholderPageProps) {

  return (
    <Container component="main" maxWidth="lg" sx={{ py: 5 }}>
      <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
        {title}
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Проверьте адрес или вернитесь к списку заданий.
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
