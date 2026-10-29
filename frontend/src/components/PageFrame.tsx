import type { ReactNode } from 'react'
import {
  Button,
  Container,
  Stack,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router'

interface PageFrameProps {
  title: string
  backTo: string
  backLabel: string
  children: ReactNode
}

function PageFrame({
  title,
  backTo,
  backLabel,
  children,
}: PageFrameProps) {
  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ py: { xs: 3, md: 5 } }}
    >
      <Stack spacing={3}>
        <Button
          component={RouterLink}
          to={backTo}
          sx={{ alignSelf: 'flex-start', textTransform: 'none' }}
        >
          ← {backLabel}
        </Button>

        <Typography
          component="h1"
          variant="h4"
          sx={{ fontWeight: 700, overflowWrap: 'anywhere' }}
        >
          {title}
        </Typography>

        {children}
      </Stack>
    </Container>
  )
}

export default PageFrame