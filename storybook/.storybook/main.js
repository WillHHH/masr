const glob = require("glob");
const path = require("path");

module.exports = {
  core: {
    builder: "webpack5",
  },
  features: {
    postcss: false,
  },
  stories: () =>
    glob
      .sync(`${__dirname}/../../src/**/*.stories.@(js|jsx|ts|tsx|mdx)`)
      .filter((filename) => !filename.includes("/portfolio/")),
  staticDirs: ["../../public"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-scss",
  ],
  webpackFinal: async (config) => {
    // modify storybook's file-loader rule to avoid conflicts with svgr
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule && rule.test.test(".svg"),
    );
    // :HACKY: This is an extracted RegEx with svg removed.
    fileLoaderRule.test =
      /\.(ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/;

    // Add file-loader for .svg in scss
    const svgScssLoaderRule = Object.assign({}, fileLoaderRule);
    svgScssLoaderRule.test = /\.svg$/;
    svgScssLoaderRule.issuer = /\.s?css$/;
    config.module.rules.unshift(svgScssLoaderRule);

    // Add SVGO SVG processing (similar to CRApp)
    config.module.rules.unshift({
      test: /\.svg$/,
      issuer: /\.(js|ts)x?$/,
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

    // Make class properties readable
    const sassLoader = config.module.rules.find(
      (rule) => rule && rule.test.test(".scss"),
    );
    const i = sassLoader.use.findIndex(
      (ldr) => ldr.loader && /css\-loader/.test(ldr.loader),
    );
    sassLoader.use[i].options = {
      importLoaders: 1,
      url: {
        filter(url) {
          // Disable handling links to static assets in /public
          if (url.startsWith("/")) return false;
          return true;
        },
      },
      modules: {
        mode: "local",
        auto: true,
        exportGlobals: true,
        localIdentName: "[name]__[local]--[hash:base64:5]",
      },
    };

    config.resolve.alias["next/link"] = require.resolve(
      "../../src/__mocks__/next/link.js",
    );
    config.resolve.alias["next/router"] = require.resolve(
      "../../src/__mocks__/next/router.js",
    );
    config.resolve.alias["@storyblok/react"] = require.resolve(
      "../../src/__mocks__/@storyblok/react.js",
    );

    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve("./../src"),
    ];

    return config;
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
};
