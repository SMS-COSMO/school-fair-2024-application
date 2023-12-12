<template>
  <div class="ml-auto mr-auto w-80vw">
    <div v-if="!ticketOpen">
      <FormItem v-model="form.name.val" :msg="form.name.msg" label="姓名" @update:model-value="onUpdate" />
      <FormItem v-model="form.id.val" :msg="form.id.msg" label="身份证" @update:model-value="onUpdate" />
      <FormItem v-model="form.phone.val" :msg="form.phone.msg" label="手机" @update:model-value="onUpdate" />

      <button @click="onSubmit">
        submit
      </button>
    </div>
    <div v-else>
      Ticket
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import FormItem from './components/FormItem.vue';
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
    reg: /.{2,5}/,
    msg: '姓名长度应在2~5',
  },
  id: {
    reg: /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    msg: '请输入正确的身份证号',
  },
  phone: {
    reg: /^[1][3,4,5,7,8][0-9]{9}$/,
    msg: '请输入正确的手机号',
  },
};

const ticketOpen = ref(false);

function checkFormRule() {
  let success = true;
  for (const field of ['name', 'id', 'phone'] as TFormFields[]) {
    const { reg, msg } = formRule[field];
    if (reg.test(form[field].val)) {
      form[field].msg = '';
      success = true && success;
    } else {
      form[field].msg = msg;
      success = false;
    }
  }
  return success;
};

function onUpdate() {
  checkFormRule();
}

function onSubmit() {
  const valid = checkFormRule();
  if (!valid)
    return;

  ticketOpen.value = true;
}
</script>
