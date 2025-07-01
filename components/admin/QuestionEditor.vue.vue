<template>
  <div class="space-y-4">
    <UFormField label="Текст вопроса" name="text" required>
      <UInput v-model="model.text" />
      <UFormError name="text" />
    </UFormField>

    <UFormField label="Тип вопроса" name="type">
      <USelect 
        v-model="model.type" 
        :options="questionTypes" 
        @update:modelValue="handleTypeChange"
      />
    </UFormField>

    <template v-if="hasOptions">
      <UFormField label="Варианты ответов" name="options">
        <div v-for="(option, i) in model.options" :key="i" class="flex gap-2 mb-2">
          <UInput v-model="model.options[i]" />
          <UButton
            icon="i-heroicons-trash"
            color="red"
            variant="ghost"
            @click="removeOption(i)"
          />
        </div>
        <UButton @click="addOption" size="sm" variant="outline">
          Добавить вариант
        </UButton>
      </UFormField>
    </template>

    <UCheckbox v-model="model.required" label="Обязательный вопрос" />
  </div>
</template>
 
<script setup lang="ts">
const props = defineProps({
  modelValue: { type: Object, required: true }
});

const emit = defineEmits(['update:modelValue', 'remove']);

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const questionTypes = [
  { value: 'text', label: 'Текстовый ответ' },
  { value: 'radio', label: 'Один вариант' },
  { value: 'checkbox', label: 'Множественный выбор' }
];

const hasOptions = computed(() => 
  ['radio', 'checkbox'].includes(model.value.type)
);

const handleTypeChange = (type) => {
  if (['radio', 'checkbox'].includes(type) && !model.value.options) {
    model.value.options = ['Вариант 1', 'Вариант 2'];
  }
};

const addOption = () => {
  model.value.options.push(`Вариант ${model.value.options.length + 1}`);
};

const removeOption = (index) => {
  model.value.options.splice(index, 1);
};
</script>