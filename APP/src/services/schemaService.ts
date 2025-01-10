import axios from 'axios'
import { RJSFSchema } from '@rjsf/utils'

const API_URL = 'http://localhost:5000'

export const getJsonSchema = async (schemaName: string): Promise<RJSFSchema> => {
  try {
    const response = await axios.get(`${API_URL}/Schema`, {
      params: {
        schemaName
      }
    })
    const schema = response.data
    delete schema.$schema//TODO: revisa, pois estava dando erro quando fazia validação 
    return schema
  } catch (error) {
    console.error('Erro ao buscar o schema:', error)
    throw new Error('Não foi possível carregar o schema do formulário')
  }
}