<template>
  <div class="container">
    <h1>Formulário Dinâmico com JSON Forms</h1>
    <json-forms
      :data="data"
      :schema="schema"
      :uischema="uischema"
      :renderers="renderers"
      @change="onChange"
    />
    <div class="output">
      <h3>Dados do Formulário:</h3>
      <pre>{{ JSON.stringify(data, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { JsonForms } from '@jsonforms/vue'
import { vanillaRenderers } from '@jsonforms/vue-vanilla'

const schema = {
  type: 'object',
  properties: {
    nome: {
      type: 'string',
      description: 'Digite seu nome completo'
    },
    email: {
      type: 'string',
      format: 'email',
      description: 'Digite seu email'
    },
    idade: {
      type: 'integer',
      description: 'Digite sua idade',
      minimum: 0
    },
    profissao: {
      type: 'string',
      enum: ['Desenvolvedor', 'Designer', 'Gerente', 'Outro'],
      description: 'Selecione sua profissão'
    }
  },
  required: ['nome', 'email']
}

const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/nome'
    },
    {
      type: 'Control',
      scope: '#/properties/email'
    },
    {
      type: 'Control',
      scope: '#/properties/idade'
    },
    {
      type: 'Control',
      scope: '#/properties/profissao'
    }
  ]
}

const data = ref({})
const renderers = ref(vanillaRenderers)

const onChange = (event) => {
  data.value = event.data
}
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.output {
  margin-top: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

h1 {
  color: #2c3e50;
  margin-bottom: 30px;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
