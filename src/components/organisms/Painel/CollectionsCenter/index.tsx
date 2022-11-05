import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FaWhatsapp } from 'react-icons/fa'
import { AiOutlineMail } from 'react-icons/ai'
import { applicationApi } from '@api/index'
import ButtonFC from '@components/atoms/Button'
import MessageAlert from '@components/molecules/MessageAlert'
import { ICollectionsCenter, ICollectionsCenterFC } from '@interfaces/index'
import {
  Container,
  ItemCard,
  Title,
  ImageWrapper,
  AboutWrapper,
  ContactWrapper,
  Addresses,
  CollectionItems,
  ContactsBtn,
  Description,
  CollectItem
} from './styles'

const CollectionsCenterFC: React.FC<ICollectionsCenterFC> = ({
  mesoRegionId,
  microRegionId,
  selectCollectionItem
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [collectionsCenter, setCollectionsCenter] = useState<
    ICollectionsCenter[]
  >([])

  const getCollectionsCenter = async () => {
    setIsLoading(true)
    const { data: collectionsCenter } = await applicationApi.post(
      `/collectionCenter`,
      {
        mesoregion_id: mesoRegionId,
        microregion_id: microRegionId,
        item_id: selectCollectionItem.map(item => item.id)
      }
    )

    setCollectionsCenter(collectionsCenter)
    return setIsLoading(false)
  }

  const navigateToContact = (phone: string) =>
    router.push(`https://api.whatsapp.com/send?phone=+55${phone}`)

  const navigateToEmail = (email: string) => router.push(`mailto:${email}`)

  useEffect(() => {
    if (mesoRegionId && microRegionId) getCollectionsCenter()
  }, [selectCollectionItem, mesoRegionId, microRegionId])

  if (selectCollectionItem.length == 0) {
    return (
      <MessageAlert
        title="Selecione um item de coleta"
        subtitle="Selecione um item de coleta para visualizar os ponto de coleta na sua região."
      />
    )
  }

  if (!isLoading && collectionsCenter.length == 0)
    return (
      <MessageAlert
        link="Entrar em contato"
        title="Nenhum ponto de coleta encontrado"
        subtitle="Volte para a tela inicial e procure em outra região ou entre em contato com nossa equipe."
      />
    )

  if (isLoading)
    return (
      <MessageAlert
        title="Carregando..."
        subtitle="Estamos procurando os ponto de coleta próximos da sua região."
      />
    )

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
              <Description>{item.description}</Description>
            </div>
            <Addresses>
              {item.addresses.map(addrs => (
                <div key={addrs.id}>
                  <p>
                    {addrs.addrs_name} | {addrs.addrs_number}
                  </p>
                  <p>CEP: {addrs.zip_code}</p>
                  <p>Bairro: {addrs.district}</p>
                </div>
              ))}
            </Addresses>
          </AboutWrapper>
          <ContactWrapper>
            <CollectionItems>
              {item.items.map(collectItem => (
                <CollectItem key={collectItem.id}>{collectItem.title}</CollectItem>
              ))}
            </CollectionItems>
            <ContactsBtn>
              <ButtonFC event={() => navigateToContact(item.phone)}>
                <div className="text-with-icon">
                  <FaWhatsapp size={20} /> WhatsApp
                </div>
              </ButtonFC>
              <ButtonFC event={() => navigateToEmail(item.email)}>
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
