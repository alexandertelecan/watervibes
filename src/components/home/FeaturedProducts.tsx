import Link from "next/link";

import {
  FeaturedProductsRail,
  type FeaturedRailItem,
} from "@/components/home/FeaturedProductsRail";
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

  const products = await ProductModel.find({ featured: true })
    .sort({ order: 1 })
    .lean();

  if (products.length === 0) {
    return null;
  }

  const items: FeaturedRailItem[] = products.map((doc) => {
    const capacity = doc.specs.capacity;
    return {
      id: String(doc._id),
      href: `/catalog/${doc.slug}`,
      name: doc.name,
      capacity,
      image: doc.images?.[0],
      imageAlt: productAltText({
        name: doc.name,
        size: doc.size,
        color: doc.color as ProductColor,
        specs: { capacity },
      }),
      priceLabel: formatPrice(doc.price),
    };
  });

  return (
    <section className="py-24 md:py-32">
      <Container as="div" size="wide">
        <FadeIn className="max-w-2xl">
          <h2 className="text-h1 text-foreground">{TITLE}</h2>
          <p className="mt-5 text-lede text-muted-foreground">{LEDE}</p>
        </FadeIn>
      </Container>

      <FadeIn className="mt-12 md:mt-16">
        <FeaturedProductsRail items={items} />
      </FadeIn>

      <Container as="div" size="wide" className="mt-14 md:mt-20">
        <div className="flex justify-center">
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
