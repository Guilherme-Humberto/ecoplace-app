import styled, { css } from 'styled-components'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { StyleButton } from '@components/atoms/Button/styles'

export const Container = styled.section`
  margin-top: 40px;
`
export const Constraint = styled.div``
export const Column = styled.div``
export const Title = styled.h3`
  margin-bottom: 20px;
  font-weight: 500;
`
export const ListOfItems = styled.div`
  display: grid;
  grid-template-columns: 1fr 200px;
  gap: 20px;
`
export const Carrousel = styled(Splide).attrs({
  options: {
    arrows: false,
    pagination: false,
    perPage: 4,
    gap: 20
  }
})``
export const ItemCarrousel = styled(SplideSlide)``
export const ButtonNewItem = styled.div`
  display: grid;
  place-items: center;
  min-height: 192px;
  width: 100%;
  border-radius: 5px;
  border: 2px solid transparent;
  transition: 0.5s;

  &:hover {
    cursor: pointer;
    background: ${props => props.theme.colors.quartiary};
    border-color: ${props => props.theme.colors.secondary};
  }
`
export const ModalTitles = styled.div`
  display: flex;
  flex-direction: column;
`
export const ModalForm = styled.form``
export const BtnForm = styled.button<{ outline?: boolean }>`
  ${StyleButton};
  border: none;
  outline: none;
  margin-top: 10px;

  ${props =>
    props.outline &&
    css`
      background: transparent;
      border: 2px solid ${props => props.theme.colors.secondary};
      color: ${props => props.theme.colors.secondary};

      &:hover {
        color: ${props => props.theme.colors.white};
        border-color: ${props => props.theme.colors.danger};
        background: ${props => props.theme.colors.danger};
      }
    `}
`
export const StatusMessage = styled.small`
  display: flex;
  margin-top: 10px;
`
