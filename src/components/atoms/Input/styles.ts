import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px 0 10px;
`

export const Label = styled.label`
  margin-bottom: 10p;
`
export const Input = styled.input`
  width: 100%;
  border-radius: 5px;
  padding: 10px 20px;
  outline: none;
  border: 2px solid ${props => props.theme.colors.gray};

  &:focus {
    border-color: ${props => props.theme.colors.tertiary};
  }
  
  &::placeholder {
    color: #A0A0B2;
  }
`
