import { Paper, Typography } from '@mui/material'

interface SubmittedDataProps {
  formData: any
}

export const SubmittedData = ({ formData }: SubmittedDataProps) => {
  if (!formData) return null

  return (
    <Paper
      sx={{
        bgcolor: 'background.paper',
        width: '100%',
        mt: 2,
        p: 2,
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          mb: 1,
          fontWeight: 500,
          color: 'primary.main'
        }}
      >
        Dados Submetidos:
      </Typography>
      <Paper
        sx={{
          bgcolor: '#2d2d2d',
        }}
        elevation={0}
      >
        <pre style={{ margin: 0, color: '#fff' }}>
          {JSON.stringify(formData, null, 2)}
        </pre>
      </Paper>
    </Paper>
  )
}