<template>
   <div>
      <p>{{ question.question }}<span v-if="question.required">*</span></p>
      <div v-for="(option, index) in question.options" :key="index" class="checkbox-option">
         <input type="checkbox" :id="'question-' + question.id + '-' + index" :value="option"
            :checked="modelValue && modelValue.includes(option)"
            @change="handleCheckboxChange(option, $event.target.checked)" />
         <label :for="'question-' + question.id + '-' + index">{{ option }}</label>
      </div>
   </div>
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
   }
});

const emit = defineEmits(['update:modelValue']);

const handleCheckboxChange = (option, isChecked) => {
   let newValue = [...props.modelValue];
   if (isChecked) {
      newValue.push(option);
   } else {
      newValue = newValue.filter(item => item !== option);
   }
   emit('update:modelValue', newValue);
};
</script>

<style>
.checkbox-option {
   margin-bottom: 8px;
   display: flex;
   align-items: center;
}

.checkbox-option input {
   width: auto;
   margin-right: 8px;
}
</style>