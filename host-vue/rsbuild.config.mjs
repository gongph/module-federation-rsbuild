import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';
import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginVueJsx } from '@rsbuild/plugin-vue-jsx';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

import { dependencies } from './package.json';

export default defineConfig({
  server: {
    port: 2000,
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      appendPlugins([
        new ModuleFederationPlugin({
          name: 'remote_host',
          remotes: {
            remote_vue: 'remote_vue@http://localhost:3000/mf-manifest.json',
            remote_react: 'remote_react@http://localhost:3002/mf-manifest.json',
          },
          shared: {
            vue: {},
            react: {
              singleton: true,
              requiredVersion: dependencies.react,
            },
            'react-dom': {
              singleton: true,
              requiredVersion: dependencies['react-dom'],
            },
          },
        }),
      ]);
    },
  },
  plugins: [
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
    }),
    pluginVue(),
    pluginVueJsx(),
  ],
});
