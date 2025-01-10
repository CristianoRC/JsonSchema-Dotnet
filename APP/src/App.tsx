import { useState, useEffect } from 'react'
import Form from '@rjsf/mui'
import { RJSFSchema } from '@rjsf/utils'
import validator from '@rjsf/validator-ajv8'
import { CssBaseline, Container, Typography, Paper, ThemeProvider, Box } from '@mui/material'
import { theme } from './theme'
import { LoadingScreen } from './components/LoadingScreen'
import { getJsonSchema } from './services/schemaService'

function App() {
  const [formData, setFormData] = useState(null)
  const [schema, setSchema] = useState<RJSFSchema | null>(null)

  useEffect(() => {
    const carregarSchema = async () => {
      const jsonSchema = await getJsonSchema('car')
      setSchema(jsonSchema)
    }
    carregarSchema()
  }, [])

  const handleSubmit = ({ formData }: any) => {
    console.log("Form submetido:", formData)
    setFormData(formData)
  }

  if (!schema)
    return <LoadingScreen theme={theme} />

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
          py: 2,
          px: 2,
        }}
      >
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '500px !important',
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: 600,
              textAlign: 'center',
              mb: 2,
              color: 'primary.main',
            }}
          >
            JSON Schema Form Demo
          </Typography>
          <Paper
            sx={{
              px: 2,
              py: 2,
              bgcolor: 'background.paper',
              width: '100%',
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
                    "size": "medium",
                    "variant": "contained",
                    "fullWidth": true,
                    "sx": {
                      textTransform: 'none',
                      fontWeight: 500,
                      py: 1.5,
                      mt: 1,
                      borderRadius: 1,
                      backgroundColor: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      }
                    }
                  }
                },
                "*": {
                  "ui:classNames": "field-spacing",
                }
              }}
            />
          </Paper>
          {formData && (
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
          )}
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
