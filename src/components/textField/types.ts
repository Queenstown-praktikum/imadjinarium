export type TextFieldProps = {
  name: string;
  label: string;
  onTextFieldChange?: Function;
  type?: 'text' | 'password';
  error?: string;
}