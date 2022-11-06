import React from 'react'
import { Container, Label, Input } from './styles'

interface IInput {
  label?: string
  value: string
  placeholder: string
  setState: any
  required?: boolean
  type: string
}

const InputFC: React.FC<IInput> = ({
  label,
  type,
  required,
  placeholder,
  value,
  setState
}) => {
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <Input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={event => setState(event.target.value)}
      />
    </Container>
  )
}

export default InputFC
