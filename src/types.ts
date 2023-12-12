interface TFormItem {
  val: string
  msg: string
}

export interface TForm {
  name: TFormItem
  id: TFormItem
  phone: TFormItem
};

export type TFormFields = 'name' | 'id' | 'phone';
