const path = require("path");
const webpack = require("webpack");
const { dependencies } = require("../package.json");

process.env.BABEL_ENV = "main";

module.exports = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";

  return {
    mode: isEnvProduction ? "production" : isEnvDevelopment && "development",
    entry: [path.resolve(__dirname, "../src/main/index.ts")],
    target: "electron-main",
    output: {
      filename: "[name].js",
      libraryTarget: "commonjs2",
      path: path.join(__dirname, "../dist/electron"),
    },
    externals: [...Object.keys(dependencies || {})],
    node: {
      __dirname: !isEnvProduction,
      __filename: !isEnvProduction,
    },
    resolve: {
      alias: {
        main: path.join(__dirname, "../src/main"),
        "@": path.join(__dirname, "../src/renderer"),
      },
      extensions: [".js", ".vue", ".json", ".css", ".node"],
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          enforce: "pre",
          use: [
            {
              options: {
                cache: true,
                formatter: require("eslint-friendly-formatter"),
                resolvePluginsRelativeTo: __dirname,
              },
              loader: "eslint-loader",
            },
          ],
          include: path.resolve(__dirname, "../src/main"),
        },
        {
          test: /\.(js|mjs|ts)$/,
          include: path.resolve(__dirname, "../src/main"),
          loader: require.resolve("babel-loader"),
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            compact: isEnvProduction,
          },
        },
        {
          test: /\.node$/,
          use: "node-loader",
        },
      ],
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      // Add global environment definitions.
      new webpack.DefinePlugin({
        NODE_ENV: webpackEnv,
      }),
    ],
  };
};
