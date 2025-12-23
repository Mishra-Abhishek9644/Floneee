import Breadcrumb from "@/components/Breadcrumb";
import ProductDetails from "@/components/ProductDetails";

const page = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params; // ✅ REQUIRED in new Next.js

  return (
    <>
      <Breadcrumb />
      <ProductDetails id={id} />
    </>
  );
};

export default page;
