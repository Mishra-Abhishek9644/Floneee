// app/shop/product/[id]/loading.tsx
export default function Loading() {
  return (
    <section className="my-10 lg:mx-44 md:mx-28 sm:mx-10 animate-pulse">
      <div className="grid md:grid-cols-2 gap-4 py-16">
        <div className="bg-gray-200 h-105 w-full rounded" />
        <div className="space-y-4 px-5">
          <div className="h-6 w-3/4 bg-gray-300 rounded" />
          <div className="h-8 w-32 bg-gray-300 rounded" />
          <div className="h-20 w-full bg-gray-300 rounded" />
        </div>
      </div>
    </section>
  );
}
