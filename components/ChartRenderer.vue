<template>
   <div class="chart-container">
     <Bar v-if="type === 'bar'" :data="data" :options="options" />
     <Pie v-else-if="type === 'pie'" :data="data" :options="options" />
     <Line v-else-if="type === 'line'" :data="data" :options="options" />
   </div>
 </template>
 
 <script setup>
 import { Bar, Pie, Line } from 'vue-chartjs';
 import {
   Chart as ChartJS,
   Title,
   Tooltip,
   Legend,
   BarElement,
   ArcElement,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement
 } from 'chart.js';
 
 ChartJS.register(
   Title,
   Tooltip,
   Legend,
   BarElement,
   ArcElement,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement
 );
 
 defineProps({
   type: {
     type: String,
     required: true,
     validator: (val) => ['bar', 'pie', 'line'].includes(val)
   },
   data: {
     type: Object,
     required: true
   },
   options: {
     type: Object,
     default: () => ({})
   }
 });
 </script>
 
 <style>
 .chart-container {
   position: relative;
   height: 300px;
   width: 100%;
 }
 </style>