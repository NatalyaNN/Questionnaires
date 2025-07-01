<template>
   <UContainer class="py-12">
     <UCard class="max-w-md mx-auto">
       <template #header>
         <h1 class="text-2xl font-bold text-center">Регистрация</h1>
       </template>
 
       <UForm :schema="schema" :state="state" @submit="handleSubmit" class="space-y-4">
         <UFormField label="Имя" name="name" required>
           <UInput v-model="state.name" autocomplete="name" />
         </UFormField>
 
         <UFormField label="Email" name="email" required>
           <UInput v-model="state.email" type="email" autocomplete="email" />
         </UFormField>
 
         <UFormField label="Пароль" name="password" required>
           <UInput 
             v-model="state.password" 
             type="password" 
             autocomplete="new-password" 
           />
         </UFormField>
 
         <UFormField label="Подтверждение пароля" name="confirmPassword" required>
           <UInput 
             v-model="state.confirmPassword" 
             type="password" 
             autocomplete="new-password" 
           />
         </UFormField>
 
         <UButton 
           type="submit" 
           block 
           :loading="pending"
           class="mt-6"
         >
           Зарегистрироваться
         </UButton>
       </UForm>
 
       <template #footer>
         <p class="text-center text-sm text-gray-500">
           Уже есть аккаунт? 
           <NuxtLink to="/login" class="text-primary hover:underline">
             Войти
           </NuxtLink>
         </p>
       </template>
     </UCard>
   </UContainer>
 </template>
 
 <script setup lang="ts">
 import { z } from 'zod';
 
let auth = useAuth();
const pending = ref(false);
const toast = useToast();
 
 // Схема валидации
 const schema = z.object({
   name: z.string().min(2, 'Имя слишком короткое'),
   email: z.string().email('Некорректный email'),
   password: z.string()
     .min(8, 'Минимум 8 символов')
     .regex(/[A-Z]/, 'Должна быть хотя бы одна заглавная буква')
     .regex(/[0-9]/, 'Должна быть хотя бы одна цифра'),
   confirmPassword: z.string()
 }).refine(
   data => data.password === data.confirmPassword, 
   {
     message: 'Пароли не совпадают',
     path: ['confirmPassword']
   }
 );
 
 // Состояние формы
 const state = reactive({
   name: '',
   email: '',
   password: '',
   confirmPassword: ''
 });
 
 // Обработка отправки
const handleSubmit = async () => {
   pending.value = true;
   try {
      // 1. Регистрация
      await $fetch('/api/auth/register', {
         method: 'POST',
         body: {
            name: state.name,
            email: state.email,
            password: state.password
         }
      });

      // 2. Автоматический вход
      const user = await $fetch('/api/auth/login', {
         method: 'POST',
         body: {
            email: state.email,
            password: state.password
         }
      });

      auth = {
         isAuthenticated: true,
         user
      };

      toast.add({
         title: 'Регистрация успешна!',
         icon: 'i-heroicons-check-circle',
         color: 'success'
      });

      await navigateTo('/profile');
   } catch (error: any) {
      toast.add({
         title: 'Ошибка регистрации',
         description: error.data?.message || error.message,
         icon: 'i-heroicons-exclamation-circle',
         color: 'warning'
      });
   } finally {
      pending.value = false;
   }
};
 </script>
