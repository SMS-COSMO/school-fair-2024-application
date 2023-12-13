<template>
  <div>
    {{ name }}
  </div>
  <div>
    {{ id }}
  </div>
  <div>
    {{ phone }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  id: string
  phone: string
}>();
</script>
