import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
    title,
    description,
    canonical,
    type = 'website',
    name, // Site name or Author name
    image,
    schema
}) => {
    const siteTitle = "Föräldraledighet.se - Maximera dina dagar 2026";
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

    // Default structured data for the organization/site
    const baseSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Föräldraledighet.se",
        "url": "https://foraldraledighet.se"
    };

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {canonical && <link rel="canonical" href={canonical} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title || siteTitle} />
            <meta property="og:description" content={description} />
            {image && <meta property="og:image" content={image} />}
            <meta property="og:site_name" content="Föräldraledighet.se" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title || siteTitle} />
            <meta name="twitter:description" content={description} />
            {image && <meta name="twitter:image" content={image} />}

            {/* Structured Data (JSON-LD) */}
            <script type="application/ld+json">
                {JSON.stringify(schema || baseSchema)}
            </script>
        </Helmet>
    );
};

export default SEO;
