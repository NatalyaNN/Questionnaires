<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const auth = useAuth();
const logout = async () => {
   await $fetch('/api/auth/logout', { method: 'POST' });
   auth.value = { isAuthenticated: false, user: null };
   navigateTo('/login');
};
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <UApp>
      <div>
       <UNavigationMenu>
         <NuxtLink to="/" label="Главная" />
         <NuxtLink to="/register" label="Регистрация" v-if="!auth.isAuthenticated" />
         <NuxtLink v-if="!auth.isAuthenticated" to="/login" label="Войти" />
         <NuxtLink v-if="auth.isAuthenticated" to="/profile" label="Профиль" />
         <NuxtLink v-if="auth.user?.role === 'ADMIN'" to="/admin" label="Админка" />
         <UButton v-if="auth.isAuthenticated" @click="logout" label="Выйти" />
       </UNavigationMenu>
     <NuxtPage />
   </div>
    </UApp>
  </div>
</template>
