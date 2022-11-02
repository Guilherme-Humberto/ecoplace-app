import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FaWhatsapp } from 'react-icons/fa'
import { AiOutlineMail } from 'react-icons/ai'
import { applicationApi } from '@api/index'
import ButtonFC from '@components/atoms/Button'
import NotFoundMessage from '@components/molecules/NotFoundMessage'
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

interface ICollectionsCenter {
  name: string
  description: string
  image: string
  phone: string
  email: string
}

interface ICollectionsCenterFC {
  mesoRegionId: number
  microRegionId: number
}

const CollectionsCenterFC: React.FC<ICollectionsCenterFC> = ({ mesoRegionId, microRegionId }) => {
  const router = useRouter()

  const [collectionsCenter, setCollectionsCenter] = useState<
    ICollectionsCenter[]
  >([])

  const getCollectionsCenter = async () => {
    if (mesoRegionId || microRegionId) {
      const { data } = await applicationApi.get(`/collectionCenter/addrs`, {
        params: { meso_region_id: mesoRegionId, micro_region_id: microRegionId }
      })
      return setCollectionsCenter(data)
    }

    return setCollectionsCenter([])
  }

  useEffect(() => {
    getCollectionsCenter()
  }, [mesoRegionId, microRegionId])

  if (collectionsCenter.length < 1) return <NotFoundMessage />

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
              <ButtonFC event={() => router.push(`https://api.whatsapp.com/send?phone=+55${item.phone}`)}>
                <div className="text-with-icon">
                  <FaWhatsapp size={20} /> WhatsApp
                </div>
              </ButtonFC>
              <ButtonFC event={() => router.push(`mailto:${item.email}`)}>
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
