<template>
  <UFormField
    :label="question.question"
    :required="question.required"
    :error="error"
  >
    <USelect
      :value="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      :options="question.options"
      :placeholder="question.placeholder || 'Выберите вариант'"
    />
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