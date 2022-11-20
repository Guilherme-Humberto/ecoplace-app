import styled from 'styled-components'

export const Container = styled.footer`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    max-width: 1400px;
    margin: 30px auto 0 auto;
    border-top: 1px solid ${props => props.theme.colors.gray3};
`
