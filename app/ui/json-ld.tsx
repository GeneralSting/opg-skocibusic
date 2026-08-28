import { FC } from "react";

/**
 * Renders one JSON-LD graph into the page.
 *
 * `<` is escaped so a stray `</script>` inside catalogue copy could never end the script element early
 */
export const JsonLd: FC<{ schema: object }> = ({ schema }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
    }}
  />
);
