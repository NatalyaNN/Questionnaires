<template>
   <form @submit.prevent="submitForm">
      <div v-for="question in questions" :key="question.id" class="question">
         <component :is="getQuestionComponent(question.type)" :question="question" v-model="formData[question.id]" />
      </div>
      <button type="submit" class="submit-btn">Отправить</button>
   </form>
</template>

<script setup>
import QuestionText from './QuestionText.vue';
import QuestionRadio from './QuestionRadio.vue';
import QuestionCheckbox from './QuestionCheckbox.vue';

const props = defineProps({
   questions: {
      type: Array,
      required: true
   }
});

const emit = defineEmits(['submit']);

const formData = ref({});

const getQuestionComponent = (type) => {
   switch (type) {
      case 'text':
      case 'textarea':
         return QuestionText;
      case 'radio':
         return QuestionRadio;
      case 'checkbox':
         return QuestionCheckbox;
      default:
         return QuestionText;
   }
};

const submitForm = () => {
   // Проверка обязательных вопросов
   for (const question of props.questions) {
      if (question.required && !formData.value[question.id]) {
         alert(`Пожалуйста, ответьте на вопрос: "${question.question}"`);
         return;
      }
   }

   emit('submit', formData.value);
};
</script>

<style>
.question {
   margin-bottom: 20px;
}

.submit-btn {
   padding: 10px 20px;
   background-color: #4CAF50;
   color: white;
   border: none;
   border-radius: 4px;
   cursor: pointer;
}

.submit-btn:hover {
   background-color: #45a049;
}
</style>