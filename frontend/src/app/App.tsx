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
import AppHeader from './AppHeader'
import AssignmentsPage from '../pages/AssignmentsPage'
import AssignmentDetailsPage from '../pages/AssignmentDetailsPage'
import ReviewsPage from '../pages/ReviewsPage'
import ReviewPage from '../pages/ReviewPage'
import MyReviewsPage from '../pages/MyReviewsPage'
import MyReviewDetailsPage from '../pages/MyReviewDetailsPage'
import ResultsPage from '../pages/ResultsPage'
import ResultDetailsPage from '../pages/ResultDetailsPage'
import PlaceholderPage from '../pages/PlaceholderPage'
import TeacherAssignmentsPage from '../pages/TeacherAssignmentsPage'
import NewAssignmentPage from '../pages/NewAssignmentPage'
import HomePage from '../pages/HomePage'
import TeacherReviewedWorksPage from '../pages/TeacherReviewedWorksPage'
import TeacherReviewedWorkPage from '../pages/TeacherReviewedWorkPage'
import { getTeacherReviewedWorks } from '../entities/review/teacherReviewedWorks'
import { studentGroup } from '../entities/assignment/assignment'
import type { AssignmentDraft } from '../entities/assignment/assignment'
import type { ReviewFeedback } from '../entities/review/reviewData'
import DataStatus from '../shared/ui/DataStatus'
import type { DemoData } from './demoData'
import { useDemoData } from './useDemoData'

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

interface ReadyRoutesProps {
  data: DemoData
  save: (data: DemoData) => boolean
}

function ReadyRoutes({ data, save }: ReadyRoutesProps) {
  const assignments = data.assignments.filter((assignment) => assignment.group === studentGroup)
  const assignmentIds = new Set(assignments.map((assignment) => assignment.id))
  const reviews = data.reviews.filter((review) => assignmentIds.has(review.assignmentId))
  const reviewedWorks = getTeacherReviewedWorks(data.assignments, data.reviews)

  function submitAssignment(id: number, fileName: string) {
    return save({
      ...data,
      assignments: data.assignments.map((assignment) =>
        assignment.id === id ? { ...assignment, fileName } : assignment,
      ),
    })
  }

  function submitReview(id: number, feedback: ReviewFeedback) {
    const reviewedAt = new Intl.DateTimeFormat('ru-RU', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date())

    return save({
      ...data,
      reviews: data.reviews.map((review) => review.id === id
        ? { ...review, ...feedback, completed: true, reviewedAt }
        : review),
    })
  }

  function publishAssignment(draft: AssignmentDraft) {
    const nextId = data.assignments.reduce((max, assignment) => Math.max(max, assignment.id), 0) + 1
    return save({
      ...data,
      assignments: [...data.assignments, { ...draft, id: nextId, fileName: null }],
    })
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/assignments"
        element={<AssignmentsPage assignments={assignments} />}
      />

      <Route
        path="/assignments/:assignmentId"
        element={
          <AssignmentDetailsPage assignments={assignments} onSubmit={submitAssignment} />
        }
      />

      <Route
        path="/reviews"
        element={<ReviewsPage assignments={assignments} reviews={reviews} />}
      />

      <Route
        path="/reviews/:reviewId"
        element={
          <ReviewPage assignments={assignments} reviews={reviews} onSubmit={submitReview} />
        }
      />

      <Route
        path="/my-reviews"
        element={<MyReviewsPage assignments={assignments} reviews={reviews} />}
      />

      <Route
        path="/my-reviews/:reviewId"
        element={<MyReviewDetailsPage assignments={assignments} reviews={reviews} />}
      />

      <Route
        path="/results"
        element={<ResultsPage assignments={assignments} />}
      />

      <Route
        path="/results/:assignmentId"
        element={<ResultDetailsPage assignments={assignments} />}
      />

      <Route path="/teacher" element={<Navigate to="/teacher/assignments" replace />} />

      <Route
        path="/teacher/assignments"
        element={<TeacherAssignmentsPage assignments={data.assignments} />}
      />

      <Route
        path="/teacher/assignments/new"
        element={<NewAssignmentPage onPublish={publishAssignment} />}
      />

      <Route path="/teacher/reviews" element={<TeacherReviewedWorksPage works={reviewedWorks} />} />
      <Route path="/teacher/reviews/:workId" element={<TeacherReviewedWorkPage works={reviewedWorks} />} />

      <Route
        path="*"
        element={<PlaceholderPage title="Страница не найдена" />}
      />
    </Routes>
  )
}

function App() {
  const { state, retry, resetDemo, save } = useDemoData()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppHeader />
        {state.status === 'loading' && <DataStatus status="loading" />}
        {state.status === 'error' && (
          <DataStatus status="error" message={state.message} onRetry={retry} onReset={resetDemo} />
        )}
        {state.status === 'ready' && <ReadyRoutes data={state.data} save={save} />}
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
