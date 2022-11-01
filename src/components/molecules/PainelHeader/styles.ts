import styled from 'styled-components'

export const Container = styled.header`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccccd0;
`

export const Logo = styled.div``
export const LinkBackToHome = styled.a`
  font-weight: 500;
  font-family: ${props => props.theme.fonts.secondary};
`
