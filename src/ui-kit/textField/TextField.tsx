import React, { ChangeEvent, FC, useCallback, useState } from 'react'
import cn from 'classnames';
import { TextFieldProps } from './types'
import styles from './text-field.scss'

const TextField: FC<TextFieldProps> = (props: TextFieldProps) => {
  const [value, setValue] = useState('');
  const {
    name,
    type = 'text',
    label,
    error,
    onTextFieldChange,
  } = props

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setValue(e?.target?.value), [setValue])

  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (typeof onTextFieldChange === 'function') {
      onTextFieldChange(name, e?.target?.value)
    }
  }, [name, onTextFieldChange])

  return <div className={styles.tf}>
    <span className={
      cn(styles.tf_label, {
        [styles.tf_label__focus]: value,
        [styles.tf_label__error]: error
      })
    }>
      {label}
    </span>
    <input
      onChange={handleChange}
      onBlur={handleBlur}
      className={cn(styles.tf_input, { [styles.tf_input__error]: error })}
      type={type}
      name={name}
      value={value}
    />
    {error && <span className={styles.tf_textError}>{error}</span>}
  </div>
}

export default TextField
