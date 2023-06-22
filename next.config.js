const { join } = require('path')
/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [join(__dirname, 'src/styles')],
    prependData: `@import "./base.scss";`
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  // TODO enable eslint before production deploy
  eslint: {
    ignoreDuringBuilds: true
  },
  // TODO enable type checking before production deploy
  typescript: {
    ignoreBuildErrors: true
  }
}

module.exports = nextConfig
