<template>
   <UContainer class="py-10">
     <UCard>
       <template #header>
         <div class="flex justify-between items-center">
           <h1 class="text-2xl font-bold">Аналитика ответов</h1>
           <UButton
             icon="i-heroicons-arrow-down-tray"
             label="Экспорт в CSV"
             @click="exportToCSV"
           />
         </div>
       </template>
 
       <div class="space-y-12">
         <div v-for="(chart, index) in charts" :key="index">
           <h2 class="text-xl font-semibold mb-4">{{ chart.title }}</h2>
           <ChartRenderer :type="chart.type" :data="chart.data" :options="chart.options" />
         </div>
       </div>
     </UCard>
   </UContainer>
 </template>
 
 <script setup>
 import { useChartData } from '@/composables/useChartData';
 
 const { charts, exportToCSV } = useChartData();
 
 // Для серверного рендеринга данных
 const { data: surveyData } = await useFetch('/api/responses');
 </script>