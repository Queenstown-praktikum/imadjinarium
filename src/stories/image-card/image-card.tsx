import React, { FC } from 'react';

type Props = {
  caption: string;
};

export const ImageCard: FC<Props> = ({ caption = '' }) => <div>{caption}</div>;
