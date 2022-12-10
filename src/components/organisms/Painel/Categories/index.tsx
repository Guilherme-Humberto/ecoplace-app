import React, { useEffect, useState } from 'react'
import { applicationApi } from '@api/index'
import { ICategory } from '@interfaces/index'
import CollectionItemCard from '@components/atoms/CategoryCard'
import { Container } from './styles'

interface ICategoriesProps {
  selectCategory: ICategory[]
  setSelectCategory: React.Dispatch<React.SetStateAction<ICategory[]>>
}

const Categories: React.FC<ICategoriesProps> = ({
  selectCategory,
  setSelectCategory
}) => {
  const [categories, setCategories] = useState<ICategory[]>([])

  const getCategories = async () => {
    const { data: categoriesResponse } = await applicationApi.get(
      '/category/listAll'
    )
    return setCategories(categoriesResponse.data)
  }

  const addCategoryInList = (category: ICategory) => {
    const filterCategory = selectCategory.filter(
      element => element.id === category.id
    )
    const removeCategory = selectCategory.filter(
      element => element.id !== category.id
    )

    if (filterCategory.length === 0) {
      return setSelectCategory(prev => [...prev, category])
    }
    return setSelectCategory(removeCategory)
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <Container>
      {categories.map(category => (
        <div key={category.slug} onClick={() => addCategoryInList(category)}>
          <CollectionItemCard
            id={category.id}
            slug={category.slug}
            image={category.image}
            title={category.title}
            active={
              !!selectCategory?.find(element => element.id == category.id)
            }
          />
        </div>
      ))}
    </Container>
  )
}

export default Categories
