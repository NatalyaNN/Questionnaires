<template>
   <UForm @submit="saveSurvey">
     <UFormField label="Название">
       <UInput v-model="title" />
     </UFormField>
     
     <UFormField label="Вопросы">
       <QuestionEditor v-model="questions" />
     </UFormField>
     
     <UButton type="submit">Сохранить</UButton>
   </UForm>
 </template>
 
 <script setup>
 const title = ref('');
 const questions = ref([]);
 
 const saveSurvey = async () => {
   await $fetch('/api/admin/surveys', {
     method: 'POST',
     body: { title, questions }
   });
 };
 </script>