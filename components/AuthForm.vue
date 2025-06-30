<template>
   <UForm @submit="handleSubmit">
      <UFormField label="Email" name="email">
         <UInput v-model="email" type="email" />
      </UFormField>

      <UFormField label="Пароль" name="password">
         <UInput v-model="password" type="password" />
      </UFormField>

      <UButton type="submit" block>
         Войти
      </UButton>
   </UForm>
</template>

<script setup>
import { UFormField } from '#components';

const email = ref('');
const password = ref('');

const handleSubmit = async () => {
   try {
      const { data } = await useFetch('/api/auth/login', {
         method: 'POST',
         body: { email: email.value, password: password.value }
      });

      useToast().add({
         title: 'Успешный вход',
         color: 'green'
      });

      // Обновляем состояние аутентификации
      const auth = useAuth();
      auth.value.isAuthenticated = true;
      auth.value.user = data.value.user;

      // Перенаправляем на главную
      await navigateTo('/');
   } catch (error) {
      useToast().add({
         title: 'Ошибка входа',
         description: error.data?.message || 'Неверные учетные данные',
         color: 'red'
      });
   }
};
</script>