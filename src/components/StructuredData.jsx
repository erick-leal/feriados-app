import { useEffect } from 'react';

const StructuredData = () => {
  useEffect(() => {
    // Structured data for SEO
    const structuredData = [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Próximos Feriados en tu País",
        "url": "https://ticktockferiados.cl",
        "description": "Consulta los próximos feriados en tu ubicación. Calendario completo de días festivos con fechas exactas y días de la semana para todos los países.",
        "applicationCategory": "TravelApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "creator": {
          "@type": "Organization",
          "name": "Feriados App",
          "url": "https://ticktockferiados.cl"
        },
        "screenshot": "https://ticktockferiados.cl/og-image.jpg",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "150"
        },
        "operatingSystem": "All",
        "browserRequirements": "Requiere JavaScript"
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Inicio",
            "item": "https://ticktockferiados.cl"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Feriados por País"
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿Cómo veo los feriados de mi país?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "La aplicación detecta automáticamente tu ubicación para mostrarte los feriados de tu país. También puedes seleccionar manualmente cualquier país del mundo para ver sus días festivos."
            }
          },
          {
            "@type": "Question",
            "name": "¿Con qué frecuencia se actualizan los feriados?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Nuestra base de datos se actualiza constantemente para incluir los feriados oficiales de cada país, incluyendo cambios de último minuto en días festivos."
            }
          }
        ]
      }
    ];

    // Create and add JSON-LD script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData, null, 2);
    document.head.appendChild(script);
    
    // Cleanup function to remove script on unmount
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default StructuredData;
