import React from 'react'
import { RiCloseFill } from 'react-icons/ri'
import { Container, WrapperChildren, CloseBtn } from './styles'

interface IModal {
  minWidth: string
  maxWidth: string
  maxHeight?: string
  withScroll?: boolean
  event(): void
}

const Modal: React.FC<IModal> = ({
  minWidth,
  maxWidth,
  maxHeight,
  withScroll,
  event,
  children
}) => {
  return (
    <Container>
      <WrapperChildren
        style={{
          maxWidth,
          maxHeight,
          overflowY: withScroll ? 'scroll' : 'hidden'
        }}
      >
        <CloseBtn onClick={event}>
          <RiCloseFill size={30} />
        </CloseBtn>
        {children}
      </WrapperChildren>
    </Container>
  )
}

export default Modal
