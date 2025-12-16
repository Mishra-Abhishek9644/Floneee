import Breadcrumb from '@/components/Breadcrumb'
import React from 'react'
import BlogPost from '@/components/BlogPost';

const Page = async ({ params }: { params: { id: number } }) => {
  const { id } = await params;

  return (
    <>
      <Breadcrumb />
      <BlogPost id={id} />
    </>
  )
}

export default Page