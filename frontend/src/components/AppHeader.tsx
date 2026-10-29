import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material'
import { Link as RouterLink, NavLink } from 'react-router'

const navigation = [
  { label: 'Задания', path: '/assignments' },
  { label: 'Проверки', path: '/reviews' },
  { label: 'Мои проверки', path: '/my-reviews' },
  { label: 'Результаты моих работ', path: '/results' },
]

function AppHeader() {
  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: 'divider' }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            py: 2,
            gap: 2,
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            component={RouterLink}
            to="/assignments"
            variant="h6"
            sx={{
              color: 'text.primary',
              textDecoration: 'none',
              fontWeight: 700,
            }}
          >
            Checkly
          </Typography>

          <Box
            component="nav"
            aria-label="Основная навигация"
            sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
          >
            {navigation.map((item) => (
              <Button
                key={item.path}
                component={NavLink}
                to={item.path}
                sx={{
                  textTransform: 'none',
                  color: 'text.secondary',
                  '&.active': {
                    color: 'primary.contrastText',
                    bgcolor: 'primary.main',
                  },
                  '&.active:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default AppHeader