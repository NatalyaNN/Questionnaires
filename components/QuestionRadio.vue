<template>
   <div>
      <p>{{ question.question }}<span v-if="question.required">*</span></p>
      <div v-for="(option, index) in question.options" :key="index" class="radio-option">
         <input type="radio" :id="'question-' + question.id + '-' + index" :name="'question-' + question.id"
            :value="option" :checked="modelValue === option" @change="$emit('update:modelValue', option)" />
         <label :for="'question-' + question.id + '-' + index">{{ option }}</label>
      </div>
   </div>
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
   }
});

defineEmits(['update:modelValue']);
</script>

<style>
.radio-option {
   margin-bottom: 8px;
   display: flex;
   align-items: center;
}

.radio-option input {
   width: auto;
   margin-right: 8px;
}
</style>