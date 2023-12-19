<template>
  <div v-if="state !== -1" class="mt-4 border-solid border-1 rounded-lg border-blueGray">
    <div v-show="state === 0" class="p-4">
      <span>填写同行人</span>
      <FormItem v-model="form.name.val" :msg="form.name.msg" label="姓名" @update:model-value="checkRule('name')" />
      <FormItem v-model="form.id.val" :msg="form.id.msg" label="身份证" @update:model-value="checkRule('id')" />

      <button class="mt-4 rounded-md px-4 py-2 bg-black text-white border-none" @click="state = 1">
        添加
      </button>
      <button class="ml-2 mt-4 rounded-md px-4 py-2 bg-[#E0E0E0] text-black border-none" @click="emit('delete'); state = -1">
        取消
      </button>
    </div>
    <div v-show="state === 1" class="rounded-md bg-[#EEEEEE] px-2 py-1 text-sm">
      同行人：{{ form.name.val }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import FormItem from './FormItem.vue';
import { checkIds } from '../utils/checkId';
import type { TFollowerForm, TFollowerFormFields } from '../types';

const state = ref(0);
const emit = defineEmits(['delete']);

const form: TFollowerForm = reactive({
  name: {
    val: '',
    msg: '',
  },
  id: {
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

function checkRule(field: TFollowerFormFields) {
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
  for (const field of ['name', 'id'] as TFollowerFormFields[])
    success = checkRule(field) && success;
  return success;
}
</script>