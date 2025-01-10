import { useState, useEffect } from 'react'
import Form from '@rjsf/mui'
import { RJSFSchema } from '@rjsf/utils'
import validator from '@rjsf/validator-ajv8'
import { CssBaseline, Container, Typography, Paper, createTheme, ThemeProvider, Box } from '@mui/material'
import axios from 'axios'

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9',
      },
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
      text: {
        primary: '#ffffff',
        secondary: 'rgba(255, 255, 255, 0.7)',
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
            borderRadius: 8,
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            maxWidth: '800px !important',
          },
        },
      },
    },
  })

  const [formData, setFormData] = useState(null)
  const [schema, setSchema] = useState<RJSFSchema | null>(null)

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Schema', {
          params: {
            schemaName: 'car'
          }
        })
        setSchema(response.data)
      } catch (error) {
        console.error('Erro ao buscar o schema:', error)
      }
    }

    fetchSchema()
  }, [])

  const handleSubmit = ({ formData }: any) => {
    console.log("Form submetido:", formData)
    setFormData(formData)
  }

  if (!schema) {
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
          px: 2,
          boxSizing: 'border-box',
        }}
      >
        <Container 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '600px !important',
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{
              fontWeight: 600,
              textAlign: 'center',
              mb: 3,
              color: 'primary.main',
              wordBreak: 'break-word',
            }}
          >
            JSON Schema Form Demo
          </Typography>
          <Paper 
            sx={{ 
              p: 3,
              bgcolor: 'background.paper',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <Form
              schema={schema}
              validator={validator}
              onSubmit={handleSubmit}
              className="custom-form"
              uiSchema={{
                "ui:submitButtonOptions": {
                  "props": {
                    "size": "large",
                    "variant": "contained",
                    "fullWidth": true
                  }
                }
              }}
            />
          </Paper>
          {formData && (
            <Paper 
              sx={{ 
                mt: 3, 
                p: 3,
                bgcolor: 'background.paper',
                width: '100%'
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 2,
                  fontWeight: 500,
                  color: 'primary.main'
                }}
              >
                Dados Submetidos:
              </Typography>
              <Paper 
                sx={{ 
                  p: 2, 
                  bgcolor: '#2d2d2d',
                  fontFamily: 'monospace'
                }}
                elevation={0}
              >
                <pre style={{ margin: 0, color: '#fff' }}>
                  {JSON.stringify(formData, null, 2)}
                </pre>
              </Paper>
            </Paper>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
