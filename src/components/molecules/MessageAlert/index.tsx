import ButtonFC from '@components/atoms/Button'
import React from 'react'
import { Container, Title, SubTitle, SupportContactBtn } from './styles'

interface IMessageAlert {
  title: string
  subtitle?: string
  link?: string
}

const MessageAlert: React.FC<IMessageAlert> = ({ title, link, subtitle }) => {
  return (
    <Container>
      <Title>{title}</Title>
      {subtitle && <SubTitle>{subtitle}</SubTitle>}
      {link && (
        <SupportContactBtn>
          <ButtonFC event={() => {}}>
            <p>{link}</p>
          </ButtonFC>
        </SupportContactBtn>
      )}
    </Container>
  )
}

export default MessageAlert
