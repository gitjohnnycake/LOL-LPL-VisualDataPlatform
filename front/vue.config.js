const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "/",

  outputDir: "dist",

  assetsDir: "static",

  indexPath: "index.html",

  runtimeCompiler: false,

  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("views", resolve("src/views"));
  },

  css: {
    loaderOptions: {
      less: {
        globalVars: {
          hack: `true; @import '~@/assets/less/global.less';`,
        },
      },
    },
  },

  devServer: {
    host: "https://api.littlefish.life/api",
    port: 80,
    https: false,
    open: false,
    overlay: {
      warnings: true,
      errors: true,
    },
    proxy: {
      "/api": {
        target: "https://api.littlefish.life/api",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
