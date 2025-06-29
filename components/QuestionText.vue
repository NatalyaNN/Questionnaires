<template>
   <UFormGroup :label="question.question" :required="question.required" :error="error">
      <UTextarea v-if="question.type === 'textarea'" v-model="modelValue" :placeholder="question.placeholder" resize />
      <UInput v-else v-model="modelValue" :placeholder="question.placeholder" type="text" />
   </UFormGroup>
</template>

<script setup>
defineProps({
   question: {
      type: Object,
      required: true
   },
   modelValue: {
      type: [String, Number, Array],
      default: ''
   },
   error: {
      type: String,
      default: ''
   }
});

defineEmits(['update:modelValue']);
</script>