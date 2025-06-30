<template>
   <UCard>
     <h2 class="text-xl font-bold">Мои ответы</h2>
     <div v-for="response in responses" :key="response.id">
       <h3>{{ response.survey.title }}</h3>
       <pre>{{ response.answers }}</pre>
     </div>
   </UCard>
 </template>
 
 <script setup>
 const { data: responses } = await useFetch('/api/profile/responses');
 </script>