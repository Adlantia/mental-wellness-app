/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/apis/:path*',
                destination: `${process.env.REST_API_URL}/apis/:path*`,
            },
        ]
    },
};

export default nextConfig;
