import { Alert, Button, CircularProgress, Stack, Typography } from '@mui/material'
import PageFrame from './PageFrame'

type DataStatusProps =
  | { status: 'loading' }
  | { status: 'error'; message: string; onRetry: () => void; onReset: () => void }

export default function DataStatus(props: DataStatusProps) {
  if (props.status === 'loading') {
    return (
      <PageFrame title="Загрузка">
        <Stack direction="row" spacing={2} role="status" sx={{ alignItems: 'center' }}>
          <CircularProgress size={24} aria-hidden />
          <Typography>Загружаем данные…</Typography>
        </Stack>
      </PageFrame>
    )
  }

  return (
    <PageFrame title="Ошибка загрузки">
      <Alert severity="error">{props.message}</Alert>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button onClick={props.onRetry} variant="contained">Повторить</Button>
        <Button onClick={props.onReset}>Восстановить исходные демоданные</Button>
      </Stack>
    </PageFrame>
  )
}
