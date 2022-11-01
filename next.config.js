module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'images.pexels.com',
      'res.cloudinary.com'
    ]
  },
  env: {
    STRAPI_API_URL_GQL: process.env.STRAPI_API_URL_GQL,
    TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN
  }
}
