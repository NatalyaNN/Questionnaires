<template>
  <UForm :schema="schema" :state="formState" @submit="submit" class="space-y-6">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
      {{ survey!.title }}
    </h1>

    <template v-for="(question, index) in survey!.questions" :key="index">
      <UFormField :label="question.text" :name="`question-${index}`" :required="question.required"
        class="border rounded-lg p-4">
        <component :is="getComponent(question.type)" v-model="formState.answers[index]" :question="question" />
      </UFormField>
    </template>

    <UButton type="submit" size="lg" :loading="pending" class="w-full sm:w-auto">
      Отправить ответы
    </UButton>
  </UForm>
</template>

<script setup lang="ts">
import { z } from 'zod';

const props = defineProps({
  surveyId: { type: Number, required: true }
});

const pending = ref(false);
const { data: survey } = await useFetch(`/api/surveys/${props.surveyId}`);

// Динамическая схема валидации на основе вопросов
const schema = computed(() => {
  const shape: Record<string, any> = {};

  survey.value?.questions?.forEach((q: any, index: number) => {
    if (q.required) {
      shape[`question-${index}`] = q.type === 'checkbox'
        ? z.array(z.string()).min(1, 'Выберите хотя бы один вариант')
        : z.string().min(1, 'Обязательный вопрос');
    }
  });

  return z.object(shape);
});

// Состояние формы
const formState = reactive({
  answers: [] as Array<string | string[]>
});

// Получение компонента для типа вопроса
const getComponent = (type: string) => {
  const components = {
    text: resolveComponent('TextQuestion'),
    radio: resolveComponent('RadioQuestion'),
    checkbox: resolveComponent('CheckboxQuestion')
  };
  return components[type] || components.text;
};

// Отправка ответов
const submit = async () => {
  pending.value = true;
  try {
    await $fetch('/api/responses', {
      method: 'POST',
      body: {
        surveyId: props.surveyId,
        answers: formState.answers
      }
    });

    await navigateTo('/profile/responses');
    useToast().add({
      title: 'Ответы сохранены',
      icon: 'i-heroicons-check-circle',
      color: 'success'
    });
  } finally {
    pending.value = false;
  }
};
</script>