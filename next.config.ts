import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      ...(process.env.NODE_ENV === 'development'
        ? [{ protocol: 'https' as const, hostname: '**' }]
        : []),
    ],
  },
  sassOptions: {
    sourceMap: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.('.svg')
    )

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...(fileLoaderRule.resourceQuery?.not || []), /url/] },
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        removeViewBox: false,
                      },
                    },
                  },
                  {
                    name: 'prefixIds',
                    params: {
                      prefix: (node: any, info: any) => {
                        let hash = 0;
                        const str = info?.path || 'svg';
                        for (let i = 0; i < str.length; i++) {
                          hash = ((hash << 5) - hash + str.charCodeAt(i)) & 0xffffffff;
                        }
                        return Math.abs(hash).toString(36).slice(0, 6) + '__';
                      }
                    }
                  }
                ],
              },
            },
          },
        ],
      }
    )

    fileLoaderRule.exclude = /\.svg$/i
    return config
  },
}

export default nextConfig