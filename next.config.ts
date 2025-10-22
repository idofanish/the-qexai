// next.config.js
/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'export', // replaces `next export`
  images: {
    unoptimized: true, // required for static export if you use <Image>
  },
/*
  //optional: if deploying to GitHub Pages
  //basePath: '/the-qexai',
  //assetPrefix: '/the-qexai/',
*/
  };

export default nextConfig;

