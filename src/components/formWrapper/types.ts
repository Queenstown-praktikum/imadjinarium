export type WrapperButtonType = {
  styleType: 'main' | 'secondary';
  label: string;
  action?: () => void;
}

export type FormWrapperProps = {
  title: string;
  buttons: WrapperButtonType[];
  formError?: string;
};
