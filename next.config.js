/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.edisonlee55.com',
                port: '',
                pathname: '**',
            },
        ],
    }
}

module.exports = nextConfig
