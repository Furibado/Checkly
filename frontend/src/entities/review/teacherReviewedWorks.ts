import type { Assignment } from '../assignment/assignment'
import { receivedReviews } from './reviewData'
import type { DemoReview, ReviewFeedback } from './reviewData'

interface TeacherReview extends ReviewFeedback {
  id: number
  reviewerName: string
  reviewedAt?: string
}

export interface TeacherReviewedWork {
  id: string
  assignment: Assignment
  authorName: string
  fileName: string
  reviews: TeacherReview[]
}

const demoStudent = 'Алексей Смирнов'
const peerAuthors = new Map([
  [104, 'Мария Иванова'],
  [108, 'Илья Петров'],
])
const receivedReviewerNames = new Map([
  [201, 'Мария Иванова'],
  [202, 'Елена Кузнецова'],
])

export function getTeacherReviewedWorks(
  assignments: Assignment[], reviews: DemoReview[],
): TeacherReviewedWork[] {
  const works: TeacherReviewedWork[] = []
  const assignmentsById = new Map(assignments.map((assignment) => [assignment.id, assignment]))

  for (const review of reviews) {
    const assignment = assignmentsById.get(review.assignmentId)
    if (!review.completed || !assignment) continue

    works.push({
      id: `peer-${review.workNumber}`,
      assignment,
      authorName: peerAuthors.get(review.workNumber) ?? `Автор работы №${review.workNumber}`,
      fileName: `submission-${review.workNumber}.zip`,
      reviews: [{ ...review, reviewerName: demoStudent }],
    })
  }

  for (const assignment of assignments) {
    if (!assignment.fileName) continue
    const feedback = receivedReviews.filter((review) => review.assignmentId === assignment.id)
    if (feedback.length === 0) continue

    works.push({
      id: `own-${assignment.id}`,
      assignment,
      authorName: demoStudent,
      fileName: assignment.fileName,
      reviews: feedback.map((review) => ({
        ...review,
        reviewerName: receivedReviewerNames.get(review.id) ?? review.reviewer,
      })),
    })
  }

  return works
}
