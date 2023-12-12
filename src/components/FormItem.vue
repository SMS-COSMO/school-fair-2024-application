<template>
  <div>
    {{ label }}
  </div>
  <slot />
  <div class="text-red-400">
    {{ msg }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  msg: string
}>();
</script>
