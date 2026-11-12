import { useNavigate } from 'react-router'
import type { AssignmentDraft } from '../entities/assignment/assignment'
import AssignmentForm from '../features/publish-assignment/AssignmentForm'
import PageFrame from '../shared/ui/PageFrame'

export default function NewAssignmentPage(
  { onPublish }: { onPublish: (draft: AssignmentDraft) => boolean },
) {
  const navigate = useNavigate()

  return (
    <PageFrame title="Новое задание" backTo="/teacher/assignments" backLabel="К моим заданиям">
      <AssignmentForm onPublish={(draft) => {
        const saved = onPublish(draft)
        if (saved) navigate('/teacher/assignments', { replace: true })
        return saved
      }} />
    </PageFrame>
  )
}
