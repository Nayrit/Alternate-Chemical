import { company, products } from "@/lib/data";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: "ACIL",
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
      description: SITE_DESCRIPTION,
      slogan: company.tagline,
      areaServed: { "@type": "Country", name: "Bangladesh" },
      knowsAbout: [
        "Corn wet milling",
        "Native corn starch",
        "Modified starch",
        "Corn fiber",
        "Corn germ",
        "Gluten powder",
        "Corn steep liquor",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: `${SITE_NAME} | Agro-Industrial Starch`,
      description: SITE_DESCRIPTION,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
      primaryImageOfPage: `${SITE_URL}/opengraph-image`,
    },
    {
      "@type": "Place",
      "@id": `${SITE_URL}/#factory`,
      name: "ACIL Habiganj factory",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Satian Road, Ratanpur, Madhobpur",
        addressLocality: "Habiganj",
        addressCountry: "BD",
      },
    },
    {
      "@type": "Place",
      "@id": `${SITE_URL}/#office`,
      name: "ACIL Dhaka corporate office",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Suite 7A-7B & 15D1-15D2, Paramount Heights, 65/2/1 Culvert Road",
        addressLocality: "Dhaka",
        postalCode: "1000",
        addressCountry: "BD",
      },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#products`,
      name: "ACIL design product streams",
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.name,
          sku: product.code,
          url: `${SITE_URL}/products/${product.id}`,
          description: product.summary,
          brand: { "@type": "Brand", name: "ACIL" },
          manufacturer: { "@id": `${SITE_URL}/#organization` },
        },
      })),
    },
  ],
};

export function JsonLd() {
  const json = JSON.stringify(graph).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
