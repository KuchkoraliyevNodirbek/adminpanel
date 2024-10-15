import React from 'react'
import CategoriesList from '../../components/category-List/category-List'
import CreateCategoryForm from '../../components/create-category-form/create-category-form'
import { CategoriesFilter } from '../../components/category-filter/category-filter'

export const Categories = () => {
  return (
    <>
    <div>Categories</div>
    <div className="">
        {/* <CategoriesFilter/> */}
    </div>

    <div className="">
        <CreateCategoryForm/>
    </div>

    <div className="">
        <CategoriesList/>
    </div>
    
    </>
  )
}
