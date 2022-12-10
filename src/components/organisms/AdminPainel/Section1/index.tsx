import React, { useState, useEffect, FormEvent } from 'react'
import { BsPlus } from 'react-icons/bs'
import { applicationApi } from '@api/index'
import { ICategory } from '@interfaces/index'
import CategoryCard from '@components/atoms/CategoryCard'
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
  const [categoryId, setCategoryId] = useState<string>('')
  const [categoryTitle, setCategoryTitle] = useState<string>('')
  const [categoryImage, setCategoryImage] = useState<string>('')

  const [categories, setCategories] = useState<ICategory[]>([])
  const [activeModalCreateCategory, setActiveModalCreateCategory] =
    useState<boolean>(false)
  const [activeModalUpdateCategory, setActiveModalUpdateCategory] =
    useState<boolean>(false)
  const [statusMessage, setStatusMessage] = useState<string>(
    'Preencha as informações acima.'
  )

  const clearCategoryState = () => {
    setCategoryId('')
    setCategoryTitle('')
    setCategoryImage('')
  }

  const openModalNewCategory = () => {
    clearCategoryState()
    setActiveModalCreateCategory(true)
  }

  const openModalUpdateCcategory = (category: ICategory) => {
    setActiveModalUpdateCategory(true)

    setCategoryId(category.id)
    setCategoryTitle(category.title)
    setCategoryImage(category.image)
  }

  const closeModalAndClearState = () => {
    clearCategoryState()
    setActiveModalUpdateCategory(false)
    setActiveModalCreateCategory(false)
  }

  const getCategories = async () => {
    const { data: categoriesResponse } = await applicationApi.get(
      '/category/listAll'
    )
    return setCategories(categoriesResponse.data)
  }

  // Criar novo categoria
  const handleRegisterCategory = async (event: FormEvent) => {
    event.preventDefault()

    applicationApi
      .post('/category/create', {
        title: categoryTitle,
        image: categoryImage
      })
      .then(() => {
        closeModalAndClearState()
        getCategories()
      })
      .catch(error => {
        console.log(error)
        clearCategoryState()
        setStatusMessage('Erro ao criar categoria')
      })
  }

  // Atualizar categoria
  const handleUpdateCollectionItem = async (event: FormEvent) => {
    event.preventDefault()

    applicationApi
      .put(
        '/category/update',
        {
          title: categoryTitle,
          image: categoryImage
        },
        {
          params: { id: categoryId }
        }
      )
      .then(() => {
        closeModalAndClearState()
        getCategories()
      })
      .catch(error => {
        console.log(error)
        clearCategoryState()
        setStatusMessage('Erro ao atualizar categoria')
      })
  }

  // Deleter categoria
  const handleDeleteCategory = async () => {
    applicationApi
      .delete('/category/delete', {
        params: { id: categoryId }
      })
      .then(() => {
        closeModalAndClearState()
        getCategories()
      })
      .catch(error => {
        console.log(error)
        clearCategoryState()
        setStatusMessage('Erro ao remover categoria')
      })
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <>
      <Container>
        <Constraint>
          <Column>
            <Title>Ítems de coleta</Title>
            <ListOfItems>
              <Carrousel>
                {categories.map(item => (
                  <ItemCarrousel
                    key={item.slug}
                    onClick={() => openModalUpdateCcategory(item)}
                  >
                    <CategoryCard
                      id={item.id}
                      slug={item.slug}
                      image={item.image}
                      title={item.title}
                    />
                  </ItemCarrousel>
                ))}
              </Carrousel>
              <ButtonNewItem onClick={openModalNewCategory}>
                <BsPlus size={60} />
              </ButtonNewItem>
            </ListOfItems>
          </Column>
        </Constraint>
      </Container>
      {activeModalCreateCategory && categoryId == '' && (
        <Modal
          minWidth={'800px'}
          maxWidth={'800px'}
          event={closeModalAndClearState}
        >
          <ModalTitles>
            <ModalTitle>Novo categoria</ModalTitle>
            <ModalSubTitle>Cadastrar nova categoria</ModalSubTitle>
          </ModalTitles>

          <ModalForm onSubmit={handleRegisterCategory}>
            <InputFC
              required
              type={'text'}
              value={categoryImage}
              setState={setCategoryImage}
              placeholder={'Imagem da categoria'}
            />
            <InputFC
              required
              type={'text'}
              value={categoryTitle}
              setState={setCategoryTitle}
              placeholder={'Nome da categoria'}
            />
            <BtnForm type="submit">Cadastrar categoria</BtnForm>
          </ModalForm>
          {statusMessage && <StatusMessage>{statusMessage}</StatusMessage>}
        </Modal>
      )}
      {activeModalUpdateCategory && categoryId !== '' && (
        <Modal
          minWidth={'800px'}
          maxWidth={'800px'}
          event={closeModalAndClearState}
        >
          <ModalTitles>
            <ModalTitle>Atualizar categoria</ModalTitle>
            <ModalSubTitle>Atualizar categoria</ModalSubTitle>
          </ModalTitles>

          <ModalForm onSubmit={handleUpdateCollectionItem}>
            <InputFC
              required
              type={'text'}
              value={categoryImage}
              setState={setCategoryImage}
              placeholder={'Imagem da categoria'}
            />
            <InputFC
              required
              type={'text'}
              value={categoryTitle}
              setState={setCategoryTitle}
              placeholder={'Nome da categoria'}
            />
            <BtnForm type="submit">Atualizar categoria</BtnForm>
            <BtnForm type="button" outline onClick={handleDeleteCategory}>
              Remover categoria
            </BtnForm>
          </ModalForm>
          {statusMessage && <StatusMessage>{statusMessage}</StatusMessage>}
        </Modal>
      )}
    </>
  )
}

export default AdminPainelSec1FC
