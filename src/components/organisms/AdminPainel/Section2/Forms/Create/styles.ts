import styled from 'styled-components'
import ReactSelect from 'react-select'
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

export const Container = styled.div``
export const ModalForm = styled.form`
  strong {
    font-weight: 500;
    border-top: 2px solid ${props => props.theme.colors.gray};
    padding-top: 20px;
  }

  small {
    color: ${props => props.theme.colors.gray2};
  }
`
export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0 10px 0;
`
export const InputGroupGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr;
`
export const SelectState = styled(ReactSelect)`
  margin: 20px 0;
`
export const AddresBlock = styled.div``
export const AddresTabItem = styled.div<{ open?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 14px;
  background: ${props =>
    props.open ? props.theme.colors.primary : props.theme.colors.gray};
  color: ${props =>
    props.open ? props.theme.colors.white : props.theme.colors.dark};
  cursor: pointer;
`
export const AddresTabWrapper = styled.div<{ open?: boolean }>`
  display: ${props => (!props.open ? 'none' : 'block')};
`
export const ButtonForm = styled.button`
  ${StyleButton}
  border: none;
  outline: none;
  margin-top: 40px;
`
export const CategoriesList = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
`
export const CategoryCard = styled.div`
  position: relative;
  padding: 10px 20px;
  border-radius: 100px;
  width: fit-content;
  font-size: 14px;
  background: ${props => props.theme.colors.gray};
`

export const CategoryBtnRemove = styled.button`
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
