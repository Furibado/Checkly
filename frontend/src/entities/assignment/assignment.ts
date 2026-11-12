export const studyGroups = ['БПИ-2401', 'БПИ-2402'] as const
export type StudyGroup = typeof studyGroups[number]
export const studentGroup: StudyGroup = 'БПИ-2402'

export interface AssignmentDraft {
  title: string
  description: string
  group: StudyGroup
  submissionDeadline: string
  reviewDeadline: string
}

export interface Assignment extends AssignmentDraft {
  id: number
  fileName: string | null
}

const deadlineFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  hour: '2-digit',
  minute: '2-digit',
})

export function formatDeadline(deadline: string) {
  return deadlineFormatter.format(new Date(deadline))
}

export function isStudyGroup(value: unknown): value is StudyGroup {
  return studyGroups.some((group) => group === value)
}
