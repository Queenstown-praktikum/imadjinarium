import React, { FC, useCallback } from 'react';
import cn from 'classnames';
import { Button } from '../../ui-kit';
import styles from './forum.scss';
import { Search } from './sub-components/search/search';
import { DataThemeComments } from './mock';
import { WindowsComments } from './windows-comments';
import { useDeleteTopicMutation, useGetTopicsQuery } from '../../redux/topicApi';
import { ItemTheme } from './sub-components/item-theme/item-theme';

export const Forum: FC = () => {
  const { data: topics, isLoading, isError } = useGetTopicsQuery();
  const [deleteTopic] = useDeleteTopicMutation();

  const handleDelete = useCallback(
    (id: number) => () => {
      deleteTopic(id);
    },
    [deleteTopic],
  );

  if (isError) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!topics) {
    return null;
  }

  return (
    <div className={cn(styles.forum, 'fullscreen', 'centered')}>
      <div className={cn(styles.forum__left)}>
        <Button onClick={() => {}} label='Создать тему' />
        <div className={cn(styles['forum__wrapper-search'])}>
          <Search type='search' placeholder='Поиск по темам' />
        </div>

        <div className={cn(styles.forum__themes)}>
          {topics.map(({ id, name, createdAt }) => (
            <div key={id} className={cn(styles['forum__wrapper-theme'])}>
              <ItemTheme data={{ id, title: name, date: createdAt.toString() }} deleteItem={handleDelete} />
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
