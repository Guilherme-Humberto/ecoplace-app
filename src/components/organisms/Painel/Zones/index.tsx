import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FaWhatsapp } from 'react-icons/fa'
import { AiOutlineMail } from 'react-icons/ai'
import { applicationApi } from '@api/index'
import ButtonFC from '@components/atoms/Button'
import MessageAlert from '@components/molecules/MessageAlert'
import { IZone, IZonesFC } from '@interfaces/index'
import {
  Container,
  ItemCard,
  Title,
  ImageWrapper,
  AboutWrapper,
  ContactWrapper,
  Addresses,
  CategoriesList,
  ContactsBtn,
  Description,
  CategoryCard,
  Buttons
} from './styles'

const ZonesFC: React.FC<IZonesFC> = ({
  mesoRegionId,
  microRegionId,
  selectCategory
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [zones, setZones] = useState<IZone[]>([])

  const getZones = async () => {
    setIsLoading(true)
    const { data: zonesResponse } = await applicationApi.post(`/zone`, {
      mesoregion_id: mesoRegionId,
      microregion_id: microRegionId,
      categoriesIds: selectCategory.map(item => item.id)
    })

    setZones(zonesResponse)
    return setIsLoading(false)
  }

  const navigateToContact = (phone: string) => {
    return router.push(`https://api.whatsapp.com/send?phone=+55${phone}`)
  }

  const navigateToEmail = (email: string) => router.push(`mailto:${email}`)

  useEffect(() => {
    if (mesoRegionId && microRegionId) getZones()
  }, [selectCategory, mesoRegionId, microRegionId])

  if (selectCategory.length == 0) {
    return (
      <MessageAlert
        title="Selecione uma categoria"
        subtitle="Selecione uma categoria para visualizar as zonas de coleta na sua região."
      />
    )
  }

  if (!isLoading && zones.length == 0)
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
        subtitle="Estamos procurando as zonas de coleta próximos da sua região."
      />
    )

  return (
    <Container>
      {zones.map((item, index) => (
        <ItemCard key={index}>
          <ImageWrapper>
            <Image
              src={item.image || ''}
              alt={`Zona de coleta - ${item.name}`}
              layout="fill"
              objectFit="cover"
            />
          </ImageWrapper>
          <AboutWrapper>
            <div>
              <small>Zona de coleta</small>
              <Title>{item.name}</Title>
              <Description>{item.description}</Description>
            </div>
            <Addresses>
              {item.addresses.map(addrs => (
                <div key={addrs.id}>
                  <p>
                    {addrs.addrs_name} | {addrs.addrs_number}
                  </p>
                  <p>
                    CEP: {addrs.zip_code} | {addrs.district}
                  </p>
                </div>
              ))}
            </Addresses>
          </AboutWrapper>
          <ContactWrapper>
            <CategoriesList>
              {item.items.map(category => (
                <CategoryCard key={category.id}>{category.title}</CategoryCard>
              ))}
            </CategoriesList>
            <ContactsBtn>
              <small>Entre em contato</small>
              <Buttons>
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
              </Buttons>
            </ContactsBtn>
          </ContactWrapper>
        </ItemCard>
      ))}
    </Container>
  )
}

export default ZonesFC
