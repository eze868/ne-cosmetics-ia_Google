import React from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title = "N&E Professional Cosmetics | Melhores Marcas de Salão",
  description = "Catálogo digital de cosméticos profissionais. Truss, Wella, Braé, Sebastian com os melhores preços. Entrega rápida em todo Brasil.",
  image = "https://i.ibb.co/1GXg699R/Kit-Shampoo-Wella-Professionals-Fusion-1000ml.webp",
  url = "https://ne-cosmetics.vercel.app"
}) => {
  
  // Schema.org para Loja
  const storeSchema = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "N&E Professional Cosmetics",
    "description": description,
    "image": image,
    "telephone": "5511999999999",
    "url": url,
    "priceRange": "$$"
  };

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(storeSchema)}
      </script>
    </>
  );
};

export default SEO;