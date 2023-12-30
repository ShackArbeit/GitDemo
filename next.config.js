/** @type {import('next').NextConfig} */
const nextConfig = {
//       output: 'export',
exportPathMap: function () {
      return {
        '/': { page: '/' },
        // Add other pages as needed
      };
    },
  
}

module.exports = nextConfig
