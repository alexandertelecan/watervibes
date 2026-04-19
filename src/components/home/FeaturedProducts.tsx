import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/shared/FadeIn";
import { dbConnect } from "@/lib/db";
import { formatPrice } from "@/lib/format";
import { ProductModel } from "@/lib/models/Product";
import { productAltText } from "@/lib/seo";
import type { ProductColor } from "@/types/product";

const TITLE = "Cele mai vândute";
const LEDE =
  "Modele preferate de clienți pentru utilizare zilnică, acasă sau în spații turistice.";
const VIEW_ALL = "Descoperă întreaga colecție";

export async function FeaturedProducts() {
  await dbConnect();

  const featured = await ProductModel.find({ featured: true })
    .sort({ order: 1 })
    .limit(3)
    .lean();

  let products = featured;
  if (products.length < 3) {
    const filler = await ProductModel.find({
      _id: { $nin: featured.map((p) => p._id) },
    })
      .sort({ createdAt: -1 })
      .limit(3 - products.length)
      .lean();
    products = [...products, ...filler];
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-24 md:py-32">
      <Container as="div" size="wide">
        <FadeIn className="max-w-2xl">
          <h2 className="text-h1 text-foreground">{TITLE}</h2>
          <p className="mt-5 text-lede text-muted-foreground">{LEDE}</p>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 lg:gap-10">
          {products.map((doc, i) => {
            const capacity = doc.specs.capacity;
            const priceLabel = formatPrice(doc.price);
            const altText = productAltText({
              name: doc.name,
              size: doc.size,
              color: doc.color as ProductColor,
              specs: { capacity },
            });

            return (
              <FadeIn key={String(doc._id)} delay={Math.min(i, 3) * 0.08}>
                <ListingCard
                  href={`/catalog/${doc.slug}`}
                  name={doc.name}
                  capacity={capacity}
                  image={doc.images?.[0]}
                  imageAlt={altText}
                  priceLabel={priceLabel}
                />
              </FadeIn>
            );
          })}
        </div>

        <div className="mt-14 flex justify-center md:mt-20">
          <Button
            asChild
            variant="outline"
            size="md"
            className="hover:border-accent hover:bg-transparent hover:text-accent"
          >
            <Link href="/catalog">
              <span>{VIEW_ALL}</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-0.5"
              >
                <path
                  d="M1 8h12M9 4l4 4-4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}

function ListingCard({
  href,
  name,
  capacity,
  image,
  imageAlt,
  priceLabel,
}: {
  href: string;
  name: string;
  capacity: number;
  image?: string;
  imageAlt: string;
  priceLabel: string;
}) {
  const capacityLabel = `${capacity} persoane`;

  return (
    <Link
      href={href}
      aria-label={`${name}, ${capacityLabel}, ${priceLabel}`}
      className="group/card block rounded-(--radius-lg) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      <div className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:-translate-y-1">
        <div className="relative aspect-square overflow-hidden rounded-(--radius-lg) bg-surface">
          {image ? (
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-eyebrow text-muted-foreground">
              {name}
            </div>
          )}
        </div>

        <div className="mt-6 px-1">
          <h3 className="text-h3 text-foreground">{name}</h3>
          <p className="mt-1 text-small text-muted-foreground">
            {capacityLabel}
          </p>
          <p className="mt-3 text-body font-semibold text-foreground tabular-nums">
            {priceLabel}
          </p>
        </div>
      </div>
    </Link>
  );
}
