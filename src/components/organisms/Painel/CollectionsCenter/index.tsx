import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa'
import { AiOutlineMail } from 'react-icons/ai'
import { applicationApi } from '@api/index'
import {
  Container,
  ItemCard,
  Title,
  ImageWrapper,
  AboutWrapper,
  ContactWrapper,
  Addresses,
  CollectionItems,
  ContactsBtn
} from './styles'
import ButtonFC from '@components/atoms/Button'

interface ICollectionsCenter {
  name: string
  description: string
  image: string
  phone: string
  email: string
}

const CollectionsCenterFC: React.FC = () => {
  const [collectionsCenter, setCollectionsCenter] = useState<
    ICollectionsCenter[]
  >([])

  const getCollectionsCenter = async () => {
    const { data } = await applicationApi.get('/collectionCenter/listAll')
    console.log(data)
    setCollectionsCenter(data)
  }

  useEffect(() => {
    getCollectionsCenter()
  }, [])

  return (
    <Container>
      {collectionsCenter.map((item, index) => (
        <ItemCard key={index}>
          <ImageWrapper>
            <Image
              src={item.image || ''}
              layout="fill"
              alt={`Ponto de coleta - ${item.name}`}
            />
          </ImageWrapper>
          <AboutWrapper>
            <div>
              <small>Ponto de coleta</small>
              <Title>{item.name}</Title>
            </div>
            <Addresses>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste,
              cum!
            </Addresses>
          </AboutWrapper>
          <ContactWrapper>
            <CollectionItems>
              {'Papéis e Papelão, Resíduos Eletrônicos, Óleo de Cozinha'}
            </CollectionItems>
            <ContactsBtn>
              <ButtonFC event={() => {}}>
                <div className="text-with-icon">
                  <FaWhatsapp size={20} /> WhatsApp
                </div>
              </ButtonFC>
              <ButtonFC event={() => {}}>
                <div className="text-with-icon">
                  <AiOutlineMail size={20} /> Email
                </div>
              </ButtonFC>
            </ContactsBtn>
          </ContactWrapper>
        </ItemCard>
      ))}
    </Container>
  )
}

export default CollectionsCenterFC
