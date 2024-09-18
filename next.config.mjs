/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false,
      },
      images: {
        remotePatterns: [
            { hostname: 'res.cloudinary.com', protocol: 'https', port: '' },
            { hostname: 'lh3.googleusercontent.com', protocol: 'https', port: '' },
        ]
    },
};

export default nextConfig;
