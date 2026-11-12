import { useState } from 'react'
import type { FormEvent } from 'react'
import { Alert, Button, MenuItem, Paper, Stack, TextField } from '@mui/material'
import { isStudyGroup, studyGroups } from '../../entities/assignment/assignment'
import type { AssignmentDraft } from '../../entities/assignment/assignment'

type Field = keyof AssignmentDraft
type Errors = Partial<Record<Field, string>>

interface AssignmentFormProps {
  onPublish: (draft: AssignmentDraft) => boolean
}

export default function AssignmentForm({ onPublish }: AssignmentFormProps) {
  const [errors, setErrors] = useState<Errors>({})
  const [saveError, setSaveError] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaveError(false)

    const data = new FormData(event.currentTarget)
    const title = String(data.get('title') ?? '').trim()
    const description = String(data.get('description') ?? '').trim()
    const group = data.get('group')
    const submissionDeadline = new Date(String(data.get('submissionDeadline') ?? ''))
    const reviewDeadline = new Date(String(data.get('reviewDeadline') ?? ''))
    const nextErrors: Errors = {}
    if (!title || title.length > 200) nextErrors.title = 'Введите название до 200 символов.'
    if (!description || description.length > 5000) {
      nextErrors.description = 'Введите описание до 5000 символов.'
    }
    if (!isStudyGroup(group)) nextErrors.group = 'Выберите группу.'
    if (Number.isNaN(submissionDeadline.getTime())) {
      nextErrors.submissionDeadline = 'Укажите дату и время сдачи.'
    }
    if (Number.isNaN(reviewDeadline.getTime())) {
      nextErrors.reviewDeadline = 'Укажите дату и время проверки.'
    } else if (reviewDeadline < submissionDeadline) {
      nextErrors.reviewDeadline = 'Срок проверки должен быть не раньше срока сдачи.'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0 || !isStudyGroup(group)) return

    setSaveError(!onPublish({
      title,
      description,
      group,
      submissionDeadline: submissionDeadline.toISOString(),
      reviewDeadline: reviewDeadline.toISOString(),
    }))
  }

  function field(name: Field) {
    return { name, required: true, error: Boolean(errors[name]), helperText: errors[name] }
  }

  return (
    <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}>
      <Stack component="form" noValidate onSubmit={handleSubmit} spacing={3}>
        <TextField
          {...field('title')}
          label="Название"
          slotProps={{ htmlInput: { maxLength: 200 } }}
        />
        <TextField
          {...field('description')}
          label="Описание задания"
          multiline
          minRows={4}
          slotProps={{ htmlInput: { maxLength: 5000 } }}
        />
        <TextField {...field('group')} label="Группа" select defaultValue="">
          {studyGroups.map((group) => <MenuItem key={group} value={group}>{group}</MenuItem>)}
        </TextField>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            {...field('submissionDeadline')}
            label="Срок сдачи"
            type="datetime-local"
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            {...field('reviewDeadline')}
            label="Срок проверки"
            type="datetime-local"
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Stack>
        {saveError && <Alert severity="error">Не удалось опубликовать задание. Попробуйте ещё раз.</Alert>}
        <Button type="submit" variant="contained" sx={{ alignSelf: 'flex-start' }}>
          Опубликовать задание
        </Button>
      </Stack>
    </Paper>
  )
}
