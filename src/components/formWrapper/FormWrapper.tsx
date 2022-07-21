import React, { FC, PropsWithChildren } from 'react'
import cn from 'classnames';
import styles from './form-wrapper.scss'
import { FormWrapperProps } from './types'

const FormWrapper: FC<PropsWithChildren<FormWrapperProps>> = (props: PropsWithChildren<FormWrapperProps>) => {
  const { children, title, buttons, formError } = props
  return <div className={styles.fw}>
    <h2>{title}</h2>
    {children}
    <span className={styles.fw_formError}>{formError && formError}</span>
    <div className={styles.fw_buttons}>
      {buttons.map(({ styleType, label, action }) => (
        <button
          key={label}
          type='button'
          className={cn(styleType === 'main' ? styles.fw_buttons__main : styles.fw_buttons__secondary)}
          onClick={action}
        >
          {label}
        </button>
      ))}
    </div>
  </div>
}

export default FormWrapper
