<template>
  <div class="ml-auto mr-auto w-80vw">
    <Transition mode="out-in">
      <div v-if="!ticketOpen">
        <FormItem v-model="form.name.val" :msg="form.name.msg" label="姓名" @update:model-value="checkRule('name')" />
        <FormItem v-model="form.id.val" :msg="form.id.msg" label="身份证" @update:model-value="checkRule('id')" />
        <FormItem v-model="form.phone.val" :msg="form.phone.msg" label="手机" @update:model-value="checkRule('phone')" />

        <button class="mt-4" @click="onSubmit">
          submit
        </button>
      </div>
      <Ticket v-else :id="form.id.val" :name="form.name.val" :phone="form.phone.val" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import FormItem from './components/FormItem.vue';
import Ticket from './components/Ticket.vue';
import type { TForm, TFormFields } from './types';

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
