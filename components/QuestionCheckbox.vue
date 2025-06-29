<template>
   <UFormField :label="question.question" :required="question.required" :error="error">
      <div class="space-y-2">
         <UCheckbox v-for="(option, index) in question.options" :key="index" :model-value="modelValue"
            @update:modelValue="handleCheckboxChange($event, option)" :label="option"
            :name="'question-' + question.id" />
      </div>
   </UFormField>
</template>

<script setup>
const props = defineProps({
   question: {
      type: Object,
      required: true
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

const handleCheckboxChange = (checked, option) => {
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