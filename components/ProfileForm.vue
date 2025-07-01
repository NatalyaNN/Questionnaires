<template>
  <UForm :schema="schema" :state="state" @submit="submit" class="space-y-4">
    <UFormField label="Имя" name="name">
      <UInput v-model="state.name" />
    </UFormField>

    <UFormField label="Email" name="email">
      <UInput v-model="state.email" disabled />
    </UFormField>

    <UFormField label="Текущий пароль" name="currentPassword" required>
      <UInput v-model="state.currentPassword" type="password" autocomplete="current-password" />
    </UFormField>

    <UFormField label="Новый пароль" name="newPassword">
      <UInput v-model="state.newPassword" type="password" autocomplete="new-password" />
    </UFormField>

    <div class="flex gap-3 pt-4">
      <UButton type="submit" :loading="pending">
        Сохранить изменения
      </UButton>
      <UButton type="button" variant="outline" @click="navigateTo('/profile')">
        Отмена
      </UButton>
    </div>
  </UForm>
</template>

<script setup lang="ts">
import { z } from 'zod';

const { user } = useAuth();
const pending = ref(false);

// Схема валидации
const schema = z.object({
  name: z.string().min(2, 'Имя слишком короткое'),
  currentPassword: z.string().min(6, 'Минимум 6 символов'),
  newPassword: z
    .string()
    .min(8, 'Минимум 8 символов')
    .optional()
    .refine(
      val => !val || val !== state.currentPassword,
      'Новый пароль должен отличаться от текущего'
    )
});

// Состояние формы
const state = reactive({
  name: user.value?.name || '',
  email: user.value?.email || '',
  currentPassword: '',
  newPassword: ''
});

// Отправка формы
const submit = async () => {
  pending.value = true;
  try {
    await $fetch('/api/profile', {
      method: 'PUT',
      body: {
        name: state.name,
        ...(state.newPassword && {
          currentPassword: state.currentPassword,
          newPassword: state.newPassword
        })
      }
    });

    useToast().add({
      title: 'Профиль обновлен',
      icon: 'i-heroicons-check-circle',
      color: 'success'
    });
  } finally {
    pending.value = false;
  }
};
</script>