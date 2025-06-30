<template>
   <UFormField :label="question.question" :required="question.required" :error="error">
      <URadioGroup :value="modelValue" @update:modelValue="$emit('update:modelValue', $event)"
         :items="question.options.map(opt => ({ value: opt, label: opt }))" />
   </UFormField>
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