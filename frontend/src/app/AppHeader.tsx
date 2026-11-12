import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material'
import { Link as RouterLink, NavLink, useMatch } from 'react-router'

const navigation = [
  { label: 'Задания', path: '/assignments' },
  { label: 'Проверки', path: '/reviews' },
  { label: 'Мои проверки', path: '/my-reviews' },
  { label: 'Результаты моих работ', path: '/results' },
]

const teacherNavigation = [
  { label: 'Мои задания', path: '/teacher/assignments' },
  { label: 'Проверенные работы', path: '/teacher/reviews' },
]

function AppHeader() {
  const isTeacher = useMatch('/teacher/*') !== null
  const isHome = useMatch('/') !== null
  const links = isHome ? [] : isTeacher ? teacherNavigation : navigation

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
            to="/"
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
            {links.map((item) => (
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
