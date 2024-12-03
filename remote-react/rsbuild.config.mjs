import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { dependencies } from './package.json';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: 3002,
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      config.output.uniqueName = 'remote_react';
      appendPlugins([
        new ModuleFederationPlugin({
          name: 'remote_react',
          exposes: {
            './button': './src/Button.jsx',
          },
          shared: {
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
});
