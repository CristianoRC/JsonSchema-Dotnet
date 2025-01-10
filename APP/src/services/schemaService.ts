import axios from 'axios'
import { RJSFSchema } from '@rjsf/utils'

const API_URL = 'http://localhost:5000'

export const getJsonSchema = async (nomeSchema: string): Promise<RJSFSchema> => {
  try {
    const response = await axios.get(`${API_URL}/Schema`, {
      params: {
        schemaName: nomeSchema
      }
    })
    return response.data
  } catch (error) {
    console.error('Erro ao buscar o schema:', error)
    throw new Error('Não foi possível carregar o schema do formulário')
  }
}