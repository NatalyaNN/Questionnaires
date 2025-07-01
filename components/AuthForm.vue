<template>
   <UForm :schema="schema" :state="state" @submit="handleSubmit">
      <UFormField label="Email" name="email" required>
         <UInput v-model="state.email" type="email" autocomplete="username" />
      </UFormField>

      <UFormField label="Пароль" name="password" class="mt-4" required>
         <UInput v-model="state.password" type="password" autocomplete="current-password" />
      </UFormField>

      <UButton type="submit" class="mt-6" block>
         Войти
      </UButton>
   </UForm>
</template>

<script setup lang="ts">
import { UFormField } from '#components';
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const toast = useToast();

const schema = z.object({
   email: z.string().email('Некорректный email').min(1, 'Обязательное поле'),
   password: z.string().min(8, 'Минимум 6 символов')
})

type Schema = z.output<typeof schema>

const state = reactive < Partial < Schema >> ({
   email: undefined,
   password: undefined
})

const handleSubmit = async (event: FormSubmitEvent<Schema>) => {
   try {
      const data = await $fetch('/api/auth/login', {
         method: 'POST',
         body: { email: state.email, password: state.password }
      });

      useToast().add({
         title: 'Успешный вход',
         color: 'success'
      });

      // Обновляем состояние аутентификации
      const auth = useAuth();
      auth.value.isAuthenticated = true;
      auth.value.user = data.user;

      // Перенаправляем на главную
      await navigateTo('/');
   } catch (error: any) {
      useToast().add({
         title: 'Ошибка входа',
         description: error.data?.message || 'Неверные учетные данные',
         color: 'warning'
      });
   }
};
</script>