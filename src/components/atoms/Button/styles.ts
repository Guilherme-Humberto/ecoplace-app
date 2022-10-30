import styled from 'styled-components'

export const Container = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
  color: ${props => props.theme.colors.white};
  background: ${props => props.theme.colors.primary};
  transition: 0.5s;
  
  &:hover {
    background: ${props => props.theme.colors.green};
  }

  .text-with-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
`
