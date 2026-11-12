import { useState } from 'react'
import type { FormEvent } from 'react'
import { Alert, Button, Stack, Typography } from '@mui/material'

interface SubmissionFormProps {
  onSubmit: (fileName: string) => boolean
}

export default function SubmissionForm({ onSubmit }: SubmissionFormProps) {
  const [fileError, setFileError] = useState('')
  const [saveError, setSaveError] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaveError(false)
    const file = new FormData(event.currentTarget).get('assignmentFile')
    if (!(file instanceof File) || !file.name) {
      setFileError('Выберите файл работы.')
      return
    }
    if (!/\.(zip|pdf)$/i.test(file.name)) {
      setFileError('Выберите файл в формате ZIP или PDF.')
      return
    }
    if (file.size === 0) {
      setFileError('Выбранный файл пуст.')
      return
    }
    setSaveError(!onSubmit(file.name))
  }

  return (
    <Stack
      component="form"
      spacing={2}
      onSubmit={handleSubmit}
      sx={{ alignItems: 'flex-start', width: '100%' }}
    >
      <Typography component="label" variant="body2" sx={{ maxWidth: '100%' }}>
        Файл работы
        <input
          type="file"
          name="assignmentFile"
          accept=".zip,.pdf"
          aria-invalid={Boolean(fileError)}
          aria-describedby={fileError ? 'assignment-file-error' : undefined}
          onChange={() => setFileError('')}
          style={{ display: 'block', marginTop: 8, maxWidth: '100%' }}
        />
      </Typography>
      {fileError && (
        <Typography id="assignment-file-error" variant="body2" color="error" role="alert">
          {fileError}
        </Typography>
      )}
      {saveError && <Alert severity="error">Не удалось сохранить работу. Попробуйте ещё раз.</Alert>}
      <Button type="submit" variant="contained">Отправить работу</Button>
    </Stack>
  )
}
