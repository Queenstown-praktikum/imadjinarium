import React, { FC, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'ui-kit'
import styles from './form-wrapper.scss'
import { FormWrapperProps } from './types'


const FormWrapper: FC<PropsWithChildren<FormWrapperProps>> = (props: PropsWithChildren<FormWrapperProps>) => {
  const { children, title, buttons, formError, link } = props
  return <div className={styles.fw}>
    <div className={styles.fw_header}>
      <h2>{title}</h2>
      {link && <Link to={link.to} className={styles.fw_header__link} >{link.label}</Link>}
    </div>
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
