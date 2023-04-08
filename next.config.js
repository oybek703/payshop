const { join } = require('path')
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [join(__dirname, 'styles')],
    prependData: `@import "./base.scss";`
  }
}

module.exports = nextConfig
