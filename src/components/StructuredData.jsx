import { Helmet } from 'react-helmet-async';

const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Feriados en Chile",
    "url": "https://ticktockferiados.cl",
    "description": "Consulta los próximos feriados de tu Pais. Calendario completo de días festivos con fechas exactas y días de la semana.",
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "Feriados CL",
      "url": "https://ticktockferiados.cl"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://ticktockferiados.cl/buscar?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
