import React from 'react'
import { Container, Label, Input } from './styles'

interface IInput {
  label?: string
  value: string
  placeholder: string
}

const InputFC: React.FC<IInput> = ({ label, placeholder, value }) => {
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <Input value={value} placeholder={placeholder} onChange={() => {}} />
    </Container>
  )
}

export default InputFC
