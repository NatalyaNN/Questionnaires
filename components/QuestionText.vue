<template>
   <div>
      <label :for="'question-' + question.id">{{ question.question }}<span v-if="question.required">*</span></label>
      <input v-if="question.type === 'text'" :id="'question-' + question.id" type="text" :value="modelValue"
         @input="$emit('update:modelValue', $event.target.value)" />
      <textarea v-else :id="'question-' + question.id" :value="modelValue"
         @input="$emit('update:modelValue', $event.target.value)" rows="4"></textarea>
   </div>
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
   }
});

defineEmits(['update:modelValue']);
</script>

<style>
label {
   display: block;
   margin-bottom: 8px;
   font-weight: bold;
}

input,
textarea {
   width: 100%;
   padding: 8px;
   border: 1px solid #ddd;
   border-radius: 4px;
   box-sizing: border-box;
}

span {
   color: red;
   margin-left: 4px;
}
</style>