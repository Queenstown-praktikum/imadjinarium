export type IdItemTheme = number;

export type DataPropsItem = {
  id: number;
  title: string;
  date: string;
};

export type ItemThemeProps = {
  data: DataPropsItem;
  deleteItem: (id: IdItemTheme) => () => void;
};

export type CommentProps = {
  id: number;
  author: string;
  message: string;
  date: string;
};

export type DataThemeProps = {
  title: string;
  comments: CommentProps[];
};
