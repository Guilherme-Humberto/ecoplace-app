import React from 'react'
import Head from 'next/head'

interface SeoComponentProps {
  title: string
  url: string
  desc: string
  index?: string
  keywords: string
}

const SeoComponent: React.FC<SeoComponentProps> = ({
  title,
  url,
  desc,
  index,
  keywords
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="author" content="sinestesya" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={desc} />
      <meta
        property="og:image"
        content="https://www.hobecommerce.com.br/favicon.ico"
      />
      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:image:alt" content="prodbase image" />
      <meta property="og:description" content={desc} />
      <meta property="og:site_name" content="prodbase" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="article:author" content="prodbase" />
      <meta name="robots" content={index || 'index,follow'} />
      <meta name="googlebot" content={index || 'index,follow'} />
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width"
        key="viewport"
      />
    </Head>
  )
}

export default SeoComponent
