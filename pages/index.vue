<template>
   <UContainer class="py-10">
      <UCard>
         <template #header>
            <h1 class="text-2xl font-bold text-center">Анкета</h1>
         </template>

         <SurveyForm :questions="questions" @submit="handleSubmit" />

         <template #footer>
            <div class="text-center text-gray-500 text-sm">
               Спасибо за участие в нашем опросе!
            </div>
         </template>
      </UCard>
   </UContainer>
</template>

<script setup>
const questions = [
   {
      id: 1,
      type: 'text',
      question: 'Как вас зовут?',
      required: true,
      placeholder: 'Введите ваше имя'
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
      required: false,
      placeholder: 'Напишите ваши комментарии...'
   },
   {
      id: 5,
      type: 'select',
      question: 'Как вы узнали о нас?',
      options: ['Поиск в интернете', 'Социальные сети', 'Рекомендации', 'Другое'],
      required: true
   }
];

const handleSubmit = async (answers) => {
   try {
      const { data } = await useFetch('/api/submit', {
         method: 'POST',
         body: { answers }
      });

      useToast().add({
         title: 'Успешно!',
         description: 'Спасибо за участие в опросе!',
         icon: 'i-heroicons-check-circle',
         color: 'green'
      });
   } catch (error) {
      useToast().add({
         title: 'Ошибка',
         description: 'Произошла ошибка при отправке формы',
         icon: 'i-heroicons-exclamation-circle',
         color: 'red'
      });
      console.error('Ошибка при отправке:', error);
   }
};
</script>