import React, { FC } from 'react';
import cn from 'classnames';
import { ImageCard } from '../../ui-kit/image-card/image-card';

export const SignInPage: FC = () => (
  <div className={cn('fullscreen', 'centered')}>
    <h2>SignInPage</h2>
    <ImageCard imageUrl='https://papik.pro/uploads/posts/2021-09/1631229101_2-papik-pro-p-imadzhinarium-illyustratsii-2.jpg' />
  </div>
);
