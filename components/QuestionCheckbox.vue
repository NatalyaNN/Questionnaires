<template>
   <UFormField :label="question.question" :required="question.required" :error="error">
      <div class="space-y-2">
         <UCheckbox v-for="(option, index) in question.options" :key="index" :model-value="modelValue"
            @update:modelValue="handleCheckboxChange($event, option)" :label="option"
            :name="'question-' + question.id" />
      </div>
   </UFormField>
</template>

<script setup lang="ts">
const props = defineProps({
   question: {
      type: Object,
      required: true,
      validator: (q) => {
         // Проверяем, что вопрос сериализуем
         try {
            JSON.stringify(q);
            return true;
         } catch {
            return false;
         }
      }
   },
   modelValue: {
      type: Array,
      default: () => []
   },
   error: {
      type: String,
      default: ''
   }
});

const emit = defineEmits(['update:modelValue']);

const handleCheckboxChange = (checked: boolean, option: string) => {
   let newValue = [...props.modelValue];
   if (checked) {
      if (!newValue.includes(option)) {
         newValue.push(option);
      }
   } else {
      newValue = newValue.filter(item => item !== option);
   }
   emit('update:modelValue', newValue);
};
</script>