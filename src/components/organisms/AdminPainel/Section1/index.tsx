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
  const [itemId, setItemId] = useState<string>('')
  const [itemTitle, setItemTitle] = useState<string>('')
  const [itemImage, setItemImage] = useState<string>('')

  const [collectionItems, setCollectionItems] = useState<ICollectionItems[]>([])
  const [activeModalCreateItem, setActiveModalCreateItem] = useState<boolean>(false)
  const [activeModalUpdateItem, setActiveModalUpdateItem] = useState<boolean>(false)
  const [statusMessage, setStatusMessage] = useState<string>(
    'Preencha as informações acima.'
  )

  const getCollectionItems = async () => {
    const { data: collectionItems } = await applicationApi.get(
      '/collectionItem/listAll'
    )
    return setCollectionItems(collectionItems)
  }

  const clearItemState = () => {
    setItemId('')
    setItemTitle('')
    setItemImage('')
  }
  
  const openModalNewItem = () => {
    clearItemState()
    setActiveModalCreateItem(true)
  }

  const openModalUpdateItem = (item: ICollectionItems) => {
    setActiveModalUpdateItem(true)

    setItemId(item.id)
    setItemTitle(item.title)
    setItemImage(item.image)
  }

  const closeModalAndClearState = () => {
    clearItemState()
    setActiveModalUpdateItem(false)
    setActiveModalCreateItem(false)
  }

  // Criar novo item de coleta
  const handleRegisterCollectionItem = async (event: FormEvent) => {
    event.preventDefault()

    applicationApi
      .post('/collectionItem/create', {
        title: itemTitle,
        image: itemImage
      })
      .then(response => {
        closeModalAndClearState()
        getCollectionItems()
      })
      .catch(error => {
        console.log(error)
        clearItemState()
        setStatusMessage('Erro ao criar item de coleta')
      })
  }

  // Atualizar item de coleta
  const handleUpdateCollectionItem = async (event: FormEvent) => {
    event.preventDefault()

    applicationApi
      .put('/collectionItem/update', {
        title: itemTitle,
        image: itemImage
      }, {
        params: { id: itemId }
      })
      .then(response => {
        closeModalAndClearState()
        getCollectionItems()
      })
      .catch(error => {
        console.log(error)
        clearItemState()
        setStatusMessage('Erro ao atualizar item de coleta')
      })
  }

  // Deleter item de coleta
  const handleDeleteCollectionItem = async () => {
    applicationApi.delete('/collectionItem/delete', {
        params: { id: itemId }
      })
      .then(() => {
        closeModalAndClearState()
        getCollectionItems()
      })
      .catch((error) => {
        console.log(error)
        clearItemState()
        setStatusMessage('Erro ao remover item de coleta')
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
                  <ItemCarrousel
                    key={item.slug}
                    onClick={() => openModalUpdateItem(item)}
                  >
                    <CollectionItemCard
                      id={item.id}
                      slug={item.slug}
                      image={item.image}
                      title={item.title}
                    />
                  </ItemCarrousel>
                ))}
              </Carrousel>
              <ButtonNewItem onClick={openModalNewItem}>
                <BsPlus size={60} />
              </ButtonNewItem>
            </ListOfItems>
          </Column>
        </Constraint>
      </Container>
      {activeModalCreateItem && itemId == '' && (
        <Modal
          minWidth={'800px'}
          maxWidth={'800px'}
          event={closeModalAndClearState}
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
      {activeModalUpdateItem && itemId !== '' && (
        <Modal
          minWidth={'800px'}
          maxWidth={'800px'}
          event={closeModalAndClearState}
        >
          <ModalTitles>
            <ModalTitle>Atualizar ítem de coleta</ModalTitle>
            <ModalSubTitle>Atualizar ítem de coleta</ModalSubTitle>
          </ModalTitles>

          <ModalForm onSubmit={handleUpdateCollectionItem}>
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
            <BtnForm type="submit">Atualizar ítem de coleta</BtnForm>
            <BtnForm type="button" outline onClick={handleDeleteCollectionItem}>
              Remover ítem de coleta
            </BtnForm>
          </ModalForm>
          {statusMessage && <StatusMessage>{statusMessage}</StatusMessage>}
        </Modal>
      )}
    </>
  )
}

export default AdminPainelSec1FC
