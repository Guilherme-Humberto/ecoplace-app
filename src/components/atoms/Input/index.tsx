import React from 'react'
import { Container, Label, Input } from './styles'

interface IInput {
  label?: string
  value: string
  placeholder: string
  setState: any
}

const InputFC: React.FC<IInput> = ({ label, placeholder, value, setState }) => {
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <Input
        value={value}
        placeholder={placeholder}
        onChange={event => setState(event.target.value)}
      />
    </Container>
  )
}

export default InputFC
