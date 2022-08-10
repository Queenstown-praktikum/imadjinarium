export type WrapperButtonType = {
  styleType: 'main' | 'secondary';
  label: string;
  action?: () => void;
}

export type FormWrapperProps = {
  title: string;
  link?: {
    label: string;
    to: string;
  };
  buttons: WrapperButtonType[];
  formError?: string;
};
