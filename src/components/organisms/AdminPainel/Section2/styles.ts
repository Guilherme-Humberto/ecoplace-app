import styled from 'styled-components';
import ReactSelect from 'react-select'
import { Splide, SplideSlide } from '@splidejs/react-splide'

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
`;
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
export const ModalForm = styled.form``
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