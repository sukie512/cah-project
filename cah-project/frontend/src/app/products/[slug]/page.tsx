import Image from 'next/image';
import type { Metadata } from 'next';
import { getProductPage } from '@/lib/payload';
import AddToCartButton from '@/components/AddToCartButton';
import RelatedProducts from '@/components/RelatedProducts';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductPage(params.slug);
  return {
    title: `${product.title} - Cards Against Humanity`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductPage(params.slug);

  return (
    <>
      {/* ─── PRODUCT HERO ───────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
          {/* Product image */}
          <div className="flex-shrink-0 w-full md:w-auto flex justify-center">
            <Image
              src={product.images[0].url}
              alt={product.images[0].alt}
              width={420}
              height={380}
              priority
              className="w-full max-w-xs md:max-w-sm object-contain"
            />
          </div>

          {/* Product details */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-black mb-4">{product.title}</h1>

            <p className="text-base leading-relaxed mb-4">
              <strong>{product.title}</strong>{' '}
              {product.description.replace(product.title, '').trim()}
            </p>

            <ul className="flex flex-col gap-2 mb-8">
              {product.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-1 flex-shrink-0">•</span>
                  <span>{f.text}</span>
                </li>
              ))}
            </ul>

            {/* Add to cart area */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <AddToCartButton
                medusaProductId={product.medusaProductId}
                price={product.price}
              />
            </div>
          </div>
        </div>
      </section>

      <hr className="border-t border-black mx-4 md:mx-8" />

      {/* ─── RELATED PRODUCTS ───────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        <h2 className="text-xl font-black mb-8">You should check out:</h2>
        <RelatedProducts products={product.relatedProducts} />
      </section>
    </>
  );
}
