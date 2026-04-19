// Renders a JSON-LD `<script type="application/ld+json">` block.
// Use from server components only — the payload is serialized on the
// server, inlined into the HTML, and read by crawlers.
//
// One instance per schema is fine; Google also accepts a @graph bundle
// (pass an array — this component flattens it into the canonical
// `{ "@context": "https://schema.org", "@graph": [...] }` envelope).
export function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  const payload = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : data;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // Escape `<` to prevent an attacker-controlled string from
        // terminating the tag if the schema ever incorporates user input.
        __html: JSON.stringify(payload).replace(/</g, "\\u003c"),
      }}
    />
  );
}
