import React, { FC, PropsWithChildren } from 'react'
import { Button } from 'ui-kit'
import styles from './form-wrapper.scss'
import { FormWrapperProps } from './types'


const FormWrapper: FC<PropsWithChildren<FormWrapperProps>> = (props: PropsWithChildren<FormWrapperProps>) => {
  const { children, title, buttons, formError } = props
  return <div className={styles.fw}>
    <h2>{title}</h2>
    {children}
    <span className={styles.fw_formError}>{formError && formError}</span>
    <div className={styles.fw_buttons}>
      {buttons.map(({ label, action }) => (
        <Button
          key={label}
          primary
          label={label}
          onClick={action}

        />
      ))}
    </div>
  </div>
}

export default FormWrapper
