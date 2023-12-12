<template>
  <div>
    {{ label }}
  </div>
  <input v-model="value" :class="`${msg.length ? 'outline-red-400' : ''}`">
  <div class="text-red-400">
    {{ msg }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  label: string
  msg: string
  modelValue: string
}>();

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() { return props.modelValue; },
  set(value) { emit('update:modelValue', value); },
});
</script>
