<template>
   <SurveyForm @submit="createSurvey" />
 </template>
 
 <script setup>
 const createSurvey = async (data) => {
   await $fetch('/api/admin/surveys', {
     method: 'POST',
     body: data
   });
   navigateTo('/admin');
 };
 </script>