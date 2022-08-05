import React, { FC } from 'react';
import cn from 'classnames';
import { Button } from 'ui-kit';
import styles from './forum.scss';
import { DataThemeProps } from './types';
import { ItemComment } from './sub-components/item-comment/item-comment';
import { InputMessage } from './sub-components/input-message/input-messages';

export const WindowsComments: FC<{ data: DataThemeProps }> = ({ data }) => (
  <div className={cn(styles.forum__wc)}>
    <div className={cn(styles['forum__wc-header'])}>{data.title}</div>
    <div className={cn(styles['forum__wc-messages'])}>
      {data.comments.map((item) => (
        <div className={cn(styles['forum__wc-wrapper-messages'])}>
          <ItemComment key={item.id} data={item} />
        </div>
      ))}
    </div>
    <div className={cn(styles['forum__wc-control'])}>
      <InputMessage placeholder='Введите комментарий...' />
      <div className={cn(styles['forum__wc-button'])}>
        <Button label='Отправить' />
      </div>
    </div>
  </div>
);
