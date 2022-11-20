import styled from 'styled-components'

export const Container = styled.header`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${props => props.theme.colors.gray3};

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-bottom: 20px;
  }
`

export const Logo = styled.div``
export const LinkBackToHome = styled.a`
  font-weight: 500;
  font-family: ${props => props.theme.fonts.secondary};
`
