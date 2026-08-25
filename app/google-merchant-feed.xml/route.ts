import { products } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/seo";

function xml(value: string | number) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function productType(collection: string) {
  return `Health & Beauty > Personal Care > ${collection}`;
}

export async function GET() {
  const items = products.map((product) => {
    const image = product.image?.startsWith("http")
      ? product.image
      : absoluteUrl(product.image ?? `/products/${product.slug}.jpg`);
    const shippingPrice = product.price >= 40 ? "0.00 GBP" : "2.99 GBP";

    return `
      <item>
        <g:id>${xml(product.slug)}</g:id>
        <title>${xml(product.name)}</title>
        <description>${xml(product.description)}</description>
        <link>${xml(absoluteUrl(`/products/${product.slug}`))}</link>
        <g:image_link>${xml(image)}</g:image_link>
        <g:availability>in_stock</g:availability>
        <g:price>${xml(product.price.toFixed(2))} GBP</g:price>
        <g:brand>Veylo</g:brand>
        <g:condition>new</g:condition>
        <g:identifier_exists>no</g:identifier_exists>
        <g:product_type>${xml(productType(product.ptype))}</g:product_type>
        <g:shipping>
          <g:country>GB</g:country>
          <g:service>Tracked UK delivery</g:service>
          <g:price>${shippingPrice}</g:price>
          <g:min_handling_time>1</g:min_handling_time>
          <g:max_handling_time>2</g:max_handling_time>
          <g:min_transit_time>4</g:min_transit_time>
          <g:max_transit_time>7</g:max_transit_time>
        </g:shipping>
      </item>`;
  }).join("");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Veylo products</title>
    <link>${absoluteUrl("/")}</link>
    <description>At-home skin, body and scalp technology from Veylo.</description>${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
