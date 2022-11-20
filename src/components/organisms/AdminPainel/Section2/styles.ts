import styled from 'styled-components'
import { Splide, SplideSlide } from '@splidejs/react-splide'

export const Container = styled.section`
  margin-top: 40px;
`
export const Constraint = styled.div``
export const Column = styled.div``
export const Title = styled.h3`
  margin-bottom: 20px;
  font-weight: 500;
`
export const Description = styled.p``
export const ListOfCollections = styled(Splide).attrs({
  options: {
    perPage: 3,
    gap: 20,
    pagination: false,
    arrows: false
  }
})`
  margin-top: 20px;
`
export const CollectionCenterCard = styled(SplideSlide)`
  padding: 40px 30px;
  border-radius: 5px;
  background: ${props => props.theme.colors.white};
  border: 2px solid ${props => props.theme.colors.white};
  transition: 0.5s;

  &:hover {
    cursor: pointer;
    border-color: ${props => props.theme.colors.green};
  }
`
export const ModalTitles = styled.div`
  display: flex;
  flex-direction: column;
`
export const ButtonNewItem = styled.button`
  padding: 10px 30px;
  border: 2px solid transparent;
  outline: none;
  border-radius: 5px;
  background: ${props => props.theme.colors.quartiary};
  transition: 0.5s;

  &:hover {
    cursor: pointer;
    background: ${props => props.theme.colors.white};
    border-color: ${props => props.theme.colors.green};
  }
`