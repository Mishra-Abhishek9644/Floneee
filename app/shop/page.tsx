import ShopClient from "./ShopClient";

export default function Page({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  return <ShopClient searchParams={searchParams} />;
}
