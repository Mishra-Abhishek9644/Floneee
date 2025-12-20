import { Suspense } from "react";
import ShopClient from "./ShopClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ShopClient />
    </Suspense>
  );
}
