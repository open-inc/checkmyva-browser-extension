const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const ExtensionReloader = require("webpack-extension-reloader");
const ManifestVersionSyncPlugin = require("webpack-manifest-version-sync-plugin");

module.exports = {
  mode: "production",
  stats: "minimal",
  entry: {
    options: "./src/options.js",
    popup: "./src/popup.js",
    upload: "./src/upload.js",
    background: "./src/background.js",
    content_webapp: "./src/content_webapp.js",
    content_google_takeout: "./src/content_google_takeout.js",
    content_alexa_takeout: "./src/content_alexa_takeout.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".css"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        use: [
          {
            loader: require.resolve("@sucrase/webpack-loader"),
            options: {
              transforms: [
                "typescript",
                "jsx",
                // "react-hot-loader"
              ],
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "@svgr/webpack",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HTMLPlugin({
      chunks: ["options"],
      filename: "options.html",
    }),
    new HTMLPlugin({
      chunks: ["popup"],
      filename: "popup.html",
    }),
    new HTMLPlugin({
      chunks: ["upload"],
      filename: "upload.html",
    }),
    new CopyPlugin([
      { from: "./src/_locales/", to: "./_locales" },
      { from: "./src/assets", to: "./assets" },
      { from: "./src/manifest.json", to: "./manifest.json" },
    ]),
    new ExtensionReloader({
      manifest: path.resolve(__dirname, "./src/manifest.json"),
    }),
    new ManifestVersionSyncPlugin(),
  ],
  optimization: {
    minimize: true,
  },
};
