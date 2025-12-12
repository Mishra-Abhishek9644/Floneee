import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ProductDetails from '@/components/ProductDetails'
import React from 'react'

const page = () => {
  return (
    <>
    <Navbar />
    <Breadcrumb />
    <ProductDetails />
    <Footer />
    </>
  )
}

export default page