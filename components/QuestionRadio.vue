<template>
   <UFormGroup :label="question.question" :required="question.required" :error="error">
      <URadioGroup v-model="modelValue" :options="question.options" />
   </UFormGroup>
</template>

<script setup>
defineProps({
   question: {
      type: Object,
      required: true
   },
   modelValue: {
      type: [String, Number],
      default: ''
   },
   error: {
      type: String,
      default: ''
   }
});

defineEmits(['update:modelValue']);
</script>