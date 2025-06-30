<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[]>([
  {
    label: 'Опросник',
    // icon: 'i-lucide-',
    to: '/',
  },
  {
    label: 'Аналитика',
    // icon: 'i-lucide-',
    to: '/analytics',
  }
])
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <UApp>
        <UNavigationMenu :items="items" class="w-full justify-center" />
        <NuxtPage />
    </UApp>
  </div>
</template>
