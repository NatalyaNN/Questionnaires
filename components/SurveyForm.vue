<template>
   <form @submit.prevent="submitForm" class="space-y-6">
      <div v-for="question in questions" :key="question.id">
         <component :is="getQuestionComponent(question.type)" :question="question" v-model="formData[question.id]" />
      </div>

      <div class="flex justify-end">
         <UButton type="submit" color="primary">
            Отправить
         </UButton>
      </div>
   </form>
</template>

<script setup>
import QuestionText from './QuestionText.vue';
import QuestionRadio from './QuestionRadio.vue';
import QuestionCheckbox from './QuestionCheckbox.vue';
import QuestionSelect from './QuestionSelect.vue';

const props = defineProps({
   questions: {
      type: Array,
      required: true
   }
});

const emit = defineEmits(['submit']);

const formData = ref({});
const toast = useToast();

const getQuestionComponent = (type) => {
   const components = {
      text: QuestionText,
      textarea: QuestionText,
      radio: QuestionRadio,
      checkbox: QuestionCheckbox,
      select: QuestionSelect
   };
   return components[type] || QuestionText;
};

const submitForm = () => {
   // Проверка обязательных вопросов
   const unansweredRequired = props.questions.filter(
      q => q.required && !formData.value[q.id]
   );

   if (unansweredRequired.length > 0) {
      toast.add({
         title: 'Не все вопросы заполнены',
         description: `Пожалуйста, ответьте на вопрос: "${unansweredRequired[0].question}"`,
         icon: 'i-heroicons-exclamation-circle',
         color: 'amber'
      });
      return;
   }

   emit('submit', formData.value);
};
</script>