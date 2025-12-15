import Breadcrumb from '@/components/Breadcrumb'
import ProductDetails from '@/components/ProductDetails'
import React from 'react'

const page = async ({ params }: { params: { id: number } }) => {
  const { id } = await params;

  return (
    <>
      <Breadcrumb />
      <ProductDetails id={id} />
    </>
  )
}

export default page