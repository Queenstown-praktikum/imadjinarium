import React, { FC, useState } from 'react';
import cn from 'classnames';
import styles from './forum.scss';
import { Search } from './sub-components/search/search';
import { DataTheme, DataThemeComments } from './mock';
import { ItemTheme } from './sub-components/item-theme/item-theme';
import { DataPropsItem, IdItemTheme } from './types';
import { WindowsComments } from './windows-comments';
import { Button } from '../../ui-kit/button/button';

export const Forum: FC = () => {
  const [dataTheme] = useState<Record<IdItemTheme, DataPropsItem>>(DataTheme);

  const deleteItemTheme = (id: IdItemTheme) => () => {
    // eslint-disable-next-line no-console
    console.log({ id });
  };

  const createTheme = () => {
    // eslint-disable-next-line no-console
    console.log('create');
  };

  return (
    <div className={cn(styles.forum, 'fullscreen', 'centered')}>
      <div className={cn(styles.forum__left)}>
        <Button onClick={createTheme}>Создать тему</Button>
        <div className={cn(styles['forum__wrapper-search'])}>
          <Search placeholder='Поиск по темам' />
        </div>

        <div className={cn(styles.forum__themes)}>
          {Object.entries(dataTheme).map(([key, item]) => (
            <div key={key} className={cn(styles['forum__wrapper-theme'])}>
              <ItemTheme data={item} deleteItem={deleteItemTheme} />
            </div>
          ))}
        </div>
      </div>
      <div className={cn(styles.forum__right)}>
        <WindowsComments data={DataThemeComments} />
      </div>
    </div>
  );
};
