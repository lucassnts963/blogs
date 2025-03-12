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
    SKIP_DB_DURING_BUILD: process.env.SKIP_DB_DURING_BUILD || "false", // Define "false" como padrão
  },
};
