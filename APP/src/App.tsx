import { useState, useEffect } from 'react'
import Form from '@rjsf/mui'
import { RJSFSchema } from '@rjsf/utils'
import validator from '@rjsf/validator-ajv8'
import { CssBaseline, Container, Typography, Paper } from '@mui/material'
import axios from 'axios'

function App() {
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
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography>Carregando schema...</Typography>
      </Container>
    )
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Exemplo de Formulário JSON Schema
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Form
            schema={schema}
            validator={validator}
            onSubmit={handleSubmit}
          />
        </Paper>
        {formData && (
          <Paper sx={{ mt: 3, p: 3 }}>
            <Typography variant="h6">Dados Submetidos:</Typography>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </Paper>
        )}
      </Container>
    </>
  )
}

export default App
