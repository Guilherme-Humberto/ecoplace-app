import React, { useState, useEffect, FormEvent } from 'react'
import { BsPlus } from 'react-icons/bs'
import { applicationApi } from '@api/index'
import { ICollectionItems } from '@interfaces/index'
import CollectionItemCard from '@components/atoms/CollectionItemCard'
import Modal from '@components/molecules/Modal'
import { ModalTitle, ModalSubTitle } from '@components/molecules/Modal/styles'
import InputFC from '@components/atoms/Input'
import {
  Container,
  Column,
  Constraint,
  Title,
  ListOfItems,
  ButtonNewItem,
  ItemCarrousel,
  Carrousel,
  ModalTitles,
  ModalForm,
  BtnForm,
  StatusMessage
} from './styles'

const AdminPainelSec1FC: React.FC = () => {
  const [itemTitle, setItemTitle] = useState<string>('')
  const [itemImage, setItemImage] = useState<string>('')

  const [collectionItems, setCollectionItems] = useState<ICollectionItems[]>([])
  const [activeModalNewItem, setActiveModalNewItem] = useState<boolean>(false)
  const [statusMessage, setStatusMessage] = useState<string>(
    'Preencha as informações acima.'
  )

  const getCollectionItems = async () => {
    const { data: collectionItems } = await applicationApi.get(
      '/collectionItem/listAll'
    )
    return setCollectionItems(collectionItems)
  }

  const handleRegisterCollectionItem = async (event: FormEvent) => {
    event.preventDefault()

    applicationApi.post('/collectionItem/create', {
      title: itemTitle,
      image: itemImage
    })
    .then((response) => {
      setActiveModalNewItem(false)
      setItemTitle('')
      setItemImage('')

      getCollectionItems()
    })
    .catch((error) => {
      console.log(error)
      setItemTitle('')
      setItemImage('')
      setStatusMessage('Erro ao criar item de coleta')
    })
  }

  useEffect(() => {
    getCollectionItems()
  }, [])

  return (
    <>
      <Container>
        <Constraint>
          <Column>
            <Title>Ítems de coleta</Title>
            <ListOfItems>
              <Carrousel>
                {collectionItems.map(item => (
                  <ItemCarrousel key={item.slug}>
                    <CollectionItemCard
                      id={item.id}
                      slug={item.slug}
                      image={item.image}
                      title={item.title}
                    />
                  </ItemCarrousel>
                ))}
              </Carrousel>
              <ButtonNewItem onClick={() => setActiveModalNewItem(true)}>
                <BsPlus size={60} />
              </ButtonNewItem>
            </ListOfItems>
          </Column>
        </Constraint>
      </Container>
      {activeModalNewItem && (
        <Modal
          minWidth={'800px'}
          maxWidth={'800px'}
          event={() => setActiveModalNewItem(false)}
        >
          <ModalTitles>
            <ModalTitle>Novo ítem de coleta</ModalTitle>
            <ModalSubTitle>Cadastrar novo ítem de coleta</ModalSubTitle>
          </ModalTitles>

          <ModalForm onSubmit={handleRegisterCollectionItem}>
            <InputFC
              required
              type={'text'}
              value={itemImage}
              setState={setItemImage}
              placeholder={'Imagem do item'}
            />
            <InputFC
              required
              type={'text'}
              value={itemTitle}
              setState={setItemTitle}
              placeholder={'Nome do item de coleta'}
            />
            <BtnForm type="submit">Cadastrar ítem de coleta</BtnForm>
          </ModalForm>
          {statusMessage && <StatusMessage>{statusMessage}</StatusMessage>}
        </Modal>
      )}
    </>
  )
}

export default AdminPainelSec1FC
