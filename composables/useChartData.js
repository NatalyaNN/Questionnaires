import { ref, computed } from 'vue';

export const useChartData = () => {
   const { data: responses } = useFetch('/api/responses');

   const charts = computed(() => {
      if (!responses.value) return [];

      // Анализ ответов
      const ageData = analyzeAge(responses.value);
      const techData = analyzeTechnologies(responses.value);

      return [
         {
            title: 'Распределение по возрастам',
            type: 'bar',
            data: {
               labels: ageData.labels,
               datasets: [{
                  label: 'Количество ответов',
                  data: ageData.values,
                  backgroundColor: '#3b82f6'
               }]
            },
            options: { responsive: true }
         },
         {
            title: 'Используемые технологии',
            type: 'pie',
            data: {
               labels: techData.labels,
               datasets: [{
                  data: techData.values,
                  backgroundColor: [
                     '#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6'
                  ]
               }]
            },
            options: { responsive: true }
         }
      ];
   });

   const exportToCSV = () => {
      // Реализация экспорта данных
      const csvContent = convertToCSV(responses.value);
      downloadCSV(csvContent, 'survey_results.csv');
   };

   return { charts, exportToCSV };
};

// Вспомогательные функции анализа
function analyzeAge(responses) {
   const ageGroups = {
      'До 18': 0,
      '18-25': 0,
      '26-35': 0,
      '36-45': 0,
      'Старше 45': 0
   };

   responses.forEach(r => {
      const age = r.answers[2]; // ID вопроса о возрасте
      if (age && ageGroups[age] !== undefined) {
         ageGroups[age]++;
      }
   });

   return {
      labels: Object.keys(ageGroups),
      values: Object.values(ageGroups)
   };
}

function analyzeTechnologies(responses) {
   const techCount = {
      'Vue.js': 0,
      'React': 0,
      'Angular': 0,
      'Svelte': 0,
      'Другое': 0
   };

   responses.forEach(r => {
      const techs = r.answers[3] || []; // ID вопроса о технологиях
      techs.forEach(tech => {
         if (techCount[tech] !== undefined) {
            techCount[tech]++;
         }
      });
   });

   return {
      labels: Object.keys(techCount),
      values: Object.values(techCount)
   };
}