import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 40px 0;
`;

export const ItemCard = styled.div`
    display: grid;
    gap: 40px;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 30px 20px;
    width: 100%;
    border-radius: 5px;
    background: ${props => props.theme.colors.white};
    border: 2px solid ${props => props.theme.colors.quartiary};

    @media (max-width: 1000px) {
        grid-template-columns: 1fr;
    }
`
export const Title = styled.strong`
    font-size: 25px;
    font-weight: 500;
    display: flex;
`
export const ImageWrapper = styled.div`
    position: relative;
    height: 200px;
    width: 100%;
`
export const AboutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`
export const ContactWrapper = styled.div``
export const Addresses = styled.div`
    font-size: 14px;
`
export const CollectionItems = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
`
export const Buttons = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    max-width: 80%;
`
export const ContactsBtn = styled.div`
    margin-top: 30px;
`
export const Description = styled.p`
    font-size: 14px;
    color: ${props => props.theme.colors.tertiary};

    @media (min-width: 1000px) {
        display: inline-block;
        max-width: 400px;
        height: 1.5em;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`

export const CollectItem = styled.div`
    font-size: 13px;
    padding: 5px 10px;
    border-radius: 100px;
    background: ${props => props.theme.colors.quartiary};
`