import {
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router'
import AppHeader from './components/AppHeader'
import AssignmentsPage from './pages/AssignmentsPage'
import AssignmentDetailsPage from './pages/AssignmentDetailsPage'
import ReviewsPage from './pages/ReviewsPage'
import ReviewPage from './pages/ReviewPage'
import MyReviewsPage from './pages/MyReviewsPage'
import MyReviewDetailsPage from './pages/MyReviewDetailsPage'
import ResultsPage from './pages/ResultsPage'
import ResultDetailsPage from './pages/ResultDetailsPage'
import PlaceholderPage from './pages/PlaceholderPage'

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f5f7fb',
    },
  },
  typography: {
    fontFamily: 'system-ui, "Segoe UI", sans-serif',
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <AppHeader />

        <Routes>
          <Route
            path="/"
            element={<Navigate to="/assignments" replace />}
          />

          <Route
            path="/assignments"
            element={<AssignmentsPage />}
          />

          <Route
            path="/assignments/:assignmentId"
            element={<AssignmentDetailsPage />}
          />

          <Route
            path="/reviews"
            element={<ReviewsPage />}
          />

          <Route
            path="/reviews/:reviewId"
            element={<ReviewPage />}
          />

          <Route
            path="/my-reviews"
            element={<MyReviewsPage />}
          />

          <Route
            path="/my-reviews/:reviewId"
            element={<MyReviewDetailsPage />}
          />

          <Route
            path="/results"
            element={<ResultsPage />}
          />

          <Route
            path="/results/:assignmentId"
            element={<ResultDetailsPage />}
          />

          <Route
            path="*"
            element={<PlaceholderPage title="Страница не найдена" />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App