import { TestimonialsClient } from "@/components/home/TestimonialsClient";
import type { TestimonialItem } from "@/components/home/TestimonialsClient";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/shared/FadeIn";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { dbConnect } from "@/lib/db";
import { TestimonialModel } from "@/lib/models/Testimonial";

const EYEBROW = "De pe terasele clienților";
const TITLE =
  "Proprietari adevărați, la un an distanță. În apă, săptămână de săptămână.";

export async function Testimonials() {
  await dbConnect();
  const docs = await TestimonialModel.find({ featured: true }).limit(6).lean();

  if (docs.length === 0) {
    return null;
  }

  const items: TestimonialItem[] = docs.map((doc) => ({
    id: String(doc._id),
    quote: String(doc.quote ?? ""),
    author: doc.author,
    location: doc.location,
    rating: doc.rating,
  }));

  return (
    <section className="relative bg-surface py-24 md:py-32">
      <Container as="div">
        <FadeIn underline>
          <SectionHeading eyebrow={EYEBROW} title={TITLE} />
        </FadeIn>
        <FadeIn delay={0.1} className="mt-16">
          <TestimonialsClient items={items} />
        </FadeIn>
      </Container>
    </section>
  );
}
