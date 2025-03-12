module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        dns: false,
        net: false,
        tls: false,
        "pg-native": false,
      };
    }
    return config;
  },

  env: {
    BUILD_MODE: process.env.BUILD_MODE || "false", // Define "false" como padrão
  },
};
