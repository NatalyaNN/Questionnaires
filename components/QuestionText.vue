<template>
   <UFormField :label="question.question" :required="question.required" :error="error">
      <UTextarea v-if="question.type === 'textarea'" :value="modelValue"
         @update:modelValue="$emit('update:modelValue', $event)" :placeholder="question.placeholder" resize />
      <UInput v-else :value="modelValue" @update:modelValue="$emit('update:modelValue', $event)"
         :placeholder="question.placeholder" type="text" />
   </UFormField>
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