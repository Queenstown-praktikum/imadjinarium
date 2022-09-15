import React, { FC, useCallback, useState } from 'react';
import cn from 'classnames';
import { Button } from '../../ui-kit';
import styles from './forum.scss';
import { Search } from './sub-components/search/search';
import { DataThemeComments } from './mock';
import { WindowsComments } from './windows-comments';
import { useAddTopicMutation, useDeleteTopicMutation, useGetTopicsQuery } from '../../redux/topicApi';
import { ItemTheme } from './sub-components/item-theme/item-theme';

export const Forum: FC = () => {
  const { data: topics, isLoading, isError } = useGetTopicsQuery();
  // todo: обработать ошибки
  const [deleteTopic] = useDeleteTopicMutation();
  const [addTopic] = useAddTopicMutation();

  const [newTopicValue, setNewTopicValue] = useState<string>('');

  const handleAddTopicButtonClick = useCallback(async () => {
    if (!newTopicValue.trim()) return;
    await addTopic({ name: newTopicValue });
    setNewTopicValue('');
  }, [addTopic, newTopicValue]);

  const handleDeleteTopicButtonClick = useCallback((id: number) => () => deleteTopic(id), [deleteTopic]);

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
        <Button onClick={handleAddTopicButtonClick} label='Создать тему' />
        <div className={cn(styles['forum__wrapper-search'])}>
          <Search
            type='search'
            placeholder='Название новой темы'
            value={newTopicValue}
            onChange={(e) => {
              setNewTopicValue(e.target.value);
            }}
          />
        </div>

        <div className={cn(styles.forum__themes)}>
          {topics.map(({ id, name, createdAt }) => (
            <div key={id} className={cn(styles['forum__wrapper-theme'])}>
              <ItemTheme
                data={{ id, title: name, date: createdAt.toString() }}
                deleteItem={handleDeleteTopicButtonClick}
              />
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
