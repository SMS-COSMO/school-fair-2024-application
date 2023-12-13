<template>
  <div class="mt-4 box-border">
    <div class="mb-2">
      {{ label }}
    </div>
    <input
      v-model="value"
      :class="`${msg.length ? 'border-red-400' : 'border-blueGray'} outline-none border-solid border-1 outline-offset-5 w-full px-3 py-1 rounded-md text-lg box-border`"
    >
    <Transition>
      <div v-if="msg.length" class="text-red-400 mt-2">
        {{ msg }}
      </div>
    </Transition>
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
