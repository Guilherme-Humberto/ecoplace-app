import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 40px 0;
`;

export const ItemCard = styled.div`
    display: grid;
    gap: 40px;
    grid-template-columns: 1fr 1fr 1.5fr;
    padding: 30px 0;

    width: 100%;
    border-radius: 5px;
    background: ${props => props.theme.colors.white};
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
    font-size: 14px;
`
export const ContactsBtn = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    max-width: 80%;
    margin-top: 30px;
`