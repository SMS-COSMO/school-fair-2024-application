<template>
  <div class="h-[100svh] overflow-scroll scroll relative" @scroll="handelScroll($event)">
    <div class="h-[100svh] bg-black flex flex-col">
      <SMS class="w-1/2" />
      <span class="text-white">
        放个视频？
      </span>
      <div class="flex-grow" />
    </div>
    <div class="top-[calc(100svh+40px)] w-screen absolute flex flex-col">
      <Circle v-motion-pop-visible class="scale-200 ml-auto" />
      <Triangle v-motion-pop-visible class="scale-200 mt-90" />
    </div>
    <div v-motion-slide-visible-right class="ml-auto mr-auto w-90vw box-border my-[calc((100svh-440px)/2)] p-6 bg-white rounded-xl flex flex-col shadow-xl ">
      <Logo />
      <FormItem v-model="form.name.val" :msg="form.name.msg" label="姓名" @update:model-value="checkRule('name')" />
      <FormItem v-model="form.id.val" :msg="form.id.msg" label="身份证" @update:model-value="checkRule('id')" />
      <FormItem v-model="form.phone.val" :msg="form.phone.msg" label="手机" @update:model-value="checkRule('phone')" />

      <button class="mt-4 rounded-md px-4 py-3 bg-black text-white border-none ml-auto" @click="onSubmit">
        预约
      </button>
    </div>
  </div>
  <Ticket v-if="ticketOpen" id="3821839193" name="路人甲" phone="13518290981" />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import Logo from './components/Shapes/Logo.vue';
import SMS from './components/Shapes/SMS.vue';
import Triangle from './components/Shapes/Triangle.vue';
import Circle from './components/Shapes/Circle.vue';
import FormItem from './components/FormItem.vue';
import Ticket from './components/Ticket.vue';
import type { TForm, TFormFields } from './types';

function handelScroll(e: any) {
};

const form: TForm = reactive({
  name: {
    val: '',
    msg: '',
  },
  id: {
    val: '',
    msg: '',
  },
  phone: {
    val: '',
    msg: '',
  },
});

const formRule = {
  name: {
    reg: /^.{2,5}$/,
    msg: '姓名长度应在2~5',
  },
  id: {
    reg: /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    msg: '请输入正确的身份证号',
  },
  phone: {
    reg: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
    msg: '请输入正确的手机号',
  },
};

const ticketOpen = ref(false);

function checkRule(field: TFormFields) {
  const { reg, msg } = formRule[field];
  if (reg.test(form[field].val)) {
    form[field].msg = '';
    return true;
  } else {
    form[field].msg = msg;
    return false;
  }
};

function checkAllRules() {
  let success = true;
  for (const field of ['name', 'id', 'phone'] as TFormFields[])
    success = checkRule(field) && success;
  return success;
}

function onSubmit() {
  const valid = checkAllRules();
  if (!valid)
    return;

  ticketOpen.value = true;
}
</script>

<style scoped>
.scroll {
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  background-color: #257ADD;
}

.scroll::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
