<template>
   <UForm :schema="schema" :state="state" @submit="submit">
     <UFormField label="Название анкеты" name="title" required>
       <UInput v-model="state.title" />
       <UFormError name="title" />
     </UFormField>
 
     <UFormField label="Описание" name="description" class="mt-4">
       <UTextarea v-model="state.description" />
     </UFormField>
 
     <div v-for="(question, index) in state.questions" :key="index" class="mt-6 border p-4 rounded-lg">
       <UFormField :label="`Вопрос ${index + 1}`" :name="`question-${index}`">
         <QuestionEditor v-model="state.questions[index]" @remove="removeQuestion(index)" />
       </UFormField>
     </div>
 
     <UButton type="button" @click="addQuestion" variant="outline" class="mt-4">
       Добавить вопрос
     </UButton>
 
     <div class="flex gap-3 mt-6">
       <UButton type="submit">
         {{ surveyId ? 'Обновить' : 'Создать' }}
       </UButton>
       <UButton type="button" variant="outline" @click="$emit('cancel')">
         Отмена
       </UButton>
     </div>
   </UForm>
 </template>

<script setup lang="ts">
import { UFormField } from '#components';
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const props = defineProps({
  surveyId: { type: Number, default: null }
});

const emit = defineEmits(['submit', 'cancel']);

// Валидация
const questionSchema = z.object({
  text: z.string().min(1, 'Введите текст вопроса'),
  type: z.enum(['text', 'radio', 'checkbox']),
  options: z.array(z.string()).optional(),
  required: z.boolean()
});

const schema = z.object({
  title: z.string().min(1, 'Введите название'),
  questions: z.array(questionSchema).min(1, 'Добавьте вопросы')
});

// Состояние формы
const state = reactive({
  title: '',
  description: '',
  questions: [
    { type: 'text', text: '', required: true }
  ]
});

// Загрузка данных при редактировании
if (props.surveyId) {
  const { data } = await useFetch(`/api/surveys/${props.surveyId}`);
  Object.assign(state, data.value);
}

// Методы
const addQuestion = () => {
  state.questions.push({ type: 'text', text: '', required: true });
};

const removeQuestion = (index: number) => {
  state.questions.splice(index, 1);
};

const submit = async () => {
  emit('submit', { ...state });
};
</script>