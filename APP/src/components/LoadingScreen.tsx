import { Box, CssBaseline, ThemeProvider, Typography } from '@mui/material'
import { Theme } from '@mui/material/styles'

interface LoadingScreenProps {
  theme: Theme
}

export const LoadingScreen = ({ theme }: LoadingScreenProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography>Carregando schema...</Typography>
      </Box>
    </ThemeProvider>
  )
}