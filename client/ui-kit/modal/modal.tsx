import React, { FC, ReactNode } from 'react';
import styles from './modal.scss';

type ModalProps = {
  children: ReactNode;
};

export const Modal: FC<ModalProps> = ({ children }) => <div className={styles.modal}>{children}</div>;
