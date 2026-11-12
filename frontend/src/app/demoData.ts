import { isStudyGroup } from '../entities/assignment/assignment'
import type { Assignment } from '../entities/assignment/assignment'
import { assignments } from '../entities/assignment/demoAssignments'
import { reviews, rubric } from '../entities/review/reviewData'
import type { DemoReview } from '../entities/review/reviewData'

const storageKey = 'checkly:demo:v2'
const previousStorageKey = 'checkly:demo:v1'

export interface DemoData {
  assignments: Assignment[]
  reviews: DemoReview[]
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isId(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value > 0
}

function isDate(value: unknown): value is string {
  return typeof value === 'string' && Number.isFinite(Date.parse(value))
}

function isAssignment(value: unknown): value is Assignment {
  return isRecord(value)
    && isId(value.id)
    && typeof value.title === 'string'
    && typeof value.description === 'string'
    && isStudyGroup(value.group)
    && isDate(value.submissionDeadline)
    && isDate(value.reviewDeadline)
    && (value.fileName === null || typeof value.fileName === 'string')
}

function isReview(value: unknown): value is DemoReview {
  return isRecord(value)
    && isId(value.id)
    && isId(value.assignmentId)
    && isId(value.workNumber)
    && typeof value.completed === 'boolean'
    && typeof value.reviewedAt === 'string'
    && typeof value.strengths === 'string'
    && typeof value.remarks === 'string'
    && typeof value.recommendations === 'string'
    && Array.isArray(value.scores)
    && value.scores.length === (value.completed ? rubric.length : 0)
    && value.scores.every((score: unknown) =>
      typeof score === 'number' && Number.isInteger(score) && score >= 0 && score <= 5)
}

export function loadDemoData(): DemoData {
  const current = sessionStorage.getItem(storageKey)
  const saved = current ?? sessionStorage.getItem(previousStorageKey)
  if (saved === null) {
    return { assignments, reviews }
  }
  const data: unknown = JSON.parse(saved)
  if (!isRecord(data) || !Array.isArray(data.assignments)
    || !Array.isArray(data.reviews) || !data.reviews.every(isReview)) {
    throw new Error('Некорректные демонстрационные данные.')
  }

  // The previous demo assigned the active student to the first group.
  const savedAssignments: unknown[] = current === null
    ? data.assignments.map((assignment: unknown) => {
      if (!isRecord(assignment) || isStudyGroup(assignment.group)) return assignment
      const group = assignment.group === 'БВТ-2401' ? 'БПИ-2402'
        : assignment.group === 'БВТ-2402' ? 'БПИ-2401' : assignment.group
      return { ...assignment, group }
    })
    : data.assignments
  if (!savedAssignments.every(isAssignment)) {
    throw new Error('Некорректные демонстрационные данные.')
  }
  return { assignments: savedAssignments, reviews: data.reviews }
}

export function saveDemoData(data: DemoData) {
  sessionStorage.setItem(storageKey, JSON.stringify(data))
}

export function clearDemoData() {
  sessionStorage.removeItem(storageKey)
  sessionStorage.removeItem(previousStorageKey)
}
