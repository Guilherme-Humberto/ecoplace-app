import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #6c6c80b5;

  display: grid;
  place-items: center;
`

export const WrapperChildren = styled.div`
  position: relative;
  padding: 60px 40px;
  background: ${props => props.theme.colors.white};
  max-width: 900px;
  border-radius: 5px;
`

export const CloseBtn = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`

export const ModalTitle = styled.strong`
  font-size: 25px;
  font-weight: 500;
`
export const ModalSubTitle = styled.span`
  color: ${props => props.theme.colors.gray2};
`