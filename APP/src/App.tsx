import { useState } from 'react'
import Form from '@rjsf/mui'
import { RJSFSchema } from '@rjsf/utils'
import validator from '@rjsf/validator-ajv8'
import { CssBaseline, Container, Typography, Paper } from '@mui/material'

const schema: RJSFSchema = {
  title: "Formulário de Exemplo",
  type: "object",
  required: ["nome", "email"],
  properties: {
    nome: {
      type: "string",
      title: "Nome",
      minLength: 3
    },
    email: {
      type: "string",
      title: "E-mail",
      format: "email"
    },
    idade: {
      type: "integer",
      title: "Idade",
      minimum: 0
    },
    observacoes: {
      type: "string",
      title: "Observações",
      maxLength: 500
    }
  }
}

function App() {
  const [formData, setFormData] = useState(null)

  const handleSubmit = ({ formData }: any) => {
    console.log("Form submitted:", formData)
    setFormData(formData)
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
