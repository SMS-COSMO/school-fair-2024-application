<template>
  <div class="h-[100svh] overflow-scroll scroll main relative overflow-x-hidden">
    <div class="h-[100svh] w-screen bg-white flex flex-col justify-center items-center space-y-6">
      <Cover class="w-2/3" />
      <div class="absolute bottom-12 flex space-x-4 justify-center items-center">
        <SMS class="w-auto h-6" />
        <img src="/cosmo-logo.svg" alt="COSMO Slogan" class="w-auto h-6">
        <img src="/saa-logo.png" alt="SAA Logo" class="w-auto h-12">
      </div>
    </div>
    <div class="flex md:flex-row md:gap-10 md:p-10 h-[calc(100svh-5rem)]">
      <div
        class="self-center h-[100svh] bg-[#257ADD] md:h-[500px] w-screen md:shadow-xl md:rounded-lg md:h-[50%] md:w-[500px] flex flex-col mx-auto md:mr-0 absolute md:relative">
        <Circle v-motion-pop-visible class="scale-200 mt-[5%] ml-auto" />
        <div class="flex-grow"></div>
        <Triangle v-motion-pop-visible class="scale-200 mb-[5%]" />
      </div>
      <div v-motion-slide-visible-right
        class="mx-auto md:ml-0 w-90vw md:w-[500px] box-border max-h-[90svh] scroll overflow-y-scroll self-center px-6 py-10 bg-white rounded-xl flex flex-col shadow-xl ">
        <Logo class="min-h-20" />
        <FormItem v-model="form.name.val" :msg="form.name.msg" label="姓名" @update:model-value="checkRule('name')" />
        <FormItem v-model="form.id.val" :msg="form.id.msg" label="身份证" @update:model-value="checkRule('id')" />
        <FormItem v-model="form.phone.val" :msg="form.phone.msg" label="手机" @update:model-value="checkRule('phone')" />

        <Followers v-for="f in followers" @delete="followers--"></Followers>
        <button @click="followers++" :disabled="followers >= 5" class="mt-4 rounded-md px-4 py-2 bg-black text-white border-none">添加同行人</button>
        <button class="mt-4 rounded-md px-4 py-3 bg-black text-white border-none ml-auto" @click="onSubmit">
          预约
        </button>
      </div>
    </div>
    <Transition name="up">
      <Ticket v-show="ticketOpen" :id="form.id.val" class="z-100 fixed top-0 w-screen" :name="form.name.val"
        :phone="form.phone.val" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import Logo from './components/Shapes/Logo.vue';
import SMS from './components/Shapes/SMS.vue';
import Triangle from './components/Shapes/Triangle.vue';
import Circle from './components/Shapes/Circle.vue';
import Cover from './components/Shapes/Cover.vue';
import FormItem from './components/FormItem.vue';
import Ticket from './components/Ticket.vue';
import Followers from './components/Followers.vue';
import type { TForm, TFormFields } from './types';
import { checkIds } from './utils/checkId';

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
  name: (val: string) => {
    return { res: /^.{2,15}$/.test(val), msg: '姓名长度应在2~15' };
  },
  id: checkIds,
  phone: (val: string) => {
    return { res: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(val), msg: '请输入正确的手机号' };
  },
};

const ticketOpen = ref(false);

function checkRule(field: TFormFields) {
  const { res, msg } = formRule[field](form[field].val);
  if (res) {
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

const followers = ref(0);
</script>

<style scoped>
.scroll {
  scrollbar-width: none;
  /* firefox */
  -ms-overflow-style: none;
  /* IE 10+ */
}

.main {
  background-color: #257ADD;
}

@media only screen and (min-width: 640px) {
  .main {
    background-color: #FAFAFA;
  }
}

.scroll::-webkit-scrollbar {
  display: none;
  /* Chrome Safari */
}

.up-enter-active,
.up-leave-active {
  transition: all 0.8s cubic-bezier(.5, 0, .64, .99);
}

.up-enter-from,
.up-leave-to {
  transform: translateY(50vh);
  opacity: 0;
}
</style>
