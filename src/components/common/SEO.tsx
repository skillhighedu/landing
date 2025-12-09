
import { useEffect } from "react";

interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  meta?: MetaTag[];
}

export function SEO({ title, description, image, url, meta = [] }: SEOProps) {
  useEffect(() => {
    if (title) document.title = title;

    const metaTags: MetaTag[] = [
      { name: "description", content: description || "" },
      { property: "og:title", content: title || "" },
      { property: "og:description", content: description || "" },
      { property: "og:image", content: image || "" },
      { property: "og:url", content: url || "" },
      ...meta,
    ];

    metaTags.forEach(({ name, property, content }) => {
      if (!content) return;

      const selector = name
        ? `meta[name="${name}"]`
        : `meta[property="${property}"]`;

      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        if (name) element.setAttribute("name", name);
        if (property) element.setAttribute("property", property);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    });
  }, [title, description, image, url, meta]);

  return null;
}
