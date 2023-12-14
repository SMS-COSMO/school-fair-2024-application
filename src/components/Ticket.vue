<template>
  <div class="bg-gray-200 min-h-screen flex">
    <div class="self-center mx-auto">
      <div class="min-h-[60svh] w-90vw p-8 box-border bg-white rounded-xl flex flex-col" style="font-family: 'ShuHeiTi';">
        <QR class="w-full h-auto" />
        <Logo class="mt-4" />
        <div class="flex-grow" />
        <div class="mt-3 font-bold text-xl">
          <div>姓名</div>
          <span class="text-3xl">{{ name }}</span>
        </div>
        <div class="mt-3 font-bold text-xl">
          <div>身份证后六位</div>
          <span>{{ id.substring(id.length - 6) }}</span>
        </div>
        <div class="mt-3 font-bold text-xl flex">
          <div>
            <div>手机号</div>
            <span>{{ phone }}</span>
          </div>
          <Time class="ml-auto" />
        </div>
      </div>
      <TicketBottom class="w-full h-auto" />
    </div>
  </div>
</template>

<script setup lang="ts">
import QR from './Shapes/QR.vue';
import Logo from './Shapes/Logo.vue';
import Time from './Shapes/Time.vue';
import TicketBottom from './Shapes/TicketBottom.vue';

defineProps<{
  name: string
  id: string
  phone: string
}>();
</script>
