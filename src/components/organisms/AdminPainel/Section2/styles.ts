import styled from 'styled-components'
import ReactSelect from 'react-select'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { StyleButton } from '@components/atoms/Button/styles'

export const customSelectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    minHeight: '45px',
    border: state.isFocused ? '2px solid #6C6C80' : '2px solid #F0F0F5',
    boxShadow: 'none',

    '&:hover': {
      borderColor: '#F0F0F5'
    }
  })
}

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
})``
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
export const ModalForm = styled.form`
  strong {
    font-weight: 500;
    border-top: 2px solid ${props => props.theme.colors.gray};
    padding-top: 20px;
  }

  small {
    color: ${props => props.theme.colors.gray2}
  }
`
export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0 10px 0;
`
export const InputGruopGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr;
`
export const SelectState = styled(ReactSelect)`
  margin: 20px 0;
`
export const AddresBlock = styled.div``
export const CollectionItemList = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
`
export const CollectionItemCard = styled.div`
  position: relative;
  padding: 10px 20px;
  border-radius: 100px;
  width: fit-content;
  font-size: 14px;
  background: ${props => props.theme.colors.gray};
`

export const CollectionItemBtnRemove = styled.button`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 20px;
  height: 20px;
  border: none;
  outline: none;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${props => props.theme.colors.white};
  background: ${props => props.theme.colors.primary};

  &:hover {
    cursor: pointer;
  }
`
export const ButtonForm = styled.button`
  ${StyleButton}
  border: none;
  outline: none;
  margin-top: 40px;
`