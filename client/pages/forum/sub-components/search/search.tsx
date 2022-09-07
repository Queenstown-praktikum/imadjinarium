import React, { FC } from 'react';
import cn from 'classnames';
import styles from './search.scss';
import { SearchProps } from './types';

export const Search: FC<SearchProps> = (props) => <input {...props} className={cn(styles.search)} />;
