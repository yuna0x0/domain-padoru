/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'yuna0x0.com',
                port: '',
                pathname: '**',
            },
        ],
    }
}

module.exports = nextConfig
