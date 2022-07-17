import React, { FC } from 'react';
import cn from 'classnames';
import styles from './item-comment.scss';
import { CommentProps } from '../../types';

export const ItemComment: FC<{ data: CommentProps }> = ({ data }) => (
    <div className={cn(styles['item-comment'])}>
      <div className={cn(styles['item-comment__header'])}>
        <div className={cn(styles['item-comment__author'])}>{data.author}</div>
        <div className={cn(styles['item-comment__date'])}>{data.date}</div>
      </div>
      <div className={cn(styles['item-comment__messages'])}>{data.message}</div>
    </div>
  );
