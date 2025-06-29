<template>
   <div class="container">
      <h1>Анкета</h1>
      <SurveyForm :questions="questions" @submit="handleSubmit" />
   </div>
</template>

<script setup>
const questions = [
   {
      id: 1,
      type: 'text',
      question: 'Как вас зовут?',
      required: true
   },
   {
      id: 2,
      type: 'radio',
      question: 'Ваш возраст?',
      options: ['До 18', '18-25', '26-35', '36-45', 'Старше 45'],
      required: true
   },
   {
      id: 3,
      type: 'checkbox',
      question: 'Какие технологии вы используете?',
      options: ['Vue.js', 'React', 'Angular', 'Svelte', 'Другое'],
      required: false
   },
   {
      id: 4,
      type: 'textarea',
      question: 'Ваши пожелания или комментарии',
      required: false
   }
];

const handleSubmit = async (answers) => {
   try {
      const { data } = await useFetch('/api/submit', {
         method: 'POST',
         body: { answers }
      });
      alert('Спасибо за участие в опросе!');
   } catch (error) {
      console.error('Ошибка при отправке:', error);
      alert('Произошла ошибка при отправке формы');
   }
};
</script>

<style>
.container {
   max-width: 800px;
   margin: 0 auto;
   padding: 20px;
}
</style>