<template>
   <UFormGroup :label="question.question" :required="question.required" :error="error">
      <div class="space-y-2">
         <UCheckbox v-for="(option, index) in question.options" :key="index" v-model="modelValue" :value="option"
            :label="option" :name="'question-' + question.id" />
      </div>
   </UFormGroup>
</template>

<script setup>
defineProps({
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

defineEmits(['update:modelValue']);
</script>