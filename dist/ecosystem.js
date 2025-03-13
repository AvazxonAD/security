"use strict";

module.exports = {
  apps: [{
    name: "gvardiya",
    script: "node",
    args: "-r module-alias/register src/server.js",
    watch: false,
    env: {
      NODE_ENV: "production"
    }
  }]
};