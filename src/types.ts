interface TFormItem {
  val: string
  msg: string
}

export interface TForm {
  name: TFormItem
  id: TFormItem
  phone: TFormItem
};

export interface TFollowerForm {
  name: TFormItem
  id: TFormItem
};

export type TFormFields = 'name' | 'id' | 'phone';
export type TFollowerFormFields = 'name' | 'id';
