import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Constraint = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1300px;
`

export const Column = styled.div`
    width: 100%;

    &.with-grid-columns {
        display: grid;
        gap: 40px;
        grid-template-columns: 1.5fr 1fr;
        margin-top: 50px;
    }
`
export const Title = styled.h3`
    font-size: 34px;
    font-weight: bold;
    font-family: ${props => props.theme.fonts.secondary};
    margin-bottom: 10px;
`
export const Text = styled.p`
    font-size: 18px;
    font-weight: lighter;
    color: ${props => props.theme.colors.tertiary};
    font-family: ${props => props.theme.fonts.primary};

    &.contributor-text {
        max-width: 80%;
    }
`