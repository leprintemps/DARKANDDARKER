/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    });
    return config;
},
//   async rewrites() {
// 		return [
// 			{
// 				source: "/:path*",
// 				destination: "http://localhost:8080/:path*",
// 			},
// 		];
//   },
}

module.exports = nextConfig