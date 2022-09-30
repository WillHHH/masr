const path = require("path");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/* Enable same global imports from /src for SCSS as JS: */
module.exports = withBundleAnalyzer({
  sassOptions: {
    includePaths: [path.join(__dirname, "src")],
  },
  webpack(config) {
    config.module.rules.unshift({
      test: /\.svg$/i,
      issuer: /\.(js|ts)x?|\.(scss|css)$/i,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "removeViewBox",
                  active: false,
                },
              ],
            },
          },
        },
        "url-loader",
      ],
    });
    config.module.rules.unshift({
      test: /\.(jpeg|apng|eot|otf|ttf|woff|woff2|cur|ani|pdf)$/i,
      issuer: /\.[jt]sx?$/i,
      loader: "file-loader",
      options: {
        name: "[name]-[hash].[ext]",
        publicPath: `/_next/static/files`,
        outputPath: "static/files",
      },
    });
    return config;
  },
  i18n: {
    locales: ["en", "zh"],
    defaultLocale: "en",
    localeDetection: false,
  },
  images: {
    domains: ["a.storyblok.com", "storage.googleapis.com", "s3.amazonaws.com"],
  },
});
