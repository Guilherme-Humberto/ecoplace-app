import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin: 40px 0;
`;

export const ItemCard = styled.div<{ active?: boolean }>`
    display: grid;
    place-items: center;
    min-height: 192px;
    width: 100%;
    border-radius: 5px;
    background: ${props => props.active ? props.theme.colors.white : props.theme.colors.quartiary};
    border: 2px solid ${props => props.active ? props.theme.colors.green : props.theme.colors.quartiary};
    transition: 0.5s;

    &:hover {
        cursor: pointer;
        background: ${props => props.theme.colors.white};
        border-color: ${props => props.theme.colors.green};
    }
`
export const Title = styled.strong`
    font-size: 16px;
    font-weight: 500;
`